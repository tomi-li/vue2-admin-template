<template>
  <div :style="{'display': this.$parent.inline ? 'inline-block' : 'block'}">
    <!---->
    <div v-if="showDivider" class="hr-line-dashed"></div>
    <!---->
    <div class="form-group" v-if="this.$parent.direction === 'vertical'">
      <label v-if="label" :for="`form-item-${this._uid}`" class="control-label">{{ label }}</label>
      <!-- one line text -->
      <input v-if="_in(type, ['text', 'number', 'email', 'password'])" :type="type" :id="`form-item-${this._uid}`" :placeholder="placeholder" class="form-control" @input="e => updateValue(e.target.value)" :value="internalValue" :disabled="disabled">
      <!-- static text -->
      <p v-if="_in(type, ['static'])" class="form-control-static">{{ internalValue }}</p>
      <!-- radio -->
      <div v-if="_in(type, ['radio'])">
        <div v-for="option in options" :class="{'checkbox-inline' : inline}" class="i-checks">
          <label>
            <i-radio :name="name" :value="option" :checked="option === internalValue" @value="value => updateValue(value)" :disabled="disabled"></i-radio>
            {{ option }}
          </label>
        </div>
      </div>
      <!-- checkbox -->
      <div v-if="_in(type, ['checkbox'])">
        <div v-for="option in options" :class="{'checkbox-inline' : inline}" class="i-checks">
          <label>
            <i-checkbox :name="name" :value="option" :checked="_in(option, internalValue)" @add="value => checkboxAdd(value)" @remove="value => checkboxRemove(value)" :disabled="disabled"></i-checkbox>
            {{ option }}
          </label>
        </div>
      </div>
      <!-- Select -->

      <!-- help text -->
      <span v-if="helpText" class="help-block m-b-none">{{ helpText }}</span>
      <!-- error text -->
      <span v-for="errorMessage in errorMessages" class="help-block m-b-none error">{{ errorMessage }}</span>
    </div>

    <div class="form-group" :class="{'has-error' : !validated}" v-if="this.$parent.direction === 'horizontal'">
      <label v-if="label" :for="`form-item-${this._uid}`" class="control-label" :class="`col-sm-${this.$parent.ratio[0]}`">{{ label }}</label>
      <div :class="`col-sm-${this.$parent.ratio[1]}`">
        <!-- one line text -->
        <input v-if="_in(type, ['text', 'number', 'email', 'password'])" :type="type" :id="`form-item-${this._uid}`" :placeholder="placeholder" class="form-control" @input="e => updateValue(e.target.value)" :value="internalValue" :disabled="disabled">
        <!-- static text -->
        <p v-if="_in(type, ['static'])" class="form-control-static">{{ internalValue }}</p>
        <!-- radio -->
        <div v-if="_in(type, ['radio'])">
          <div v-for="option in options" :class="{'checkbox-inline' : inline}" class="i-checks">
            <label>
              <i-radio :name="name" :value="option" :checked="option === internalValue" @value="value => updateValue(value)" :disabled="disabled"></i-radio>
              {{ option }}
            </label>
          </div>
        </div>
        <!-- checkbox -->
        <div v-if="_in(type, ['checkbox'])">
          <div v-for="option in options" :class="{'checkbox-inline' : inline}" class="i-checks">
            <label>
              <i-checkbox :name="name" :value="option" :checked="_in(option, internalValue)" @add="value => checkboxAdd(value)" @remove="value => checkboxRemove(value)" :disabled="disabled"></i-checkbox>
              {{ option }}
            </label>
          </div>
        </div>
        <!-- Select -->

        <!-- help text -->
        <span v-if="helpText" class="help-block m-b-none">{{ helpText }}</span>
        <!-- error text -->
        <span v-for="errorMessage in errorMessages" class="help-block m-b-none error">{{ errorMessage }}</span>
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
        // {
        //  fn: function.
        //  message: error message.
        // }
        type: [Object, Array],
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
    },
    data() {
      return {
        showDivider: false, // to display divider
        internalValue: undefined, // to initialize form value, all calculate is base on internal value
        checkboxValue: [...this.value], // for checkbox only
        validated: true,
        errorMessages: [],
      };
    },
    created() {
      this.internalValue = this.value;
      this.updateValue(this.internalValue);
      this.$parent.onItemInserted(this);
    },
    methods: {
      renderDivider() {
        this.showDivider = true;
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
        this.internalValue = value;

        if (this.validator !== undefined) {
          const validatorArray = (this.validator instanceof Array)
            ? this.validator
            : [this.validator];
          const errors = [];
          validatorArray.forEach((each) => {
            if (!each.fn(value)) {
              console.warn(`[form-item] value '${value}' is not valid for '${this.name}'`);
              errors.push(each.message);
            }
          });
          // get errors message.
          this.errorMessages = errors;
          if (errors.length > 0) {
            this.validated = false;
            this.$parent.onItemValueChanged({ [this.name]: undefined });
            return;
          }
        }

        this.validated = true;
        this.$parent.onItemValueChanged({ [this.name]: value });
      },
    },
  };
</script>

<style>
  .i-form-item-container {
    display: inline-block;
  }
</style>
