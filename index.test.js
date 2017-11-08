const loader = require('./index');

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
                        <pre class="hljs" ngNonBindable><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"it-works"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>Cool<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
                    \`,
                    selector: 'app'
                })
                class AppComponent {
                    const str = \`\`;
                }`
            },
            {
                input: `
                @Component({
                    template: '',
                    selector: 'app'
                })
                class AppComponent {
                }`,
                ouput: `
                @Component({
                    template: '',
                    selector: 'app'
                })
                class AppComponent {
                }`
            }
        ];

        cases.forEach(c => {
            expect(loader.call(context, c.input).replace(/\s/g, '')).toEqual(c.ouput.replace(/\s/g, ''));
        });

    });

    it('should highlight snippets in templateUrl html file', () => {
        let context = createContext('app.component.html');

        const source = `
            <div>keep this original</div>

            ---html
            <div></div>
            ---

            ---js
            const value = [1, 2, 3];
            value.forEach(n => {
                console.log('number', n);
            });
            ---`;

        const result = loader.call(context, source);

        expect(result.replace(/\s/g, '')).toEqual(`
        <div>keep this original</div>
<pre class="hljs" ngNonBindable><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<pre class="hljs" ngNonBindable><code class="lang-js"><span class="hljs-keyword">const</span> value = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
value.forEach(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> {
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'number'</span>, n);
});</code></pre>`.replace(/\s/g, ''));
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