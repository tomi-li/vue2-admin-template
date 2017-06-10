<template>
  <i-modal :title="title">
    {{ content }}
    <div slot="footer">
      <i-button title="OK" type="primary" @onPress="ok"></i-button>
    </div>
  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok'],
    data() {
      return {
        title: '',
        content: '',
      };
    },
    created() {
      if (typeof this.params === 'string') {
        this.content = this.params;
      }
      if (typeof this.params === 'object') {
        this.title = this.params.title;
        this.content = this.params.content;
      }
    },
  };
</script>
