<template>
  <i-modal title="Recommend User">
    <i-form
      :ratio="[3, 9]"
      direction="horizontal"
      ref="form">

      <i-form-item
        name="host_id"
        :value="id"
        label="User Id"
        type="static"></i-form-item>

      <i-form-item
        name="weight"
        label="Weight"
        :required="true"
        :value="100"
        type="number"></i-form-item>

      <i-form-item
        name="expire_date"
        label="Expire Date"
        type="date"
        :required="true"></i-form-item>

    </i-form>

    <div slot="footer">
      <i-button
        type="primary"
        title="Submit"
        @onPress="submit"></i-button>
    </div>
  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    computed: {
      id() {
        return this.params.userId;
      },
    },
    methods: {
      submit() {
        this.$refs.form.submit()
          .then(values => this.API.liveRecommend.request({ ...values, id: this.id }))
          .then(() => this.utils.toast.success('recommend success'))
          .then(() => this.ok())
          .catch(() => ({}));
      },
    },
  };
</script>
