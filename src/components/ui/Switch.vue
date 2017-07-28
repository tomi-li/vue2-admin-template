<template>
  <input type="checkbox" class="js-switch" :checked="this.value ? 'checked' : ''">
</template>

<script>
  import 'switchery/switchery.css';
  import Switchery from 'switchery';

  export default {
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String, // ['sm', 'default', 'lg']
        default: 'default',
      },
    },
    mounted() {
      const options = {
        size: this.size,
      };
      const el = new Switchery(this.$el, options);
      el.switcher.addEventListener('click', () => {
        this.$emit('change', el.element.checked);
      });
    },
  };
</script>
