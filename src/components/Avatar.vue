<template>
  <img :src="src" class="i-avatar"
       :class="{'circle-border': type === 'circle'}">
</template>

<script>
  import _includes from 'lodash/includes';

  export default {
    props: {
      type: {
        type: String,
        default: 'circle',
        validator: value => _includes(['circle', 'square', 'rounded'], value),
      },
      src: {
        type: String,
      },
    },
  };
</script>

<style lang="scss">
  .i-avatar {
    width: 48px;
    height: 48px;
  }
</style>
