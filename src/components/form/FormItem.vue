<template>
  <div :style="{'display': this.formParent.inline ? 'inline-block' : 'block'}">
    <!---->
    <div v-if="showDivider" class="hr-line-dashed"></div>

    <!-- vertical -->
    <div v-if="this.formParent.direction === 'vertical'" class="form-group" :class="{'has-error' : showError}">
      <label v-if="label" :for="`form-item-${this._uid}`" class="control-label">{{ label }} <span v-if="this.required">*</span></label>
      <!-- one line text -->
      <input v-if="_in(type, ['text', 'number', 'email', 'password'])"
             class="form-control"
             :class="`input-${size}`"
             :type="type"
             :id="`form-item-${this._uid}`"
             :placeholder="placeholder"
             @input="e => receiveValue(e.target.value)" :value="internalValue"
             :disabled="disabled">

      <!-- static text -->
      <p v-if="_in(type, ['static'])" class="form-control-static">{{ internalValue }}</p>
      <!-- radio -->
      <i-radio-group v-if="_in(type, ['radio'])"
                     :name="name"
                     :options="options"
                     :inline="inline"
                     :value="internalValue"
                     @value="value => receiveValue(value)"></i-radio-group>

      <!-- checkbox -->
      <i-checkbox-group v-if="_in(type, ['checkbox'])"
                        :name="name"
                        :options="options"
                        :inline="inline"
                        :value="internalValue"
                        @value="value => receiveValue(value)"></i-checkbox-group>
      <!-- Select -->
      <i-select v-if="_in(type, ['select'])"
                :options="options"
                :value="internalValue"
                @value="value => receiveValue(value)"></i-select>

      <!-- Date -->
      <i-date-picker v-if="_in(type, ['date'])"
                     :placeholder="placeholder"
                     :value="value"
                     @value="value => receiveValue(value)"></i-date-picker>
      <!-- DateRange -->
      <i-date-range-picker v-if="_in(type, ['date-range'])"
                           :value="value"
                           @value="value => receiveValue(value)"></i-date-range-picker>

      <!-- Text Area -->
      <textarea v-if="_in(type, ['textarea'])" class="form-control" @input="e => receiveValue(e.target.value)"></textarea>

      <!-- Photo -->
      <i-file-upload
        v-if="_in(type, ['photo'])"
        :value="value"
        @onValue="value => receiveValue(value)"></i-file-upload>
      <a v-if="_in(type, ['photo']) && internalValue" target="_blank" :href="internalValue">Preview</a>

      <!-- help text -->
      <span v-if="helpText" class="help-block m-b-none">{{ helpText }}</span>
      <!-- error text -->
      <span v-if="showError" v-for="errorMessage in errorMessages" class="help-block m-b-none error">{{ errorMessage }}</span>
    </div>

    <!-- horizontal -->
    <div v-if="this.formParent.direction === 'horizontal'" class="form-group" :class="{'has-error' : showError }">
      <label v-if="label" :for="`form-item-${this._uid}`" class="control-label" :class="`col-sm-${this.formParent.ratio[0]}`">{{ label }} <span v-if="this.required">*</span></label>
      <div :class="`col-sm-${this.formParent.ratio[1]}`">
        <!-- one line text -->
        <input v-if="_in(type, ['text', 'number', 'email', 'password'])"
               class="form-control"
               :class="`input-${size}`"
               :type="type"
               :id="`form-item-${this._uid}`"
               :placeholder="placeholder"
               @input="e => receiveValue(e.target.value)"
               :value="internalValue"
               :disabled="disabled">

        <!-- static text -->
        <p v-if="_in(type, ['static'])" class="form-control-static">{{ internalValue }}</p>

        <!-- radio -->
        <i-radio-group v-if="_in(type, ['radio'])"
                       :name="name"
                       :options="options"
                       :inline="inline"
                       :value="internalValue"
                       @value="value => receiveValue(value)"></i-radio-group>

        <!-- checkbox -->
        <i-checkbox-group v-if="_in(type, ['checkbox'])"
                          :name="name"
                          :options="options"
                          :inline="inline"
                          :value="internalValue"
                          @value="value => receiveValue(value)"></i-checkbox-group>

        <!-- Select -->
        <i-select v-if="_in(type, ['select'])"
                  :options="options"
                  :value="internalValue"
                  @value="value => receiveValue(value)"></i-select>

        <!-- Date -->
        <i-date-picker v-if="_in(type, ['date'])"
                       :placeholder="placeholder"
                       :value="value"
                       @value="value => receiveValue(value)"></i-date-picker>

        <!-- DateRange -->
        <i-date-range-picker v-if="_in(type, ['date-range'])"
                             :value="value"
                             @value="value => receiveValue(value)"></i-date-range-picker>


        <!-- Text Area -->
        <textarea v-if="_in(type, ['textarea'])" class="form-control" @input="e => receiveValue(e.target.value)"></textarea>

        <!-- Photo -->
        <i-file-upload
          v-if="_in(type, ['photo'])"
          :value="value"
          @onValue="value => receiveValue(value)"></i-file-upload>
        <a v-if="_in(type, ['photo']) && internalValue" target="_blank" :href="internalValue">Preview</a>

        <!-- help text -->
        <span v-if="helpText" class="help-block m-b-none">{{ helpText }}</span>
        <!-- error text -->
        <span v-if="showError" v-for="errorMessage in errorMessages" class="help-block m-b-none error">{{ errorMessage }}</span>
      </div>
    </div>
  </div>
