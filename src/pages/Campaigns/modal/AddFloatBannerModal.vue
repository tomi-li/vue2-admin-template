<template>
  <i-modal title="Add Float Banner">
    <i-form
      direction="horizontal"
      :ratio="[3,9]"
      ref="form">

      <i-form-item
        label="Position"
        name="bannerPosition"
        :required="true"></i-form-item>

      <i-form-item
        label="Name"
        name="bannerName"
        :required="true"></i-form-item>

      <i-form-item
        label="Activity Type"
        name="activityType"
        :required="true"></i-form-item>

      <i-form-item
        label="Click URL"
        name="bannerClickUrl"
        :required="true"></i-form-item>

      <i-form-item
        label="Poster"
        name="bannerPicUrl"
        type="photo"
        :required="true"></i-form-item>

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
          .then(values => this.API.floatBannerCreate.request(values))
          .then(() => this.utils.toast.success('Add Successful'))
          .then(() => this.ok())
          .catch(() => ({}));
      },
    },
  };
</script>
