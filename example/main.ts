import 'zone.js';

import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Component({
    template: `
        <div id="snippet1"></div>
        <div snippet="snippet1">Hello</div>
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