</template>


<script>
  /* eslint-disable max-len */

  import _includes from 'lodash/includes';

  function findParentForm(parent) {
    if (parent.$options._componentTag === 'i-form') {
      return parent;
    }
    return findParentForm(parent.$parent);
  }

  export default {
    props: {
      label: {
        type: [String, Number],
      },
      size: {
        // works for [input]
        type: String,
      },
      name: {
        type: [String, Array],
        required: true,
      },
      type: {
        type: String,
        default: 'text',
        validator: value => _includes(['text', 'email', 'number', 'password', 'static', 'radio', 'checkbox', 'select', 'date', 'date-range', 'textarea', 'photo'], value),
      },
      placeholder: {
        type: [String, Number],
      },
      value: {},
      helpText: {
        type: [String, Number],
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      validator: {
        // {
        //  fn: function.
        //  message: error message.
        // }
        type: [Object, Array],
        default: () => ([]),
      },
      options: {
        // ['checkbox', 'radio', 'select'] options
        type: Array,
      },
      inline: {
        // ['checkbox', 'radio'] display inline or block
        type: Boolean,
        default: false,
      },
      required: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        // to display divider
        showDivider: false,
        // to initialize form value, all calculations are base on internal value
        internalValue: undefined,
        validated: true,
        errorMessages: [],
        touched: false,
        internalValidators: [], // for add validator in runtime
      };
    },
    watch: {
      // Since we are copying value to internal value.
      // we need to setup a watcher to monitor the changes of value
      value(value) {
        this.internalValue = value;
        this._updateValue(this.internalValue);
      },
    },
    created() {
      this.internalValue = this.value;

      // check if the validator value is object
      if (this.validator && !(this.validator instanceof Array)) {
        this.internalValidators.push(this.validator);
      }

      // add required validator if is required
      if (this.required) {
        this.internalValidators.push({
          fn: value => value !== undefined && value !== '',
          message: 'value can not be empty',
        });
      }

      this._updateValue(this.internalValue);
      this.formParent.onItemInserted(this);
    },
    computed: {
      formParent() {
        return findParentForm(this);
      },
      // to determine if show error.
      showError() {
        return !this.validated && this.touched;
      },
    },
    methods: {
      // for parent to call
      renderDivider() {
        this.showDivider = true;
      },
      touch() {
        this.touched = true;
      },
      // check if type is valid
      _in(type, options) {
        return _includes(options, type);
      },
      _validate(value) {
        // if no validator. skip
        if (this.internalValidators.length === 0) return [];

        const errors = [];
        this.internalValidators.forEach((each) => {
          if (!each.fn(value)) {
            console.warn(`[form-item] value '${value}' is not valid for '${this.name}'`);
            errors.push(each.message);
          }
        });
        // get errors message.
        this.errorMessages = errors;
        return errors;
      },
      _updateValue(value) {
        this.internalValue = value;

        const errors = this._validate(value);
        if (errors.length > 0) {
          this.validated = false;
          if (this.name instanceof Array) {
            this.name.forEach(name => this.formParent.onItemValueChanged({ [name]: undefined }));
          } else {
            this.formParent.onItemValueChanged({ [this.name]: undefined });
          }
          return;
        }

        this.validated = true;
        if (this.name instanceof Array) {
          if (value !== undefined && !(value instanceof Array)) {
            console.warn('value is not an array. but got name is Array');
          }

          if (value === undefined) {
            this.name.forEach(name => this.formParent.onItemValueChanged({ [name]: undefined }));
          } else if (value && value instanceof Array) {
            this.name.forEach((name, index) => this.formParent.onItemValueChanged({ [name]: value[index] }));
          } else {
            // there maybe new situations.
            console.log('warning because value type is not expected');
            this.name.forEach(name => this.formParent.onItemValueChanged({ [name]: undefined }));
          }
        } else {
          this.formParent.onItemValueChanged({ [this.name]: value });
        }
      },
      receiveValue(value) {
        if (!this.touched) this.touched = true;
        this._updateValue(value);
      },
    },
  };
</script>
