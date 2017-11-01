'use strict';

const marked = require('marked');
const loaderUtils = require("loader-utils");
const assign = require("object-assign");
const cheerio = require('cheerio');
const hl = require('highlight.js');
const highlightAuto = hl.highlightAuto;

// default option
var defaultOptions = {
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
};

module.exports = function (source) {
    const query = loaderUtils.parseQuery(this.query);
    const configKey = query.config || 'ngSnippetLoader';
    const options = Object.assign({}, defaultOptions, query, this.options[configKey]);
    this.cacheable();
    this && this.cacheable && this.cacheable();

    const $ = cheerio.load(source);

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
    console.log('out', $.html())

    return source;
};

function id(type) {
    return type;
}