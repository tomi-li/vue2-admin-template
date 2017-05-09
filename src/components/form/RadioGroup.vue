<template>
  <div>
    <div v-for="option in options" :class="{'checkbox-inline' : inline}" class="i-checks">
      <label v-if="isSimpleData">
        <i-radio :name="name" :value="option" :checked="option === value" @value="value => emitValue(value)" :disabled="disabled"></i-radio>
        {{ option }}
      </label>
      <label v-else="isSimpleData">
        <i-radio :name="name" :value="option.value" :checked="option.value === value" @value="value => emitValue(value)" :disabled="disabled"></i-radio>
        {{ option.name }}
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
        type: [String, Number],
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      isSimpleData() {
        if (!this.options || this.options.length === 0) return true;
        return typeof this.options[0] === 'string';
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
