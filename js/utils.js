// ({ a: 1, b: 2 }, 'a') => { b: 2 }
// ({ a: 1, b: 2, c: 3 }, ['a', 'b']) => { c: 3 }
function omit(obj, key) {
  if (!this.isObject(obj) || !key in obj) return obj
  const _obj = {}
  if (typeof key === 'string') {
    for (let i in obj) {
      if (key === i) continue
      _obj[i] = obj[i]
    }
    return _obj
  } else {
    for (let i in obj) {
      if (key.includes(i)) continue
      _obj[i] = obj[i]
    }
    return _obj
  }
}

// min <= x < max
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

function leftPad(str, length, fill) {
  const cache = ['',' ','  ','   ','    ','     ','      ','       ','        ','         ']
  str = String(str)
  length = length - str.length
  if (length <= 0) return str;
  if (!fill && fill !== 0) fill = ' '
  fill = String(fill)
  if (fill === ' ' && length < 10) return cache[length] + str
  let pad = ''
  while (true) {
    if (length & 1) pad += fill
    length >>= 1
    if (length) fill += fill
    else break
  }
  return pad + str
}

function randomArr(arr) {
  arr = arr.slice()
  let retArr = []
  const staticArrLen = arr.length
  let arrLength = staticArrLen
  let randNum
  for (let i = 0; i < staticArrLen; i ++) {
    randNum = this.random(0, arrLength)
    retArr.push(arr[randNum])
    arr.splice(randNum, 1)
    arrLength --
  }
  return retArr
}

function addUniqueArray(originArray, ele) {
  if (originArray.indexOf(ele) > -1) {
    return originArray
  } else {
    return originArray.concat(ele)
  }
}

function isJSON(str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

// [1, 2, 3, 3, 3] => [1, 2, 3]
function uniquify(list) {
  const result = []
  list.forEach(item => {
    if (result.indexOf(item) < 0) {
      result.push(item)
    }
  })
  return result
}

module.exports = {
  isObject: p => Object.prototype.toString.call(p) === "[object Object]",
  isArray: p => Object.prototype.toString.call(p) === "[object Array]",
  isString: p => typeof p === 'string',
  omit,
  random,
  leftPad,
  randomArr,
  isJSON,
  addUniqueArray,
  uniquify,
}
