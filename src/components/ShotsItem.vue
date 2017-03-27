<template>
  <div class="shots-item">
    <router-link :to="{ name: 'Shot', params: { shotId: shot.id }}">
      <div class="shots-thumbnail-wrapper">
        <img class="shots-thumbnail" :src="shot.images.teaser" :alt="shot.title">
        <div class="gif" v-show="shot.animated">GIF</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ShotsItem',
  props: ['shot'],
}
</script>

<style lang="scss">
.shots-thumbnail-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 .06rem .06rem 0 rgba(159, 168, 218, .3);
  border-radius: .04rem;
}
.shots-thumbnail {
  width: 100%;
  height: 100%;
}
.gif {
  position: absolute;
  right: 0;
  bottom: 0;
  width: .8rem;
  height: .4rem;
  line-height: .4rem;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 0.04rem;
}
</style>
