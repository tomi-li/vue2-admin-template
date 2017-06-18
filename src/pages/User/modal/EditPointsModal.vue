<template>
  <i-modal title="Edit Points">
    <i-form
      ref="form">
      <i-form-item
        label="Points"
        :value="params.level.point"
        name="points"></i-form-item>
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
        this.$refs.form.submit()
          .then(values => this.API.userSetPoint.request({
            id: this.params.id,
            points: values.points,
          }))
          .then(() => this.utils.toast.success('level set success'))
          .then(() => this.ok())
          .catch(e => this.utils.toast.error(e));
      },
    },
  };
</script>
