<template>
  <i-modal title="Reset Password">
    <i-form
      ref="form"
      direction="horizontal"
      :ratio="[3,9]">

      <i-form-item
        type="password"
        name="password"
        label="New Password"
        :required="true"></i-form-item>

      <i-form-item
        type="password"
        name="repassword"
        label="Repeat Password"
        :required="true"></i-form-item>

    </i-form>

    <div slot="footer">
      <i-button
        title="Cancel"
        @onPress="dismiss"></i-button>
      <i-button
        title="OK"
        @onPress="update"></i-button>
    </div>
  </i-modal>
</template>

<script>
  import API from '../../../api';

  export default {
    props: ['params', 'ok', 'dismiss'],
    data() {
      return {
        id: this.params.id,
      };
    },
    methods: {
      update() {
        this.$refs.form.submit()
          .then((value) => {
            if (value.password !== value.repassword) {
              throw Error('password not match');
            }

            return API.adminUpdatePassword.request({
              id: this.id,
              new_password: value.password,
              re_new_password: value.repassword,
            });
          })
          .then(() => {
            this.ok();
          })
          .catch(() => {
          });
      },
    },
  };
</script>
