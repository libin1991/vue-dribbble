<template>
  <div id="shots-list">
    <header>
      <h1>Dribbble</h1>
      <spinner :show="loading"></spinner>
    </header>  
    <div class="shots-item-container">
      <shots-item v-for="shot in shots" :shot="shot"></shots-item> 
    </div>
    <div class="more" @click="loadShots(page)">{{ isLoading }}</div>
  </div>
</template>

<script>
import Spinner from './Spinner.vue'
import ShotsItem from './ShotsItem.vue'
import { fetchShots } from '../utils/api.js'

export default {
  name: 'ShotsList',
  data () {
    return {
      loading: true,
      page: 1,
      shots: [],
    }
  },
  beforeMount () {
    this.loadShots(this.page)
  },
  mounted () {
  },
  methods: {
    loadShots: function (page) {
      this.loading = true
      fetchShots(page).then(response => {
        this.shots.push.apply(this.shots, response.body.data)
        this.loading = false
        this.page ++
      }, response => {
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
    background-color: #fff;
    padding: .2rem;
  }
}
.more {
  height: 1rem;
  line-height: 1rem;
  font-size: .4rem;
  font-weight: 500;
  color: #fff;
  text-align: center;
  letter-spacing: .1rem;
  background-color: #ec407a;
  margin: .2rem;
  border-radius: .04rem;
  box-shadow: 0 .04rem .04rem .01rem rgba(0,0,0,.3);
  &:active {
    background-color: #f06292;
    box-shadow: none;
  }
}
</style>
