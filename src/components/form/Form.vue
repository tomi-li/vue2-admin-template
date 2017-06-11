<template>
  <form :class="{'form-horizontal': direction === 'horizontal', 'form-inline': inline}">
    <pre v-if="debug">{{ itemsValidated }} {{value}}</pre>
    <slot></slot>
  </form>
</template>

<script>
  /* eslint-disable no-underscore-dangle */

  import _includes from 'lodash/includes';
  import _find from 'lodash/find';
  import _every from 'lodash/every';

  export default {
    model: {
      event: 'onValue',
    },
    props: {
      direction: {
        type: String,
        default: 'vertical',
        validator: value => _includes(['horizontal', 'vertical'], value),
      },
      ratio: {
        type: Array,
        default: () => [2, 10],
        validator: value => value && value.length === 2 && value[0] + value[1] === 12,
      },
      hasDivider: {
        type: Boolean,
        default: false,
      },
      inline: {
        type: Boolean,
        default: false,
      },
      debug: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        value: () => ({}),
        items: [],
        itemsValidated: true,
      };
    },
    methods: {
      /**
       * do validate on changes each time.
       * because. in VUE. updated lifecycle methods will not trigger for every changes.
       * will group them and fire them together like. _debounce in lodash
       */
      _validate() {
        this.itemsValidated = _every(this.items, 'validated');
      },
      onItemInserted(item) {
        if (_find(this.items, { name: item.name })) {
          console.warn(`[i-form] duplicated form name '${item.name}'`);
          return;
        }
        // check divider
        if (this.hasDivider && this.items.length !== 0) {
          item.renderDivider();
        }

        this.items = [...this.items, item];
        this._validate();
      },
      onItemValueChanged(value) {
        this.value = { ...this.value, ...value };
        this._validate();
        this.$emit('onValue', this.value);
      },
      submit() {
        this.items.forEach(formItem => formItem.touch());

        return new Promise((resolve, reject) => {
          if (this.itemsValidated) {
            resolve(this.value);
          } else {
            reject();
          }
        });
      },
    },
  };
</script>
