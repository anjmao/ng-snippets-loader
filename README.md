# ng-snippets-loader

## About

This loader was written because I was too lazy to highlight code examples for my open source angular 2+ component https://github.com/ng-select/ng-select demo page by hand. This loader will automatically do these steps:

1) Extract template value from component if `template` is used and highlight all snippets.
2) Highlight all snippets in html template if `templateUrl` is used.

## Install

using npm
```
npm install ng-snippets-loader --dev
```

using yarn
```
yarn add ng-snippets-loader --dev
```

## Usage

Apple snippet attribute on html block you want to extract as an example snippet and add div with id equal to snippet name. Snippet copy with highlighted html will be copied to this div.

```html
<div id="snippet1"></div>
<div id="it-works" snippet="snippet1">
    <nav>
        <a href="#">Cool</a>
    </nav>
</div>
```


