import 'whatwg-fetch'
import storage from './storage'

function getHeaders () {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `${storage.getItem('token')}`
  }
}

function _fetch (method, url, data = {}, opts = {}) {
  // if exists 'http', use url
  if (!url.match(/^http/)) {
    url = `${config.HOST}/${url}`
  }
  return new Promise((resolve, reject) => {
    let fetchRes
    const fetchOpts = {
      method,
      body: JSON.stringify(data),
      headers: getHeaders(),
      ...opts,
    }
    if (method === 'GET' || method === 'DELETE') {
      fetchRes = fetch(url, utils.omit(fetchOpts, 'body'))
    } else {
      fetchRes = fetch(url, fetchOpts)
    }
    fetchRes.then(res => {
      if (res.status >= 200 && res.status < 300) {
        res.json().then(res => resolve(res))
      } else if (res.status === 401) {
        alert('请重新登录')
        // location.assign('/oauth/to-auth')
      } else if (res.status >= 500) {
        alert('系统繁忙，请稍后再试')
      } else {
        res.json().then(err => reject(err))
      }
    })
  })
}

// 'http://www.a.com', { haha: 123, xixi: 233 }) => 'http://www.a.com?haha=123&xixi=233'
// 'http://www.a.com?wowo=233', { haha: 123, xixi: 233 }) => 'http://www.a.com?haha=123&xixi=233&wowo=233'
function setQuery (url, data = {}) {
  if (Object.keys(data).length === 0) return url
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

const get = (url, data = {}, setting = {}) => _fetch('GET', setQuery(url, data), '', setting)
const post = (url, data, setting = {}) => _fetch('POST', url, data, setting)
const del = (url, data = {}, setting = {}) => _fetch('DELETE', setQuery(url, data), '', setting)
const put = (url, data, setting = {}) => _fetch('PUT', url, data, setting)
const patch = (url, data, setting = {}) => _fetch('PATCH', url, data, setting)

export default {
  get,
  post,
  del,
  put,
  patch,
}
