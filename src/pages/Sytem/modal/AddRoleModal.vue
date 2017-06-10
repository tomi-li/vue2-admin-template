<template>
  <i-modal title="Add New Role">

    <i-form
      ref="form"
      direction="horizontal">
      <i-form-item
        label="name"
        name="name"
        type="text"
        :required="true"></i-form-item>
    </i-form>


    <div slot="footer">
      <i-button
        title="Cancel"
        @onPress="dismiss"></i-button>
      <i-button
        title="ok"
        type="primary"
        @onPress="addRole"></i-button>
    </div>

  </i-modal>
</template>

<script>
  import API from '../../../api';

  export default {
    props: ['params', 'ok', 'dismiss'],
    methods: {
      addRole() {
        this.$refs.form.submit()
          .then(value => (
            API.roleCreate.request({
              name: value.name,
            })
          ))
          .then(() => this.ok())
          .catch(() => ({}));
      },
    },
  };
</script>
