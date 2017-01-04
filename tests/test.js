/*
 * TODO - Actually write some decent tests
 *
 * Empty .babelrc makes sure configs are merged, not overwritten
 */

import assert from "assert";

assert.strictEqual(process.argv[2], "oh");
assert.strictEqual(process.argv[3], "hello world");
assert.strictEqual(module.id, ".");
assert.strictEqual(module.parent, null);

console.log("***TESTS PASSED***");
