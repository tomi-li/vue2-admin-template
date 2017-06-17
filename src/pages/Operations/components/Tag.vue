<template>
  <span class="tag label label-info">
    <span>{{ value.tag_name }}</span>
    <a class="tag-remove" @click="remove"><i class="fa fa-remove"></i></a>
  </span>
</template>

<script>
  export default {
    props: ['value'],
    methods: {
      remove() {
        this.$emit('onDelete', this.value.id);
      },
    },
  };
</script>

<style scoped>
  .tag {
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    margin: 5px;
    line-height: 20px;
  }

  .tag-remove {
    color: white;
  }
</style>
