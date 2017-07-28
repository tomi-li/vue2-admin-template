<template>
  <img :src="srcURL" class="i-avatar"
       :class="{'circle-border': type === 'circle'}">
</template>

<script>
  import _includes from 'lodash/includes';

  const defaultAvatar = require('../assets/avatar.jpg');

  export default {
    props: {
      type: {
        type: String,
        default: 'circle',
        validator: value => _includes(['circle', 'square', 'rounded'], value),
      },
      src: {
        // no need to required
        type: String,
      },
    },
    computed: {
      srcURL() {
        return this.hasError ? defaultAvatar : this.src;
      },
    },
    data() {
      return {
        hasError: false,
      };
    },
    created() {
      const img = new Image();
      //      img.onerror = (e) => {
      //        console.log(e);
      //        this.hasError = true;
      //      };
      img.src = this.src;
    },
  };
</script>

<style lang="scss">
  .i-avatar {
    width: 48px;
    height: 48px;
  }
</style>
