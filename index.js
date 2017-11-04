// @ts-check
'use strict';
const cheerio = require('cheerio');
const hl = require('highlight.js');
const pretty = require('pretty');
const highlightAuto = hl.highlightAuto;

const templateRegex = /template:([\`\s]*)([\s\S]*)[`]/gm;

module.exports = function (source) {
    // @ts-ignore
    this.cacheable && this.cacheable();
    // @ts-ignore
    const fileExt = getFileExtensions(this.resource);
    if (fileExt === 'html') {
        return highlightSnippets(source);
    }

    let templateValue = parseComponentTemplateValue(source);
    if (!templateValue) {
        return source;
    }
    source = source.replace(templateValue, '<template>');
    templateValue = highlightSnippets(templateValue);
    return source.replace('<template>', templateValue);
};

function parseComponentTemplateValue(source) {
    const regex = new RegExp(templateRegex);
    let parts = regex.exec(source);
    if (!parts) {
        return null;
    }
    return  parts[2];
}

function getFileExtensions(filename) {
    return filename.split('.').pop()
}

function highlightSnippets(templateHtml) {
    const $ = cheerio.load(templateHtml, { lowerCaseAttributeNames: false, decodeEntities: false });
    const snippets = $('[snippet]');
    snippets.each(function (i, elem) {
        const el = $(this);
        const clone = el.clone();
        clone.removeAttr('snippet');
        const content = $.html(clone);
        const snippetId = el.attr('snippet');
        const container = $('#' + snippetId);
        const code = `<pre class="hljs"><code class="lang-html">${highlightAuto(pretty(content), ['html']).value}</code></pre>`;
        container.append(code);
        el.removeAttr('snippet');
    });
    return $.html();
}