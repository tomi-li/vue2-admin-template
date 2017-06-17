<template>
  <div class="middle-box text-center loginscreen animated fadeInDown">
    <h1 class="logo-name">Loops Live</h1>

    <i-form
      class="m-t-lg"
      ref="form">

      <i-form-item
        name="email"
        size="lg"
        placeholder="Email"
        type="text"></i-form-item>

      <i-form-item
        name="password"
        size="lg"
        placeholder="Password"
        type="password"></i-form-item>

      <i-button
        size="lg"
        title="Login"
        type="primary"
        :isSubmit="true"
        :isBlock="true"
        :loading="loggingIn"
        @onPress="formLogin"
      ></i-button>
    </i-form>

    <p class="m-t">
      <small>&copy Product of Mozat 2017 </small>
    </p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        loginInfo: {},
        loggingIn: false,
      };
    },
    methods: {
      ...mapActions(['login']),
      formLogin() {
        this.loggingIn = true;
        this.$refs.form.submit()
          .then(values => (
            this.login({
              email: values.email,
              password: values.password,
            })
          ))
          .then(() => this.$router.push({ name: 'Dashboard' }))
          .catch(err => this.utils.toast.error(err.message))
          .then(() => {
            this.loggingIn = false;
          });
      },
    },
  };
</script>
