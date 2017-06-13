<template>
  <i-modal title="Feedback Detail">

    <i-form
      direction="horizontal"
      :ratio="[3, 9]">

      <i-form-item
        name="userId"
        label="User ID"
        :value="feedback.userId"
        type="static"></i-form-item>

      <i-form-item
        name="creationDate"
        label="Creation Date"
        :value="feedback.createTime | datetime"
        type="static"></i-form-item>

      <i-form-item
        name="content"
        label="Content"
        :value="feedback.content"
        type="static"></i-form-item>

    </i-form>

    <div slot="footer">
      <i-button
        title="Close"
        @onPress="dismiss"></i-button>
    </div>
  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    data() {
      return {
        feedback: {},
      };
    },
    created() {
      this.API.feedbackDetail.request({ id: this.params.id })
        .then((res) => {
          this.feedback = res.data;
        });
    },
  };
</script>
