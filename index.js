'use strict';

const loaderUtils = require("loader-utils");
const cheerio = require('cheerio');
const hl = require('highlight.js');
const highlightAuto = hl.highlightAuto;

const templateRegex = /template:([\`\s]*)([\s\S]*)[`]/gm;

module.exports = function (source) {
    this && this.cacheable && this.cacheable();

    const templateHtml = (templateRegex.exec(source) || [])[2];
    if (!templateHtml) {
        return source;
    }

    source = source.replace(templateHtml, '<snippet>');

    const $ = cheerio.load(templateHtml);
    const snippets = $('[snippet^="snippet"]');
    snippets.each(function(i, elem) {
        const el = $(this);
        const clone = el.clone();
        const snippetId = el.attr('snippet');
        const container = $('#' + snippetId);
        const code = `<pre class="hljs"><code class="html">${clone.html()}</code></pre>`;
        container.append(highlightAuto(code).value);
        el.removeAttr('snippet');
    });

    source = source.replace('<snippet>', $('body').html());
    return source;
};

function id(type) {
    return type;
}