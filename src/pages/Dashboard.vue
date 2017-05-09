<template>
  <i-page>
    <i-button :on-press="testModal">button</i-button>
  </i-page>
</template>

<script>
  import testModal from './User/modal/testModal';

  export default {
    methods: {
      testModal() {
        this.utils.$modal(testModal, { data: [1, 2, 3] });
      },
    },
  };
</script>
