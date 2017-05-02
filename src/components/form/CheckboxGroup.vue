<template>
  <div>
    <div v-for="option in options" :class="{'checkbox-inline' : inline}" class="i-checks">
      <label>
        <i-checkbox :name="name" :value="option" :checked="_in(option, value)" @add="value => checkboxAdd(value)" @remove="value => checkboxRemove(value)" :disabled="disabled"></i-checkbox>
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script>
  import _includes from 'lodash/includes';
  import _remove from 'lodash/remove';

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
        type: Array,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        checkboxValue: this.value || [],
      };
    },
    methods: {
      _in(type, options) {
        return _includes(options, type);
      },
      checkboxAdd(value) {
        if (_includes(this.checkboxValue, value)) return;
        this.checkboxValue.push(value);
        this.$emit('value', this.checkboxValue);
      },
      checkboxRemove(value) {
        if (!_includes(this.checkboxValue, value)) return;
        _remove(this.checkboxValue, each => each === value);
        this.$emit('value', this.checkboxValue);
      },
    },
  };
</script>
