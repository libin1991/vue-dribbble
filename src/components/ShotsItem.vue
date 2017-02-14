<template>
  <div class="shots-item">
    <img class="shot-img" :src="shot.images.teaser" alt="shot.title">
  </div>
</template>

<script>
export default {
  name: 'shots-item',
  props: ['shot'],
}
</script>

<style lang="scss">
.shot-img {
  width: 100%;
  box-shadow: 0 0.06rem 0.06rem 0 rgba(159, 168, 218, .3);
  border-radius: 0.04rem;
}
</style>
