<template>
    <div class="admin-list md-layout">
        <md-card
                md-with-hover
                class="post-container"
                v-for="post in posts"
                :key="post.id">
            <h1 class="post-title" :title="post.title">
                {{ post.title }}
            </h1>
            <img class="post-content" :src="post.main_image">
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
                    <md-button class="md-icon-button md-raised md-accent" @click="execute_delete">
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
                        <md-button class="md-icon-button">
                            <md-icon>{{ post.is_published ? 'star' : 'star_border' }}</md-icon>
                            <md-tooltip>{{ post.is_published ? 'Убрать из публикации' : 'Опубликовать' }}</md-tooltip>
                        </md-button>

                        <md-button class="md-icon-button">
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
            execute_delete(){
                //
            },

            drop_delete_id(){
                this.deleted_post = 0
            }
        },
    }
</script>

<style lang="sass" scoped>
    .admin-wrapper
    .admin-list
        margin: -15px


    .post-container
        display: flex
        flex-direction: column
        margin: 15px
        height: 300px
        width: 300px
        padding: 15px
        cursor: default


    .post-title
        margin-top: 0
        max-height: 64px
        overflow: hidden



    .post-content
        height: 150px



    .post-dial
        position: absolute
        top: -108px
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

