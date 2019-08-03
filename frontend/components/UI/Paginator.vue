<template>
    <div class="paginator">
        <md-button class="md-icon-button"
                   :disabled="!info.previous"
                   @click="execute_pagination('previous')"
        >
            <md-icon>chevron_left</md-icon>
        </md-button>
        <md-button :class="{'visited': page === info.current_page}"
                   class="md-icon-button"
                   v-for="page in info.pages_count"
                   :key="page"
                   :disabled="page === info.current_page"
                   @click="execute_pagination(page)">
            {{ page }}
        </md-button>
        <md-button class="md-icon-button"
                   :disabled="!info.next"
                   @click="execute_pagination('next')"
        >
            <md-icon>chevron_right</md-icon>
        </md-button>
    </div>
</template>

<script>
    export default {
        props: {
            info: {
                type: Object,
                required: true
            },

            api: {
                type: String,
                required: true
            },

            p: { //Только для медиатеки
                type: Number,
                required: false
            }
        },

        methods: {
            execute_pagination(to){  //to: 'next', 'previous' or Number
                if (this.api === 'posts') {
                    if (typeof to === 'number') {
                        const url = '/posts/' + `?p=${to}`;
                        this.$store.dispatch('posts/getPostsOnPaginator', {context: this, url, page_number: to})
                    } else {
                        this.$store.dispatch('posts/getPostsOnPaginator', {
                            context: this,
                            url: this.info[to],
                            page_number: to === 'next' ? this.info.current_page + 1 : this.info.current_page - 1
                        })
                    }
                } else if (this.api === 'tags') {
                    if (typeof to === 'number') {
                        const url = `/tags/?p=${to}&is_admin=true`;
                        this.$store.dispatch('tags/getTagsOnPaginator', {context: this, url, page_number: to})
                    } else {
                        this.$store.dispatch('tags/getTagsOnPaginator', {
                            context: this,
                            url: this.info[to],
                            page_number: to === 'next' ? this.info.current_page + 1 : this.info.current_page - 1,
                        })
                    }
                }

                else if (this.api === 'images') {
                    if (typeof to === 'number') {
                        const url = '/images/' + `?p=${to}`;
                        this.$store.dispatch('posts/getImagesOnPaginator', {context: this, url, page_number: to});
                        this.$emit('changePage', to)
                    } else {
                        this.$store.dispatch('posts/getImagesOnPaginator', {
                            context: this,
                            url: this.info[to],
                            page_number: to === 'next' ? this.p + 1 : this.p - 1
                        });
                        this.$emit('changePage', to === 'next' ? this.p + 1 : this.p - 1)
                    }
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    .paginator
        margin-top: auto
        height: 40px
        width: 100%
        margin-bottom: 30px

    .visited
        background-color: rgba(0, 0, 0, 0.1)
</style>