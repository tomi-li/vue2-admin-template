<template>
  <i-modal title="Reset Password">
    <i-form
      ref="form"
      direction="horizontal"
      :ratio="[3,9]">

      <i-form-item
        type="password"
        name="new_password"
        label="New Password"
        :required="true"></i-form-item>

      <i-form-item
        type="password"
        name="re_new_password"
        label="Re-Password"
        :required="true"></i-form-item>

    </i-form>

    <div slot="footer">
      <i-button
        title="Cancel"
        @onPress="dismiss"></i-button>
      <i-button
        title="Reset"
        type="primary"
        @onPress="update"></i-button>
    </div>
  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    methods: {
      update() {
        this.$refs.form.submit()
          .then((values) => {
            if (values.new_password !== values.re_new_password) {
              this.utils.toast.error('password not match');
              throw Error();
            }
            return this.API.adminUpdatePassword.request({ ...values, id: this.params.id });
          })
          .then(() => this.ok())
          .catch(() => ({}));
      },
    },
  };
</script>
