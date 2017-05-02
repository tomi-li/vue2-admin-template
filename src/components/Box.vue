<template>
  <div class="ibox float-e-margins">
    <div class="ibox-title" v-if="title"><h5>{{ title }}</h5></div>
    <div class="ibox-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '',
      },
    },
  };
</script>
