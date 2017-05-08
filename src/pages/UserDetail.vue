<template>

  <div>
    test
  </div>
</template>

<script>
  import api, { request } from '../api';

  export default {
    data() {
      return {
        id: undefined,
      };
    },
    created() {
      const { id } = this.$route.params;
      if (id === undefined) throw new Error('path param <id> can not be null');

      this.id = id;
      request(api.userDetail, { id })
        .then(({ data }) => {
          console.log(data);
        });
    },
  };
</script>
