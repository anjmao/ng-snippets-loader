import 'zone.js';

import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    template: `
        <h1>ng-snippets-loader</h1>
        <h2>Template inside component</h2>
        <div id="snippet1"></div>
        ---html,true
        <ul>
            <li><a href="https://github.com/anjmao">My Github</a></li>
            <li><a href="https://www.delfi.lt">Delfi News</a></li>
            <li><a href="https://google.lt">Google</a></li>
        </ul>
        ---

        ---html
        <div id="it-works">
            <nav>
                <a href="#">Cool</a>
            </nav>
        </div>
        ---

        ---html
        <div snippet="table">
            <table>
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Hi</td>
                        <td>Whats up?</td>
                    </tr>
                </tbody>
            </table>
        </div>
        ---
        
        <child></child>
    `,
    selector: 'app'
})
class AppComponent {
}

@Component({
    selector: 'child',
    templateUrl: './child.html'
})
class ChildComponent {
    showTable = true;
}

@NgModule({
    declarations: [AppComponent, ChildComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);