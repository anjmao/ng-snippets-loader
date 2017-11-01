const loader = require('./index');

describe('ng-snippets-loader', () => {

    let context = null;

    beforeEach(() => {
        context = {
            query: '?',
            options: {},
            cacheable: () => { }
        }
    });

    it('should insert highlighed snippets in template string', () => {
        const source = `
            @Component({
                template: \`
                    <div id="snippet1"></div>
                    <ng-select snippet="snippet1">
                        <ng-option></ng-option>
                    </ng-select>
                \`
            })
            export class MyComponent {}`;

        const result = loader.call(context, source);

        expect(result).toEqual(`
            @Component({
                template: \`
                    <div id="snippet1">&lt;pre <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;hljs&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">code</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;html&quot;</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">ng-option</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ng-option</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span></span></div>
                    <ng-select>
                        <ng-option></ng-option>
                    </ng-select>
                \`
            })
            export class MyComponent {}`);
    });

    it('should return original source when template was not used', () => {
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