<template>
  <div class="middle-box text-center loginscreen animated fadeInDown">
    <div>
      <div>
        <h1 class="logo-name">IN+</h1>
      </div>
      <h3>Welcome to IN+</h3>
      <p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
      </p>
      <p>Login in. To see it in action.</p>

      <i-form
        :debug="true"
        v-model="loginInfo">

        <i-form-item
          name="email"
          placeholder="Email"
          type="text"></i-form-item>

        <i-form-item
          name="password"
          placeholder="Password"
          type="password"></i-form-item>

      </i-form>

      <i-button title="Login" @onPress="form_login" type="primary"></i-button>

      <p class="m-t">
        <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import api, { request } from '../api';

  export default {
    data() {
      return {
        loginInfo: {},
      };
    },
    methods: {
      ...mapActions(['login']),
      form_login() {
        request(api.login, this.loginInfo)
          .then((res) => {
            console.log(this);
            console.log(res);
          })
          .catch((res) => {
            console.warn(res);
          });
      },
    },
  };
</script>
