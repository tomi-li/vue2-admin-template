<template>
  <i-page>
    Nothing here yet.
    <i-file-upload
      @onValue="log"></i-file-upload>
  </i-page>
</template>

<script>
  export default {
    methods: {
      log(value) {
        console.log(value);
      },
    },
  };
</script>
