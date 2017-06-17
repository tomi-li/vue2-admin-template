<template>
  <i-modal title="Banner Detail" size="lg">

    <div class="row">
      <div class="col-sm-6">
        <i-list>
          <i-list-item label="ID">{{ banner.id }}</i-list-item>
          <i-list-item label="Name">{{ banner.adv_name }}</i-list-item>
          <i-list-item label="Click URL">{{ banner.click_url }}</i-list-item>
          <i-list-item label="Weight">{{ banner.weight }}</i-list-item>
        </i-list>
      </div>

      <div class="col-sm-6">
        <img :src="banner.pic_url" style="max-width: 100%"/>
      </div>
    </div>

  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    data() {
      return {
        banner: {},
      };
    },
    computed: {
      id() {
        return this.params.id;
      },
    },
    created() {
      this.API.bannerDetail.request({ id: this.id })
        .then((res) => {
          this.banner = res.data;
        });
    },
  };
</script>
