const assert = require('assert')
const utils = require('../js/utils.js')

//
assert.deepEqual(utils.omit({ a: 1, b: 2 }, 'a'), { b: 2 })
assert.deepEqual(utils.omit({ a: 1, b: 2, c: 3 }, ['a', 'b']), { c: 3 })
assert.deepEqual(utils.uniquify([1, 1, 2, 3, 3, 3]), [1, 2, 3])
