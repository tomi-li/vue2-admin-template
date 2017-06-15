<template>
  <div :id="`tab-${this._uid}`" class="tab-pane" :class="{active}">
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'New Tab',
      },
    },
    data() {
      return {
        active: false,
      };
    },
    mounted() {
      this.$parent.onTabInserted(this.title, this);
    },
    destoryed() {
      this.$parent.onTabRemoved(this.title, this);
    },
  };
</script>


<style scoped>
  .panel-body {
    overflow: hidden;
  }
</style>
