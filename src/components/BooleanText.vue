<template>
  <span v-if="value" class="text-navy">YES</span>
  <span v-else="value" class="text-danger">NO</span>
</template>

<script>
  export default {
    props: {
      value: {
        type: [Boolean, undefined],
      },
    },
  };
</script>
