<template>
  <div id="shots-list">
    <header>
      <h1>Dribbble</h1>
      <spinner :show="loading"></spinner>
    </header>  
    <div class="shots-item-container" v-infinite-scroll="loadShots" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <shots-item v-for="shot in shots" :shot="shot"></shots-item> 
    </div>
    <div class="more">{{ isLoading }}</div>
  </div>
</template>

<script>
import Spinner from './Spinner.vue'
import ShotsItem from './ShotsItem.vue'
import infiniteScroll from 'vue-infinite-scroll'
import { fetchShots } from '../utils/api.js'

export default {
  name: 'ShotsList',
  data () {
    return {
      loading: false,
      page: 1,
      shots: [],
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  methods: {
    loadShots: function () {
      this.loading = true
      fetchShots(this.page).then(response => {
        this.shots.push.apply(this.shots, response.body.data)
        this.page += 1
        this.loading = false
      }).catch(err => {
        window.alert('Network error, please try again.')
      })
    }
  },
  computed: {
    isLoading () {
      return this.loading ? 'loading...' : 'more'
    }
  },
  components: {
    ShotsItem,
    Spinner,
  },
  directives: {
    infiniteScroll
  }
}
</script>

<style lang="scss">
header {
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 1.5rem;
  color: #fff;
  font-size: 0.48rem;
  font-weight: 700;
  line-height: 1.5rem;
  background-color: #3F51B5;
  padding-left: .4rem;
  box-shadow: 0 .04rem .06rem rgba(0,0,0,.26);
  h1 {
    display: inline-block;
  }
}
.spinner {
  display: inline-block;
  vertical-align: middle;
}
.shots-item-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 1.5rem 0 0 0;
  .shots-item {
    width: 5rem;
    flex: 0 1 5rem;
    padding: .2rem;
  }
}
.more {
  display: block;
  height: 1rem;
  line-height: 1rem;
  font-size: .4rem;
  font-weight: 500;
  text-align: center;
  letter-spacing: .1rem;
  margin: .2rem 0;
}
</style>
