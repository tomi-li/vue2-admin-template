<template>
  <i-modal title="Edit Level">
    <i-form
      ref="form">
      <i-form-item
        label="Level"
        :value="params.level.level"
        name="level"></i-form-item>
    </i-form>

    <div slot="footer">
      <i-button
        title="Cancel"
        @onPress="dismiss"></i-button>
      <i-button
        title="Submit"
        type="primary"
        @onPress="submit"></i-button>
    </div>
  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    methods: {
      submit() {
        console.log(this.params);
        this.$refs.form.submit()
          .then(values => this.API.userSetLevel.request({ id: this.params.id, level: values.level }))
          .then(() => this.utils.toast.success('level set success'))
          .then(() => this.ok())
          .catch(e => this.utils.toast.error(e));
      },
    },
  };
</script>
