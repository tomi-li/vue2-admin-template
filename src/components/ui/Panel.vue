<template>
  <div class="panel panel-primary">
    <div class="panel-heading" v-if="title">
      {{ title }}
    </div>

    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: [String, Number],
      },
    },
  };
</script>
