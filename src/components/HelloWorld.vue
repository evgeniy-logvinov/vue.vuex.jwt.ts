<template>
  <div>
    <h1>Login page</h1>
    <div class="login-form">
      <div class="login">
        <label>Login</label>
        <input v-model="auth.email">
      </div>
      <div class="password">
        <label>Password</label>
        <input v-model="auth.password">
      </div>
      <div>
        <button @click="login">Login</button>
        <button @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {AUTH_REQUEST, AUTH_LOGOUT} from '@/store/actions/auth'

interface Auth {
  email: string;
  password: string;
}

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private auth: Auth = {
    email: '',
    password: '',
  };

  private async login() {
    console.log('login pressed')
    const data = await this.$store.dispatch(AUTH_REQUEST, this.auth);
    console.log(data)
  }

  private async logout() {
    console.log('logout pressed')
    const data = await this.$store.dispatch(AUTH_LOGOUT);
    console.log(data)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login-form {
  display: block;
  // flex-direction: column;
  // justify-content: center;
  .login {
    display: block;
    width: 100%;
    margin: 10px;
    label {
      display: block;
    }
  }
  .password {
    display: block;
    width: 100%;
    margin: 10px;
    label {
      display: block;
    }
  }
}
</style>
