[![npm version](https://badge.fury.io/js/ng-snippets-loader.svg)](https://badge.fury.io/js/ng-snippets-loader)

# ng-snippets-loader

## Demo

https://anjmao.github.io/ng-snippets-loader/

## What problem does this laoder solves

Lets say you are creating some component demo page with examples and you want to add snippets with highlighted code and you want to keep whem in sync with your component html markup and api. You can use markdown or write encoded html by hand, but if you are lazy keep reading.

## Install

using npm
```
npm install ng-snippets-loader --dev
```

using yarn
```
yarn add ng-snippets-loader --dev
```

## How it works

Probably most common case is that you want to show some html component markup with attributes like this

```html
<ng-select [items]="cities"
            bindLabel="name"
            placeholder="Select value"
            [clearable]="false"
            [(ngModel)]="selectedCity">
</ng-select>
```

Snippet rule is similar to github markdown but instead of using ` symbol you use -
```
---<lang>,<runnable>
[Code snippet here>
---
```
where `<lang>` is language `html` or `js` and `<runnable>` is boolean property, if it is true you code snippet will be executed bellow.

Final snippet will look like this

```
---html,true
<ng-select [items]="cities"
            bindLabel="name"
            placeholder="Select value"
            [clearable]="false"
            [(ngModel)]="selectedCity">
</ng-select>
---
```


## Webpack configuration

You just need to register ng-snippets-loader for .ts|.js and .html files

```js
...
module: {
        rules: [
            {
                test: /\.ts$/,
                loader: ['awesome-typescript-loader', 'angular2-template-loader', 'ng-snippets-loader'],
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


