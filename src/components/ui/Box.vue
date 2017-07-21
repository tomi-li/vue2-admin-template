<template>
  <div class="ibox">
    <div class="ibox-title" v-if="title"><h5>{{ title }}</h5></div>
    <div class="ibox-content" :class="{'no-padding': noPadding}">
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
      noPadding: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
