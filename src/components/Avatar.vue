<template>
  <img :src="hasError ? defaultAvatar : src" class="i-avatar"
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
    data() {
      return {
        hasError: false,
        // eslint-disable-next-line global-require
        defaultAvatar: require('../assets/avatar.jpg'),
      };
    },
    created() {
      const img = new Image();
      img.onerror = () => {
        this.hasError = true;
      };
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
