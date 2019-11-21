<template>
  <section class="login-form">
    <md-card class="md-layout-item md-size-100">
      <md-card-header>
        <div class="md-title">Создание админа</div>
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
          Создать
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
                this.$axios.post('/auth/signup/', {
                    email: this.email,
                    password: this.password
                })
                    .then(r => {
                        this.$bus.$emit('setUserCredentials', { user: r.data.user, token: r.data.token});
                        this.$router.push({name: 'admin'});
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