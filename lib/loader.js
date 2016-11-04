"use strict";

const Module = require("module");
const path = require("path");
const vm = require("vm");

// Polyfill as needed
let nodeVersion = process.versions.node.split(".");
if (Number.parseInt(nodeVersion[0]) < 6) {
    require("core-js/es6"); // eslint-disable-line global-require
}
require("core-js/stage/4");
require("core-js/stage/3");

// Hook Babel
vm.runInThisContext(require("babel-core").buildExternalHelpers());
require("babel-register")({
    "plugins": [
        "syntax-flow",
        "external-helpers",
        "transform-flow-strip-types",
        "transform-es2015-modules-commonjs"
    ],
    "presets": [
        ["env", {
            "targets": {
                "node": "current"
            }
        }]
    ]
});

// Run user's script
let args = process.argv.slice(2);
if (!path.isAbsolute(args[0])) {
    args[0] = path.resolve(args[0]);
}
process.argv = ["babel-node"].concat(args);
Module.runMain();
