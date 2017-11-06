
module.exports.groups = function(html) {
    html = html.replace(/```[a-z]*\n[\s\S]*?[\n]*?```/g, (val, a) => {
        const parts = val.split('\n');
        const firstLine = parts[0];
        const lastLine = parts[parts.length - 1];
        const snippet = val.replace(firstLine, '').replace(lastLine, '');
        return snippet;
    });
    console.log('f', html);
    return 1;
}