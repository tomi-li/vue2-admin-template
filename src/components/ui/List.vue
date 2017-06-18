<template>
  <ul class="list-group" :class="[`list-group-${size}`, {'no-border': !hasBorder}, {'right-angle' : !isRound}]">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        default: 'md',
      },
      hasBorder: {
        type: Boolean,
        default: true,
      },
      isRound: {
        type: Boolean,
        default: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .list-group {
    &.no-border .list-group-item {
      border: 0;
    }

    &.right-angle .list-group-item {
      border-radius: 0;
      border-left: 0;
      border-right: 0;
    }

    &.list-group-sm .list-group-item {
      padding: 6px 10px;
    }

    &.list-group-xs .list-group-item {
      padding: 4px 8px;
    }
  }


</style>
