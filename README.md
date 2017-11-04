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

## Webpack configuration

You just need to register ng-snippets-loader for .ts|.js and .html files

```js
...
module: {
        rules: [
            {
                test: /\.ts$/,
                loader: ['awesome-typescript-loader?configFileName=./example/tsconfig.json', 'angular2-template-loader', 'ng-snippets-loader'],
                exclude: [/node_modules\/(?!(ng2-.+))/],
            },
            {
                test: /\.(html)$/,
                loader: ['raw-loader', 'ng-snippets-loader']
            }
        ]
    },
```

## Clone and run

You can clone this repo and run example angular application

```
git clone git@github.com:anjmao/ng-snippets-loader.git
yarn
yarn start
```


