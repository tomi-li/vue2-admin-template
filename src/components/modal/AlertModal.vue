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
        title: this.params.title,
        content: this.params.content,
      };
    },
  };
</script>
