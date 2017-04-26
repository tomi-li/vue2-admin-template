<template>
  <i-page>
    <i-button :on-press="testModal">button</i-button>
  </i-page>
</template>

<script>
  import testModal from './modal/testModal';
  import api, { request } from '../api';

  export default {
    created() {
      request(api.login).then((res) => {
        console.log(res);
      });
    },
    methods: {
      testModal() {
        this.utils.$modal(testModal, { data: [1, 2, 3] });
      },
    },
  };
</script>
