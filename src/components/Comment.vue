<template>
  <li class="comment" v-if="comment">
    <h2>
      <img :src="comment.user.avatar_url" class="comment-avatar">
      <span class="comment-user">{{ comment.user.name }}</span>
      <span class="comment-time">{{ format(comment.created_at) }}</span>
      <span class="comment-like"><span class="likes-icon"><img src="~assets/icon-like.png" alt="likes"></span>{{ comment.likes_count }}</span>
    </h2>
    <span class="comment-body" v-html="comment.body"></span>
  </li>
</template>

<script>
export default {
  name: 'Comment',
  props: ['comment'],
  methods: {
    format (datetime) {
      return new Date(datetime).toLocaleDateString()
    }
  }
}
</script>

<style lang="scss">
.comment {
  width: 100%;
  height: auto;
  padding: .4rem 0;
  &:not(:last-child) {
    border-bottom: 1px solid #f1f1f1;
  }
  h2 {
    color: #444;
    height: .5rem;
    line-height: .5rem;
    margin-bottom: .2rem;
    .comment-avatar {
      display: inline-block;
      width: .5rem;
      vertical-align: text-bottom;
      margin-right: .2rem;
      border-radius: 50%;
    }
    .comment-user {
      display: inline-block;
      font-size: .4rem;
      margin-right: .2rem;
    }
    .comment-time {
      display: inline-block;
      font-size: .32rem;
    }
    .comment-like {
      display: inline-block;
      float: right;
      font-size: .32rem;
      .likes-icon {
        img {
          width: .32rem;
          height: .32rem;
          vertical-align: middle;
          margin-right: .1rem;
          opacity: .5;
        }
      }
    }
  }
  .comment-body {
    display: block;
    font-size: .35rem;
    color: #555;
    word-break: break-all;
  }
}
</style>
