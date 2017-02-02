import Vue from 'vue'
import { ACCESS_TOKEN } from './config.js'

function fetchShots(cb) {
  return Vue.http.jsonp('http://api.dribbble.com/v1/shots?access_token=' + ACCESS_TOKEN)
    .then(data => {
      console.log('ok')
      cb(data.body.data)
    })
    .catch(error => {
      console.log('error')
      cb(error)
    })
}

export { fetchShots }
