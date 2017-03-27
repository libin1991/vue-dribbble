<template>
  <div class="shot">
    <div class="shot-content" v-if="!loading">
      <div class="shot-image">
        <picture>
          <source :srcset="shot.images.hidpi" media="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-device-pixel-ratio: 1.5), (min-resolution: 1.5dppx)">
          <source :srcset="shot.images.normal">
          <img :src="shot.images.normal" :alt="shot.title">
        </picture>
      </div>
      <div class="shot-info">
        <img :src="shot.user.avatar_url" :alt="shot.user.name" class="user-avatar">
        <h1>{{ shot.title }}</h1>
        <h2>
          by <span class="username">{{ shot.user.name }}</span> on <span class="created">{{ format(shot.created_at) }}</span>
        </h2>
      </div>
      <ul class="shot-stats">
        <li class="views"><span class="views-icon"><img src="~assets/icon-view.png" alt="views"></span><span class="views-count">{{ shot.views_count }}</span></li>
        <li class="likes"><span class="likes-icon"><img src="~assets/icon-like.png" alt="likes"></span><span class="likes-count">{{ shot.likes_count }}</span></li>
        <li class="buckets"><span class="buckets-icon"><img src="~assets/icon-bucket.png" alt="buckets"></span><span class="buckets-count">{{ shot.buckets_count }}</span></li>
      </ul>
      <div class="shot-description" v-if="shot.description" v-html="shot.description"></div>
      <div class="shot-description no-description" v-else>No description for this shot.</div>
      <div class="shot-tags">{{ tags }}</div>
      <div class="shot-comments">
        <span class="comments-count">{{ pluralize(shot.comments_count) }}</span> 
        <ul class="comments">
          <comment v-for="comment in comments" :key="comment" :comment="comment" v-show="!commentsLoading"></comment>
        </ul>
        <div class="pagination">
          <button class="prev" :disabled="commentsLoading" v-if="commentPage > 1" @click="loadComments(shot.id, -- commentPage)"> &lt; Prev</button>
          <button class="next" :disabled="commentsLoading" v-if="commentPage < shot.comments_count / 10 " @click="loadComments(shot.id, ++ commentPage)">Next &gt;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchShot, fetchShotComments } from '../utils/api.js'
import Comment from './Comment.vue'
import Spinner from './Spinner.vue'

export default {
  name: 'Shot',
  data () {
    return {
      loading: true,
      commentsLoading: true,
      commentPage: 1,
      shot: {},
      comments: [],
    }
  },
  beforeMount () {
    fetchShot(this.$route.params.shotId).then(response => {
        this.shot = response.body.data
        this.loading = false
      }).catch(err => {
        window.alert('Network error, please try again.')
      })

    this.loadComments(this.$route.params.shotId, this.commentPage)

  },
  methods: {
    loadComments (shotId, page) {
      this.commentsLoading = true
      fetchShotComments(shotId, page).then(response => {
          this.comments = response.body.data
          this.commentsLoading = false
        }).catch(err => {
          window.alert('Network error, please try again.')
        })
    },
    format (datetime) {
      return new Date(datetime).toLocaleDateString()
    },
    pluralize (count) {
      return count + (count === 1 ? ' Response' : ' Responses')
    }
  },
  computed: {
    tags: function () {
      return this.shot.tags.map(val => {
        return '#' + val + '#'
      }).join(' ')
    }
  },
  components: {
    Comment,
    Spinner,
  }
}
</script>

<style lang="scss">
.shot-content {
  width: 100%;
  color: #444;
  background-color: #fafafa;
  .shot-image {
    display: block;
    width: auto;
    img {
      width: 100%;
    }
  }
  .shot-info {
    position: relative;
    width: 100%;
    padding-left: 1.6rem;
    margin: .5rem 0 .25rem;
    .user-avatar {
      position: absolute;
      top: 0;
      left: .2rem;
      bottom: 0;
      width: 1.2rem;
      height: 1.2rem;
      margin: auto;
      border-radius: 50%;
    }
    h1 {
      font-size: .45rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: .1rem;
    }
    h2 {
      color: #555;
      font-size: .35rem;
      line-height: 1.2;
      .username {
        font-weight: 500;
      }
      .created {
        font-weight: 500;
      }
    }
  }
  .shot-stats {
    height: 1rem;
    padding: .2rem .4rem;
    li {
      display: inline-block;
      height: .5rem;
    }
    span {
      display: inline-block;
      height: .5rem;
      margin-right: .5rem;
    }
    @mixin stats-img {
      img {
        width: .5rem;
        height: .5rem;
        vertical-align: middle;
        opacity: .6;
      }
    }
    .views {
      .views-icon {
        margin-right: .2rem;
        @include stats-img;
      }
      .views-count {
        line-height: .5rem;
        vertical-align: middle;
      }
    }
    .likes {
      .likes-icon {
        margin-right: .2rem;
        @include stats-img;
      }
      .likes-count {
        line-height: .5rem;
        vertical-align: middle;
      }
    }
    .buckets {
      .buckets-icon {
        margin-right: .2rem;
        @include stats-img;
      }
      .buckets-count {
        line-height: .5rem;
        vertical-align: middle;
      }      
    }
  }
  .shot-description {
    width: 100%;
    height: auto;
    line-height: 1.5;
    font-size: .4rem;
    background-color: #e6e6e6;
    padding: .4rem;
    word-break: break-all;
  }
  .no-description {
    font-style: italic;
  }
  .shot-tags {
    color: #666;
    font-size: .3rem;
    font-style: italic;
    line-height: 1.5;
    padding: .4rem;
  }
  .shot-comments {
    line-height: 1.5;
    padding: .2rem .4rem;
    border-top: 1px solid #f1f1f1;
    .comments-count {
      font-size: .5rem;
    }
    .pagination {
      color: #fff;
      font-size: .5rem;
      text-align: center;
      margin: .2rem 0;
      .prev, .next {
        display: inline-block;
        width: 2rem;
        height: 1rem;
        line-height: 1rem;
        color: #fff;
        background-color: #26a69a;
        border-radius: .04rem;
        box-shadow: 0 .04rem .04rem .01rem rgba(0, 0, 0, .3);
        &:active {
          background-color: #1c8278;
          box-shadow: none;
        }        
      }
    }
  }
}
</style>
