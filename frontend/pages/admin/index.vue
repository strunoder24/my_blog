<template>
    <div class="admin-wrapper md-layout">
        <section class="login-form" v-if="Object.keys(users).length === 0">
            <md-card class="md-layout-item md-size-100">
                <md-card-header>
                    <div class="md-title">Доступ к админке</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout-item">
                        <InputComponent v-model="username">
                            Email:
                        </InputComponent>
                    </div>
                    <div class="md-layout-item">
                        <InputComponent v-model="password" :type="'password'">
                            Пароль:
                        </InputComponent>
                    </div>
                </md-card-content>
                <md-card-actions style="padding: 16px">
                    <SimpleButton @click="submit">
                        Войти
                    </SimpleButton>
                </md-card-actions>
            </md-card>
            <!--            <div class="buttons">-->

<!--            </div>-->
        </section>
        <section v-else>
            Вы вошли в админку!
        </section>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data(){
            return {
                username: '',
                password: ''
            }
        },

        computed: {
            ...mapState({
                users: state => state.accounts['user-info']
            })
        },

        methods: {
            submit(){
                // let csrf = this.$cookies.get('csrftoken');
                // let config = {
                //     headers: {
                //         'X-CSRFTOKEN': csrf
                //     }
                // };
                this.$axios.post('/signin/', {
                    username: this.username,
                    password: this.password
                })
                    .then(r => {
                        this.$store.commit('accounts/setInfo', r.data)
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },

            logout(){
                this.$axios.post('/logout/', {})
                    .then(r => {
                        console.log(r.data);
                    })
                    .catch(e => {
                        console.log(e.response);
                    })
            },
        },
    }
</script>

<style lang="sass" scoped>
    .admin-wrapper
        display: flex
        flex: 1
        align-items: center
        justify-content: center


    .login-form
        width: 400px
</style>

