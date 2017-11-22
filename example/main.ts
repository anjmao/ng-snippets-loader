import './style.scss';

import 'zone.js';

import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    template: `
        <h1>ng-snippets-loader</h1>
        <h3>HTML with ouput</h3>
        ---html,true
        <ul>
            <li><a href="https://github.com/anjmao">My Github</a></li>
            <li><a href="https://www.delfi.lt">Delfi News</a></li>
            <li><a href="https://google.lt">Google</a></li>
        </ul>
        ---

        <h3>HTML without output</h3>
        ---html
        <div id="it-works"
             class="container">
            <nav>
                <a href="#">Cool</a>
            </nav>
        </div>
        ---

        <h3>Javascript snippet</h3>
        ---js
        const value = [1, 2, 3];
        value.push(7);
        console.log(value);
        value.forEach(v => {
            console.log('value', v);
        });
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