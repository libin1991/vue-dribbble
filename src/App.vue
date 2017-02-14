<template>
  <div id="app">
    <shots></shots>
    <footer>
      Yet another <a href="https://dribbble.com/" id="dribbble">Dribbble</a> by me.
    </footer>
  </div>
</template>

<script>

import Shots from './components/Shots.vue'

export default {
  name: 'app',
  components: {
    Shots,
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
}
footer {
  width: 100%;
  height: 1rem;
  line-height: .6rem;
  font-size: .3rem;
  padding: .2rem;
  background-color: #eee;
  #dribbble {
    text-decoration: underline;
  }
}
</style>
