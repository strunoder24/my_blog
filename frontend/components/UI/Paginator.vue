<template>
    <div class="paginator">
        <md-button class="md-icon-button"
                   :disabled="!info.hasPrevPage"
                   @click="execute_pagination('previous')"
        >
            <md-icon>chevron_left</md-icon>
        </md-button>
        <md-button :class="{'visited': page === info.page}"
                   class="md-icon-button"
                   v-for="page in info.totalPages"
                   :key="page"
                   :disabled="page === info.page"
                   @click="execute_pagination(page)">
            {{ page }}
        </md-button>
        <md-button class="md-icon-button"
                   :disabled="!info.hasNextPage"
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
                    let url = '/api/posts/';
                    let page_number = 1;
                    let tag = '';

                    if (typeof to === 'number') page_number = to;
                    else page_number = to === 'next' ? this.info.page + 1 : this.info.page - 1;
                    if (this.$route.query.t) tag = this.$route.query.t;

                    this.$store.dispatch('posts/getPostsOnPaginator', {context: this, url, page_number, tag})
                }
                document.scrollTop = 0;
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