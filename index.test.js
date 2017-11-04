const loader = require('./index');

describe('ng-snippets-loader', () => {

    let context = null;

    beforeEach(() => {
        context = {
            query: '?',
            resource: 'file.ts',
            options: {},
            cacheable: () => { }
        }
    });

    it('should insert highlighed snippets in angular component template string', () => {
        const source = `
            @Component({
                template: \`
                    <div [innerHTML]="tmp"></div>
                    <div id="snippet1"></div>
                    <ng-select id="test" snippet="snippet1">
                        <ng-option></ng-option>
                    </ng-select>
                \`
            })
            export class MyComponent {}`;

        const result = loader.call(context, source);

        expect(result.replace(/ /g, '')).toEqual(`
        @Component({
            template: \`
                <div [innerHTML]="tmp"></div>
                <div id="snippet1"><pre class="hljs"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">ng-select</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">ng-option</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ng-option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ng-select</span>&gt;</span></code></pre></div>
                <ng-select id="test">
                    <ng-option></ng-option>
                </ng-select>
            \`
        })
        export class MyComponent {}`.replace(/ /g, ''));
    });

    it('should insert highlighed snippets in separate html template string', () => {
        context.resource = 'file.html';

        const source = `
        <div [innerHTML]="tmp"></div>
        <div id="snippet1"></div>
        <ng-select id="test" snippet="snippet1">
            <ng-option></ng-option>
        </ng-select>`;

        const result = loader.call(context, source);

        expect(result.replace(/ /g, '')).toEqual(`
        <div [innerHTML]="tmp"></div>
        <div id="snippet1"><pre class="hljs"><code class="lang-html"><span class="hljs-tag">&lt;<span class="hljs-name">ng-select</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"test"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ng-option</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ng-option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ng-select</span>&gt;</span></code></pre></div>
        <ng-select id="test">
            <ng-option></ng-option>
        </ng-select>`.replace(/ /g, ''));
    });

    it('should return original source when template was not used', () => {
        const source = `
            @Component({
                templateUrl: './tmp.html'
            })
            export class MyComponent {}`;

        const result = loader.call(context, source);

        expect(result.replace(/ /g, '')).toEqual(`
            @Component({
                templateUrl: './tmp.html'
            })
            export class MyComponent {}`.replace(/ /g, ''));
    });
});