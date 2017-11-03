'use strict';

const loaderUtils = require("loader-utils");
const cheerio = require('cheerio');
const hl = require('highlight.js');
const pretty = require('pretty');
const highlightAuto = hl.highlightAuto;

const templateRegex = /template:([\`\s]*)([\s\S]*)[`]/gm;

module.exports = function (source) {
    this.cacheable && this.cacheable();

    const regex = new RegExp(templateRegex);
    let parts = regex.exec(source);
    if (!parts) {
        return source;
    }

    const templateHtml = parts[2];
    if (!templateHtml) {
        return source;
    }

    source = source.replace(templateHtml, '<snippet>');

    const $ = cheerio.load(templateHtml, {lowerCaseAttributeNames: false, decodeEntities: false});

    const snippets = $('[snippet]');
    snippets.each(function(i, elem) {
        const el = $(this);
        const content = $.html(el.clone());
        console.log('content', content);
        const snippetId = el.attr('snippet');
        const container = $('#' + snippetId);
        console.log('content', content);
        const code = `<pre class="hljs"><code class="lang-html">${highlightAuto(pretty(content), ['html']).value}</code></pre>`;
        container.append(code);
        el.removeAttr('snippet');
    });

    source = source.replace('<snippet>', $.html());

    return source;
};

function id(type) {
    return type;
}