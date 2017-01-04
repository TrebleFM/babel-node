# @treblefm/babel-node
A better [`babel-node`](https://babeljs.io/docs/usage/cli/#babel-node), meant for production use.

Uses [`babel-preset-env`](https://github.com/babel/babel-preset-env) to automatically select the minimum amount of
plugins, transforms, and polyfills (Stage 3 or better) required for your version of Node.js (>= 4). Also includes
[`flow`](https://flowtype.org/) support; remember, kids, use protection and be type-safe.

### Install
```sh
npm install @treblefm/babel-node
```

### Usage
Instead of calling `node` in your `npm start` script (or wherever), call `babel-node`.

### Warnings
- Does **not** include REPL support
- Conflicts with `babel-node` provided by `babel-cli`

### Notes
If you're also using [`@treblefm/eslint-config`](https://github.com/treblefm/eslint-config), you'll want to disable the
`node/no-unsupported-features` rule:

```json
{
    "extends": "@treblefm",
    "rules": {
        "node/no-unsupported-features": 0
    }
}
```
