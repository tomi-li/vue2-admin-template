<template>
  <div>
    <div v-if="hasDivider" class="hr-line-dashed"></div>
    <div class="form-group" v-if="this.$parent.direction === 'vertical'">
    </div>

    <div class="form-group" v-if="this.$parent.direction === 'horizontal'">
      <label v-if="label" :for="`form-item-${this._uid}`" class="control-label" :class="`col-sm-${this.$parent.ratio[0]}`">{{ label }}</label>
      <div :class="`col-sm-${this.$parent.ratio[1]}`">
        <!-- one line text -->
        <input v-if="_in(type, ['text', 'number', 'email', 'password'])" :type="type" :id="`form-item-${this._uid}`" :placeholder="placeholder" class="form-control" @input="e => updateValue(e.target.value)" :value="value" :disabled="disabled">
        <!-- static text -->
        <p v-if="_in(type, ['static'])" class="form-control-static">{{ value }}</p>
        <!-- radio -->
        <div v-if="_in(type, ['radio'])">
          <div v-for="option in options" :class="{'checkbox-inline' : inline}" class="i-checks">
            <label>
              <i-radio :name="name" :value="option" :checked="option === value" @value="value => updateValue(value)" :disabled="disabled"></i-radio>
              {{ option }}
            </label>
          </div>
        </div>
        <!-- checkbox -->
        <div v-if="_in(type, ['checkbox'])">
          <div v-for="option in options" :class="{'checkbox-inline' : inline}" class="i-checks">
            <label>
              <i-checkbox :name="name" :value="option" :checked="_in(option, value)" @add="value => checkboxAdd(value)" @remove="value => checkboxRemove(value)" :disabled="disabled"></i-checkbox>
              {{ option }}
            </label>
          </div>
        </div>
        <!-- help text -->
        <span v-if="helpText" class="help-block m-b-none">{{ helpText }}</span>
      </div>
    </div>
  </div>
</template>


<script>
  import _includes from 'lodash/includes';
  import _remove from 'lodash/remove';

  export default {
    props: {
      label: {
        type: [String, Number],
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: 'text',
        validator: value => _includes(['text', 'email', 'number', 'password', 'static', 'radio', 'checkbox'], value),
      },
      placeholder: {
        type: [String, Number],
        default: '',
      },
      value: {
        default: '',
      },
      helpText: {
        type: [String, Number],
        default: '',
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      validator: {
        type: [Function, Array],
      },
      options: {
        type: Array,
      },
      inline: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        hasDivider: false,
        checkboxValue: [...this.value],
      };
    },
    created() {
      this.$parent.onItemInserted(this);
      this.updateValue(this.value);
    },
    methods: {
      renderDivider() {
        this.hasDivider = true;
      },
      // check if type is valid
      _in(type, options) {
        return _includes(options, type);
      },
      checkboxAdd(value) {
        if (_includes(this.checkboxValue, value)) return;
        this.checkboxValue.push(value);
        this.updateValue(this.checkboxValue);
      },
      checkboxRemove(value) {
        if (!_includes(this.checkboxValue, value)) return;
        _remove(this.checkboxValue, each => each === value);
        this.updateValue(this.checkboxValue);
      },
      updateValue(value) {
        this.$parent.onItemValueChanged({ [this.name]: value });
      },
    },
  };
</script>
