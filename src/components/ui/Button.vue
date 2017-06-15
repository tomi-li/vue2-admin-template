<template>
  <button :type="buttonType" class="btn" :class="[`btn-${type}`, `btn-${size}`, {'disabled': loading }]" :data-dismiss="closeModal ? 'modal': ''" @click="click">
    <i v-if="icon" class="fa" :class="`fa-${icon}`"></i>
    {{ title }}
    <i v-if="loading" class="fa fa-spin fa-spinner"></i>
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
      loading: {
        type: Boolean,
        default: false,
      },
      isSubmit: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      buttonType() {
        return this.isSubmit ? 'submit' : 'button';
      },
    },
    methods: {
      click() {
        // if it's loading. disable events
        if (this.loading) return;
        if (this.onPress) this.onPress();
        this.$emit('onPress');
      },
    },
  };
</script>
