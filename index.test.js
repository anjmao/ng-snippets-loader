const loader = require('./index');
const utils = require('./utils');

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
                    \`\`\`html
                    <ng-select id="test"
                            class="test"
                            id="new">
                        <ng-option></ng-option>
                    </ng-select>
                    \`\`\`
                \`
            })
            export class MyComponent {}`;

        const result = loader.call(context, source);

        expect(result).toEqual(``);
    });

    it('should insert highlighed snippets in separate html template string', () => {
        context.resource = 'file.html';

        const source = `
        <div [innerHTML]="tmp"></div>
        \`\`\`html
        <ng-select id="test">
            <ng-option></ng-option>
        </ng-select>
        \`\`\`
        `;

        const result = loader.call(context, source);

        expect(result).toEqual(``);
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