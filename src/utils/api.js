import Vue from 'vue'
import { ACCESS_TOKEN } from './token.js'

function fetchShots(page = 1) {
  return Vue.http.jsonp(`//api.dribbble.com/v1/shots?page=${page}&per_page=10&access_token=${ACCESS_TOKEN}`, { timeout: 10000 })
}

function fetchShot (id) {
  return Vue.http.jsonp(`//api.dribbble.com/v1/shots/${id}?access_token=${ACCESS_TOKEN}`, { timeout: 10000})
}
export { fetchShots, fetchShot }
