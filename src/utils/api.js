import Vue from 'vue'
import { ACCESS_TOKEN } from './token.js'

function fetchShots(page = 1) {
  return Vue.http.jsonp(`//api.dribbble.com/v1/shots?page=${page}&per_page=10&access_token=${ACCESS_TOKEN}`, { timeout: 10000 })
}

function fetchShot (shotId) {
  return Vue.http.jsonp(`//api.dribbble.com/v1/shots/${shotId}?access_token=${ACCESS_TOKEN}`, { timeout: 10000 })
}

function fetchShotComments (shotId, page = 1) {
  return Vue.http.jsonp(`//api.dribbble.com/v1/shots/${shotId}/comments?page=${page}&per_page=10&access_token=${ACCESS_TOKEN}`, { timeout: 10000 })
}

export { fetchShots, fetchShot, fetchShotComments }
