<template>
  <md-card
      ref='post'
      class="post">
    <div class="post-header">
      <router-link class='ellipsis-2-lines' :to="{name: 'post-id', params: {id: post._id}}">
        {{ post.title }}
      </router-link>
      <div class="post-created-date">
        {{ date_parser(post.create_date) }}
      </div>

      <div class='post-created-date-numbers'>
        {{ date_parser_numbers(post.create_date) }}
      </div>
    </div>
    <div class="tags-container ellipsis-2-lines">
      <router-link
          :to="{name: 'index', query: {t: tag.name}}"
          v-for="tag in post.tags"
          :key="tag._id"
      >{{ tag.name }}
      </router-link>
    </div>
    <img
        class="main-image"
        :src="post.main_image.original_url"
        alt="Заглавная картинка поста">
    <div class="preview-text">{{post.preview_text}}</div>
    <div class="controls">
      <router-link
          :to="{name: 'post-id', params: {id: post._id}}"
          class="read-next"
      >Читать далее
      </router-link>
    </div>
    <IntersectorComponent @imVisible='$emit("loadNextPost")'/>
  </md-card>
</template>

<script>
    import { datetimeWithoutWordsAndTime, dateToHuman } from '~/helpers/date.js'
    import IntersectorComponent from '~c/posts/PostIntersectorComponent.vue'

    export default {
        props: {
            post: Object
        },

        data: () => ({}),

        methods: {
            date_parser(date) {
                return dateToHuman(date)
            },

            date_parser_numbers(date) {
                return datetimeWithoutWordsAndTime(date)
            }
        },

        components: {
            IntersectorComponent
        }
    }
</script>


<style lang="sass" scoped>
  @import '~/assets/styles/media_mixins.sass'

  .post
    width: 100%
    padding: 20px 20px 10px
    margin-bottom: 10px


    .post-header
      display: flex
      align-items: center

      a
        margin: 0
        line-height: 1
        color: #000
        font-size: 2em
        font-weight: 600
        text-decoration: none


    .post-created-date
      display: none
      margin-left: auto
      font-size: 16px
      font-family: Lora, sans-serif
      text-align: right

      +minMedia(s)
        display: block
        min-width: 135px


    .post-created-date-numbers
      display: none
      margin-left: auto
      font-size: 16px
      font-family: Lora, sans-serif
      text-align: right

      +maxMedia(xs)
        display: block
        min-width: 80px


    .tags-container
      display: flex
      flex-wrap: wrap
      align-items: center
      padding: 10px 0

      a
        margin-right: 10px
        line-height: 1.6
        font-size: 18px
        text-decoration: none
        transition: color linear .2s
        font-family: Lora, sans-serif

        &:hover
          color: blue


    .main-image
      width: 100%


    .preview-text
      font-size: 16px
      margin: 10px 0
      font-family: Lora, sans-serif


    .controls
      display: flex
      height: 26px
      width: 100%

    .read-next
      margin-left: auto
      font-size: 16px
      cursor: pointer
      font-family: Lora, sans-serif
</style>