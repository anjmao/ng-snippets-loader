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
    return source.replace('<template>', templateValue);
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
        const parts = val.split('\n');
        const firstLine = parts[0];
        const options = firstLine.replace('---', '').split(',');
        const lang = options[0] || 'html';
        const runnable = options[1] || false;
        const lastLine = parts[parts.length - 1];
        const snippet = val.replace(firstLine, '').replace(lastLine, '');
        let code = `<pre class="hljs"><code class="lang-html">${highlightAuto(snippet, [lang]).value}</code></pre>`;
        if (runnable) {
            code += `\n${snippet}`;
        }
        return code;
    });
    return templateHtml;
}
