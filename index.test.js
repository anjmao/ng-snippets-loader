const loader = require('./index');
const utils = require('./utils');

describe('ng-snippets-loader', () => {

    createContext = (file) => ({
        query: '?',
        resource: file,
        options: {},
        cacheable: () => { }
    });

it('should highlight snippets in angular component template string', () => {
        let context = createContext('app.component.ts');
        const cases = [
            {
                input: `
                @Component({
                    template: \`
                        ---html
                        <div id="it-works">
                            <nav>
                                <a href="#">Cool</a>
                            </nav>
                        </div>
                        ---
                    \`,
                    selector: 'app'
                })
                class AppComponent {
                    const str = \`\`;
                }`,
                ouput: `
@Component({
    template: \`
        <pre class="hljs"><code class="lang-html">
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"it-works"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>Cool<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
    \`,
    selector: 'app'
})
class AppComponent {
    const str = \`\`;
}`
            }
        ];

        cases.forEach(c => {
            expect(loader.call(context, c.input)).toEqual(c.ouput);
        });

    });

    fit('should highlight snippets in templateUrl html file', () => {
        let context = createContext('app.component.html');

        const source = `
---html
<div></div>
---

---js
const value = [1, 2, 3];
value.forEach(n => {
    console.log('number', n);
});
---
`;

        const result = loader.call(context, source);

        expect(result).toEqual(`
<pre class="hljs"><code class="lang-html">
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>`);
    });

    it('should return original source when template was not used', () => {
        let context = createContext('app.component.ts');

        const source = `
            @Component({
                templateUrl: './tmp.html'
            })
            export class MyComponent {}`;

        const result = loader.call(context, source);

        expect(result).toEqual(`
            @Component({
                templateUrl: './tmp.html'
            })
            export class MyComponent {}`);
    });
});