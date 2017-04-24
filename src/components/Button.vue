<template>
  <button type="button" class="btn" :class="`btn-${type}`" :data-dismiss="closeModal ? 'modal': ''" @click="click">{{ title }}</button>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'default',
      },
      title: {
        type: String,
        default: 'Button',
      },
      closeModal: {
        type: Boolean,
        default: false,
      },
      onPress: {
        type: Function,
      },
    },
    methods: {
      click() {
        if (this.onPress) this.onPress();
      },
    },
  };
</script>
