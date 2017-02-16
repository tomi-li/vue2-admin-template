<template>
  <div>
    Main

    main

    <button type="button" @click="testModal">button</button>
  </div>
</template>

<script>
  import testModal from './testModal.vue';

  export default {
    created() {
      console.log(this.utils.$modal);
    },
    methods: {
      testModal: function() {
        this.utils.$modal(testModal, { data: [1, 2, 3] });
      }
    }
  };
</script>
