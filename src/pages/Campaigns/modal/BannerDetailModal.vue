<template>
  <i-modal title="Banner Detail" size="lg">

  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    computed: {
      id() {
        return this.params.id;
      },
    },
    created() {
      this.API.bannerDetail.request()
        .then((res) => {
          console.log(res.data);
        });
    },
  };
</script>
