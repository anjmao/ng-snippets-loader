import 'zone.js';

import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    template: `
        <div id="snippet1"></div>
        <ul snippet="snippet1">
            <li>test</li>
            <li>test4</li>
            <li>test4</li>
        </ul>

        <div id="snippet2"></div>
        <div id="it-works" snippet="snippet2">
            <nav>
                <a href="#">Cool</a>
            </nav>
        </div>
    `,
    selector: 'app'
})
class AppComponent {
}

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);