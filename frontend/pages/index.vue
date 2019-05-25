<template>
    <section class="container">
        <InputComponent v-model="username">
            Email:
        </InputComponent>
        <InputComponent v-model="password" :type="'password'">
            Пароль:
        </InputComponent>
        <SimpleButton @click="submit" style="margin-top: auto; margin-left: auto;">
            Войти
        </SimpleButton>
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
                this.$axios.post('/signin/', {
                    username: this.username,
                    password: this.password
                })
                    .then(r => {
                        console.log(r);
                    })
            }
        },
    }
</script>

<style lang="sass" scoped>
    .container
        display: flex
        flex-direction: column
        margin: auto 0
        padding: 20px
        width: 300px
        height: 300px
        border: 1px solid black
        border-radius: 5px
</style>

