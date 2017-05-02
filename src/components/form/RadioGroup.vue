<template>
  <div>
    <div v-for="option in options" :class="{'checkbox-inline' : inline}" class="i-checks">
      <label>
        <i-radio :name="name" :value="option" :checked="option === value" @value="value => emitValue(value)" :disabled="disabled"></i-radio>
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script>
  import _includes from 'lodash/includes';

  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      options: {
        type: Array,
        required: true,
      },
      inline: {
        type: Boolean,
        default: false,
      },
      value: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      _in(type, options) {
        return _includes(options, type);
      },
      emitValue(value) {
        this.$emit('value', value);
      },
    },
  };
</script>
