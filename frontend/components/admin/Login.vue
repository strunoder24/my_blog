<template>
    <section class="login-form">
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
                    <Button @click="submit">
                        Войти
                    </Button>
                </md-card-actions>
            </md-card>
        </section>
</template>

<script>
    export default {
        data(){
            return {
                username: '',
                password: ''
            }
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
        },
    }
</script>

<style lang="sass" scoped>
    .login-form
        margin: auto
        width: 400px
</style>