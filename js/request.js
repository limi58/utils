import 'whatwg-fetch'
import storage from './storage'
import { setQuery } from './utils'

function getHeaders () {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${storage.getItem('token')}`
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

const get = (url, data = {}, setting = {}) => _fetch('GET', utils.setQuery(url, data), '', setting)
const post = (url, data, setting = {}) => _fetch('POST', url, data, setting)
const del = (url, data = {}, setting = {}) => _fetch('DELETE', utils.setQuery(url, data), '', setting)
const put = (url, data, setting = {}) => _fetch('PUT', url, data, setting)
const patch = (url, data, setting = {}) => _fetch('PATCH', url, data, setting)

export default {
  get,
  post,
  del,
  put,
  patch,
}
