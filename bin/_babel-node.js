/* Based on https://github.com/babel/babel/blob/master/packages/babel-cli/src/babel-node.js */

/**
* This tiny wrapper file checks for known node flags and appends them
* when found, before invoking the "real" babel-node(1) executable.
*/

"use strict";

const getV8Flags = require("v8flags");
const path = require("path");
const kexec = require("kexec");

let args = [path.join(__dirname, "../lib/loader")];
let babelArgs = process.argv.slice(2);
let userArgs = [];

// separate node arguments from script arguments
let argSeparatorIndex = babelArgs.indexOf("--");
if (argSeparatorIndex > -1) {
    userArgs = babelArgs.slice(argSeparatorIndex); // including the  --
    babelArgs = babelArgs.slice(0, argSeparatorIndex);
}

/**
* Replace dashes with underscores in the v8Flag name
* Also ensure that if the arg contains a value (e.g. --arg=true)
* that only the flag is returned.
*/
function getNormalizedV8Flag(arg) {
    const matches = arg.match(/--(.+)/);

    if (matches) {
        return `--${matches[1].replace(/-/g, "_")}`;
    }

    return arg;
}

getV8Flags((err, v8Flags) => {
    if (err) {
        throw err;
    }

    for (let arg of babelArgs) {
        const flag = arg.split("=")[0];

        switch (flag) {
            case "-d":
                args.unshift("--debug");
                break;

            case "debug":
            case "--debug":
            case "--debug-brk":
            case "--inspect":
                args.unshift(arg);
                break;

            case "-gc":
                args.unshift("--expose-gc");
                break;

            case "--nolazy":
                args.unshift(flag);
                break;

            default:
                if (v8Flags.indexOf(getNormalizedV8Flag(flag)) >= 0 || arg.indexOf("--trace") === 0) {
                    args.unshift(arg);
                } else {
                    args.push(arg);
                }
                break;
        }
    }

    // append arguments passed after --
    if (argSeparatorIndex > -1) {
        args = args.concat(userArgs);
    }

    // doesn't work on Windows, but ¯\_(ツ)_/¯
    kexec(process.argv[0], args);
});
