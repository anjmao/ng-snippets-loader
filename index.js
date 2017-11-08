// @ts-check
'use strict';
const hl = require('highlight.js');
const highlightAuto = hl.highlightAuto;

const templateRegex = /(template\s*:\s*`)([^`]*)`/g;
const snippetRegex = /---[a-z,]*\n[\s\S]*?[\n]*?---/g;

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
    source = source.replace('<template>', templateValue);
    return source;
};

function parseComponentTemplateValue(source) {
    const regex = new RegExp(templateRegex);
    let parts = regex.exec(source);
    return parts ? parts[2] : null;
}

function getFileExtensions(filename) {
    return filename.split('.').pop()
}

function highlightSnippets(templateHtml) {
    templateHtml = templateHtml.replace(snippetRegex, (val) => {
        const parts = val.split(/\n/);
        const firstLine = parts[0];
        const options = firstLine.replace('---', '').split(',');
        const lang = options[0] || 'html';
        const runnable = options[1] || false;
        const lastLine = parts[parts.length - 1];
        const wcount = getLeftWhitespacesCount(parts[1]);
        let snippet = parts.slice(1, parts.length - 1).join('\n');
        snippet = normalizeWhitespaces(wcount, snippet);
        const highlighed = highlightAuto(snippet, [lang]).value.replace(/\n/, '');
        let code = `<pre class="hljs" ngNonBindable><code class="lang-${lang}">${highlighed}</code></pre>`;
        if (runnable) {
            code += `\n${snippet}`;
        }
        return code;
    });
    return templateHtml;
}

function getLeftWhitespacesCount(line) {
    return line.match(/^\s*/)[0].length;
}

function normalizeWhitespaces(wcount, snippet) {
    return snippet.split(/\n/).reduce((current, next) => {
        return current + '\n' + next.slice(wcount, next.length);
    }, '');
}
