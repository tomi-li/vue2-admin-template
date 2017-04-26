<template>
  <input type="checkbox" :name="name" :checked="checked" :disabled="disabled">
</template>

<script>
  import $ from 'jquery';

  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      checked: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      value: {},
    },
    mounted() {
      $(this.$el).iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
      }).on('ifChecked', () => {
        this.$emit('add', this.value);
      }).on('ifUnchecked', () => {
        this.$emit('remove', this.value);
      });
    },
  };
</script>
