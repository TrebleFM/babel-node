# @treblefm/babel-node
A better babel-node

### Install
```
$ npm install @treblefm/babel-node
```

### Usage
Instead of calling `node` in your `npm start` script (or wherever), call `babel-node`. Uses `babel-preset-env` to
automatically select the minimum amount of transforms required for your version of Node.js; polyfills are also
dynamically selected (includes Stage 3 features or better). Also includes `flow` support.

Does not include REPL support. Conflicts with `babel-node` provided by `babel-cli`.
