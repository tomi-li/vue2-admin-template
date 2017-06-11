<template>
  <i-modal title="Add Admin">
    <i-form
      ref="form"
      :debug="true"
      :ratio="[3,9]"
      direction="horizontal">

      <i-form-item
        label="name"
        name="username"
        :required="true"></i-form-item>

      <i-form-item
        label="Role"
        name="role"
        type="select"
        :options="roles"
        :required="true"></i-form-item>

      <i-form-item
        label="Email"
        name="email"
        :required="true"></i-form-item>

      <i-form-item
        label="Password"
        name="password"
        type="password"
        :required="true"></i-form-item>

      <i-form-item
        label="Re-Password"
        name="repassword"
        type="password"
        :required="true"></i-form-item>

      <i-form-item
        label="Phone Number"
        name="phone"></i-form-item>

    </i-form>

    <div slot="footer">
      <i-button
        title="Cancel"
        @onPress="dismiss"></i-button>
      <i-button
        title="Create"
        type="primary"
        @onPress="create"></i-button>
    </div>
  </i-modal>
</template>

<script>
  import API from '../../../api';

  export default {
    props: ['ok', 'dismiss'],
    data() {
      return {
        roles: [],
      };
    },
    created() {
      API.roleList.request()
        .then((res) => {
          this.roles = res.data.map(each => ({
            name: each.name,
            value: each.id,
          }));
        });
    },
    methods: {
      create() {
        this.$refs.form.submit()
          .then((values) => {
            if (values.password !== values.repassword) {
              throw Error('re-password are not identical with password');
            }
            return API.adminCreate.request(values);
          })
          .then(() => this.ok())
          .catch(e => this.utils.toast.error(e));
      },
    },
  };
</script>
