<template>
  <form :class="{'form-horizontal': direction === 'horizontal'}">
    <pre>{{value}}</pre>
    <slot></slot>
  </form>
</template>

<script>
  import _includes from 'lodash/includes';
  import _find from 'lodash/find';

  export default {
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
    },
    data() {
      return {
        value: () => ({}),
        items: [],
      };
    },
    methods: {
      onItemInserted(item) {
        if (_find(this.items, { name: item.name })) {
          console.warn(`[i-form] duplicated form name '${item.name}'`);
          return;
        }
        this.items.push(item);

        // check divider
        if (this.hasDivider) {
          this.$children.forEach((child, index) => {
            if (index !== 0) child.renderDivider();
          });
        }
      },
      onItemValueChanged(value) {
        this.value = { ...this.value, ...value };
      },
    },
  };
</script>
