<template>
    <section class="container">
        <InputComponent v-model="username">
            Email:
        </InputComponent>
        <InputComponent v-model="password" :type="'password'">
            Пароль:
        </InputComponent>
        <div class="buttons">
            <SimpleButton @click="submit">
                Войти
            </SimpleButton>
            <SimpleButton @click="getUserInfo">
                Юзер
            </SimpleButton>
            <SimpleButton @click="logout" style="margin-top: 10px;">
                Выйти
            </SimpleButton>
        </div>
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
                        console.log(r.data);
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

            getUserInfo(){
                let config = {
                    headers: {
                        'X-CSRFTOKEN': this.$cookies.get('csrftoken'),
                    }
                };

                this.$axios.get('/user-info/', config)
                    .then(r => {
                        console.log(r.data);
                    })
                    .catch(e => {
                        console.log(e.response);
                    })
            }
        },
    }
</script>

<style lang="sass" scoped>
    .buttons
        display: flex
        justify-content: space-between
        flex-wrap: wrap
        padding-top: 100px


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

