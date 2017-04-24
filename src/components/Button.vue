<template>
  <button type="button" class="btn" :class="`btn-${type}`" data-dismiss="modal">Close</button>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: 'default'
      }
    }
  };
</script>
