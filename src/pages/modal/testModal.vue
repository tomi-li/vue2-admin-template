<template>
  <i-modal
    title="Test Modal">
    ...
    <button @click="newmodal">another modal</button>

    <div slot="footer">
      <i-button title="Close" :closeModal="true"></i-button>
      <i-button type="primary" title="Save changes"></i-button>
    </div>
  </i-modal>
</template>

<script>
  import modal2 from './testModal2';

  export default {
    methods: {
      newmodal() {
        this.utils.$modal(modal2);
      },
    },
  };
</script>
