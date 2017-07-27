<template>
  <i-modal title="Block User">
    <i-form
      ref="form"
      direction="horizontal"
      :ratio="[3,9]">

      <i-form-item
        label="Host ID"
        name="host_id"
        :value="params.id"
        type="static"></i-form-item>

      <i-form-item
        label="Host Name"
        name="host_name"
        :value="params.name"
        type="static"></i-form-item>

      <i-form-item
        label="User ID"
        name="user_id"
        helpText="Blocked user will not be able to chat in broadcasts of this host"
        :required="true"></i-form-item>
    </i-form>

    <div slot="footer">
      <i-button type="default" title="Cancel" :closeModal="true"></i-button>
      <i-button type="danger" title="Block" @onPress="block"></i-button>
    </div>
  </i-modal>
</template>
<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    created() {
      if (this.params.id === undefined) {
        console.warn('[Modal] required properties id is not exist in params');
        this.dismiss();
      }
    },
    methods: {
      block() {
        this.$refs.form.submit()
          .then(data => this.API.block.request({ ...data, id: this.params.id, block_forever: true }))
          .then(() => this.utils.toast.success(`The user has been blocked from host ${this.params.id}`))
          .then(() => this.ok());
      },
    },
  };
</script>
