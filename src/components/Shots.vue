<template>
  <div id="shots">
    <shots-item v-for="shot in shots" :shot="shot"></shots-item> 
  </div>
</template>

<script>
import ShotsItem from './ShotsItem.vue'
import { fetchShots } from '../utils/api.js'
export default {
  name: 'shots',
  data () {
    return {
      shots: []
    }
  },
  mounted () {
    fetchShots(data => {
      this.shots = data
    })
  },
  components: {
    'shots-item': ShotsItem
  }
}
</script>

<style lang="scss">

</style>
