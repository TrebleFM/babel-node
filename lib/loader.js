"use strict";

const Module = require("module");
const path = require("path");
const vm = require("vm");

// Setup Babel
vm.runInThisContext(require("babel-core").buildExternalHelpers());
require("babel-register")({
    sourceRoot: process.cwd(), // should be location of caller's package.json
    plugins: [
        "syntax-flow",
        "external-helpers",
        "transform-flow-strip-types"
    ],
    presets: [
        ["env", {
            useBuiltIns: true,
            targets: {
                node: "current"
            }
        }]
    ]
});

// Separate file so babel-preset-env can transform it to only include the required polyfills
require("./polyfill");

// Rewrite args some more, then run user's script
let args = process.argv.slice(2);
if (!path.isAbsolute(args[0])) {
    args[0] = path.resolve(args[0]);
}
process.argv = ["babel-node"].concat(args);
Module.runMain();
