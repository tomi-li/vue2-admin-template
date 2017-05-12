<template>
  <button type="button" class="btn" :class="[`btn-${type}`, `btn-${size}`]" :data-dismiss="closeModal ? 'modal': ''" @click="click">
    <i v-if="icon" class="fa" :class="`fa-${icon}`"></i>
    {{ title }}
  </button>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'default',
      },
      title: {
        type: [String, Number],
      },
      size: {
        type: String,
        default: 'md',
      },
      closeModal: {
        type: Boolean,
        default: false,
      },
      onPress: {
        type: Function,
      },
      icon: {
        // font awesome fonts
        type: String,
      },
    },
    methods: {
      click() {
        if (this.onPress) this.onPress();
        this.$emit('onPress');
      },
    },
  };
</script>
