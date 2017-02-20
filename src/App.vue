<template>
  <div id="app">
    <div id="content">
      <router-view></router-view>  
    </div>
    <footer>
      Yet another <a href="https://dribbble.com/" id="dribbble">Dribbble</a> by me.
    </footer>
  </div>
</template>

<script>

import ShotsList from './components/ShotsList.vue'

export default {
  name: 'app',
  components: {
    ShotsList,
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
#content {
  flex: 1;
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
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-active {
  opacity: 0;
}
</style>
