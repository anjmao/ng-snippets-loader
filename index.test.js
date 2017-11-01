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
            export class MyComponent {}
        `;

        const result = loader.call(context, source);

        expect(result).toEqual(`
            @Component({
                template: \`
                    <ng-select>
                        <ng-option></ng-option>
                    </ng-select>
                \`
            })
            export class MyComponent {}
        `);

    });
});