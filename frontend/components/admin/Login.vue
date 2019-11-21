<template>
    <section class="login-form">
            <md-card class="md-layout-item md-size-100">
                <md-card-header>
                    <div class="md-title">Доступ к админке</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout-item">
                        <InputComponent v-model="email" @submit="submit">
                            Email:
                        </InputComponent>
                    </div>
                    <div class="md-layout-item">
                        <InputComponent v-model="password" @submit="submit" :type="'password'">
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
                email: '',
                password: ''
            }
        },

        methods: {
            submit(){
                this.$axios.post('/auth/signin/', {
                    email: this.email,
                    password: this.password
                })
                    .then(r => {
                        this.$bus.$emit('setUserCredentials', { user: r.data.user, token: r.data.token});
                        this.$store.commit('accounts/setInfo', r.data.user)
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