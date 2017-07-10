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
// random(0, 10) => 4
function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

// leftPad(1, 2, '0') => "01"
// leftPad(17, 5, 0) => "00017"
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

// randomArr([1,2,3,4]) => [3,1,2,4]
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

// addUniqueArray([1,2,3], 3) => [1,2,3]
function addUniqueArray(originArray, ele) {
  if (originArray.indexOf(ele) > -1) {
    return originArray
  } else {
    return originArray.concat(ele)
  }
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

// 'http://www.a.com', { haha: 123, xixi: 233 }) => 'http://www.a.com?haha=123&xixi=233'
// 'http://www.a.com?wowo=233', { haha: 123, xixi: 233 }) => 'http://www.a.com?haha=123&xixi=233&wowo=233'
function setQuery (url, data = {}) {
  const { data: originData, host } = parseQuery(url)
  const query = serialize(Object.assign({}, originData, data))
  return `${host}?${query}`
}

// { haha: 123, xixi: 233 } => haha=123&xixi=233
function serialize (data) {
  const keys = Object.keys(data)
  if (keys.length === 0) return ''
  return keys.map(key => `${key}=${data[key]}`).join('&')
}

// http://www.a.com?haha=123&xixi=233 => { host: 'http://www.a.com', data: { haha: 123, xixi: 233 } }
function parseQuery (url) {
  const signPosition = url.indexOf('?')
  if (signPosition === -1) {
    return { host: url, data: {} }
  } else {
    const host = url.substr(0, signPosition)
    const query = url.substr(signPosition + 1)
    const data = JSON.parse(`{"${query.replace(/&/g, '","').replace(/=/g, '":"')}"}`)
    return { host, data }
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
  setQuery,
  serialize,
  parseQuery,
}
