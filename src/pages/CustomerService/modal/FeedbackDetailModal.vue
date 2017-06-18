<template>
  <i-modal title="Feedback Detail">
    
    <div class="row">
      <div class="col-xs-6">
        <i-list>
          <i-list-item label="ID"> {{ feedback.id }} </i-list-item>
          <i-list-item label="User ID"> {{ feedback.userId }} </i-list-item>
          <i-list-item label="Create Time"> {{ feedback.createTime | datetime }} </i-list-item>
        </i-list>
      </div>

      <div class="col-xs-6">
        <h3>Content</h3>
        <p>{{ feedback.content }}</p>
      </div>
    </div>

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
