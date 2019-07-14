<template>
    <div class="post-list">
        <md-card
                md-with-hover
                class="post-container"
                v-for="post in posts"
                :key="post.id">
            <h1 class="post-title" :title="post.title">
                {{ post.title }}
            </h1>
            <img class="post-content" :src="get_image(post)">
            <div class="post-controls">
                <Button
                        type="accent"
                        v-if="deleted_post !== post.id"
                        @click="deleted_post = post.id">
                    Удалить
                </Button>
                <div
                        class="delete_dialogue"
                        v-on-clickaway="drop_delete_id"
                        v-if="deleted_post === post.id">
                    Вы уверены?
                    <md-button class="md-icon-button md-raised md-accent" @click="execute_delete(post.id)">
                        <md-icon>check</md-icon>
                    </md-button>
                    <md-button class="md-icon-button md-raised" @click="deleted_post = 0">
                        <md-icon>close</md-icon>
                    </md-button>
                </div>
                <div class="post-dial">
                    <md-speed-dial md-direction="top" style="margin-left: auto;">
                    <md-speed-dial-target class="md-primary">
                        <md-icon>reorder</md-icon>
                    </md-speed-dial-target>

                    <md-speed-dial-content>
                        <md-button class="md-icon-button" @click="publication_status(post)">
                            <md-icon
                                    :class="{'md-primary': post.is_published}"
                                >{{ post.is_published ? 'star' : 'star_border' }}
                            </md-icon>
                            <md-tooltip>{{ post.is_published ? 'Убрать из публикации' : 'Опубликовать' }}</md-tooltip>
                        </md-button>

                        <md-button class="md-icon-button" @click="$router.push({name: 'admin-edit-id', params: {id: post.id}})">
                            <md-icon>edit</md-icon>
                            <md-tooltip>Редактировать</md-tooltip>
                        </md-button>
                    </md-speed-dial-content>
                </md-speed-dial>
                </div>
            </div>
        </md-card>
    </div>
</template>

<script>
    import { directive as onClickaway } from 'vue-clickaway';

    export default {
        directives: {
            onClickaway: onClickaway,
        },

        props: {
            posts: {
                type: Array,
                required: true
            }
        },

        data(){
            return {
                deleted_post: 0,
            }
        },

        computed: {

        },

        methods: {
            get_image(post){
                if (post.main_image && post.main_image.file) {
                    return process.env.postListImageUrl + post.main_image.file
                }
                return ''
            },

            async execute_delete(id){
                await this.$store.dispatch('posts/deletePost', {context: this, id});
                this.drop_delete_id()
            },

            async publication_status(post) {
                await this.$store.dispatch('posts/publicPostStatus', {context: this, post});
            },

            drop_delete_id(){
                this.deleted_post = 0
            }
        },
    }
</script>

<style lang="sass" scoped>
    .post-list
        display: grid
        grid-template: repeat(auto-fill, 400px) / repeat(auto-fill, minmax(300px, 1fr))
        grid-gap: 15px


    .post-container
        display: flex
        flex-direction: column
        height: 400px
        width: 100%
        padding: 15px
        cursor: default


    .post-title
        margin-top: 0
        max-height: 57px
        overflow: hidden
        line-height: 1.3



    .post-content
        max-height: 230px


    .post-dial
        position: absolute
        top: -112px
        right: 0



    .post-controls
        position: relative
        display: flex
        width: 100%
        height: 48px
        margin-top: auto


    .delete_dialogue
        display: flex
        align-items: center
        height: 48px
        width: 200px
        font-size: 16px
        font-weight: 400


</style>

