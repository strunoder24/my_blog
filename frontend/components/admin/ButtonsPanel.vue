<template>
    <div class="md-layout-item md-size-100 buttons-container">
        <h1>{{ header }}</h1>
        <div class="left-buttons">
            <Button
                    class="admin-control-button"
                    to="/admin/tags"
                    v-if="toTags">
                Настройки тегов
            </Button>
            <Button class="admin-control-button" to="/admin/add" v-if="createPost" type="add">
                Создать пост
            </Button>
            <Button class="admin-control-button" v-if="logout" type="accent" @click="execute_logout">
                Выйти
            </Button>

            <Button
                    class="admin-control-button"
                    style="width: 230px;"
                    to="/admin"
                    v-if="toList">
                Вернутся к списку постов
            </Button>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                header: '',
                createPost: false,
                logout: false,
                toList: false,
                toTags: false,
            }
        },

        created(){
            if (this.$route.name === 'admin') {
                this.header = 'Список постов';
                this.createPost = true;
                this.toTags = true;
                this.logout = true;
            }

            else if (this.$route.name === 'admin-add') {
                this.header = 'Создание поста';
                this.toList = true;
            }

            else if (this.$route.name === 'admin-tags') {
                this.header = 'Настройка тегов';
                this.toList = true;
            }
        },

        methods: {
            execute_logout(){
                this.$axios.post('/logout/', {})
                    .then(r => {
                        this.$store.commit('accounts/setInfo', {});
                        this.$router.push('/')
                    })
                    .catch(e => {
                        console.log(e.response);
                    })
            },
        }
    }
</script>

<style lang="sass" scoped>
    .buttons-container
        display: flex
        align-items: center
        height: 77px
        max-height: 77px
        padding: 20px 0

        h1
            font-size: 28px
            margin: 0
            line-height: 1 !important


    .left-buttons
        display: flex
        margin-left: auto


    .admin-control-button
        margin: 0

        &:not(:last-child)
            margin-right: 20px
</style>