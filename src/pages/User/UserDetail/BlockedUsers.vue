<template>
  <div>

  </div>
</template>

<script>
  export default {
    created() {
      console.log(this);
      this.API.blockList.request({ id: this.$route.params.id })
        .then((res) => {
          console.log(res);
        });
    },
  };
</script>
