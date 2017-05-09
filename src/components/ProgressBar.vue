<template>
  <div class="progress progress-mini">
    <div class="progress-bar" :style="{width : `${width}%`}"></div>
  </div>
</template>

<script>
  export default {
    props: {
      minValue: {
        type: Number,
        default: 0,
      },
      maxValue: {
        type: Number,
        default: 100,
      },
      currentValue: {
        type: Number,
        require: true,
      },
    },
    computed: {
      width() {
        return ((this.currentValue - this.minValue) / (this.maxValue - this.minValue)) * 100;
      },
    },
  };
</script>
