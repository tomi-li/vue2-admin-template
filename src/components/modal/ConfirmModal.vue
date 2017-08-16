<template>
  <i-modal :title="title">
    {{ content }}
    <div slot="footer">
      <i-button title="Cancel" @onPress="dismiss"></i-button>
      <i-button title="OK" type="primary" @onPress="internalOK"></i-button>
    </div>
  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss', 'okCallback'],
    data() {
      return {
        title: this.params.title,
        content: this.params.content,
      };
    },
    methods: {
      internalOK() {
        console.log(this.okCallback);
        if (this.okCallback) {
          this.okCallback()
            .then(() => this.ok())
            .catch(() => this.dismiss());
        } else {
          this.ok();
        }
      },
    },
  };
</script>
