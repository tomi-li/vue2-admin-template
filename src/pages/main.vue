<template>
  <div>
    <i-button :on-press="testModal">button</i-button>
  </div>
</template>

<script>
  import testModal from './testModal';

  export default {
    methods: {
      testModal() {
        this.utils.$modal(testModal, { data: [1, 2, 3] });
      },
    },
  };
</script>
