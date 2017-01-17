global.Promise = require("bluebird");
Promise.config({
    warnings: true,
    longStackTraces: true
});

require("babel-polyfill"); // this will be rewritten to some subset of core-js/shim
require("core-js/stage/4");
require("core-js/stage/3");
