<template>
  <tr>
    <slot/>
  </tr>
</template>

<script>
  export default {
    mounted() {
      this.renderIndex();
    },
    updated() {
      this.renderIndex();
    },
    methods: {
      renderIndex() {
        if (this.$parent.data && this.$parent.data.length > 0 && this.$parent.withIndex) {
          const existIndexNode = this.$el.querySelector('[i-index]');
          if (existIndexNode) {
            existIndexNode.remove();
          }
          const index = ((this.$parent.page - 1) * this.$parent.pageSize)
            + this.$parent.$children.indexOf(this) + 1;
          const indexNode = document.createElement('td');
          indexNode.innerText = index.toString();
          indexNode.setAttribute('i-index', index);
          this.$el.insertBefore(indexNode, this.$el.firstChild);
        }
      },
    },
  };
</script>
