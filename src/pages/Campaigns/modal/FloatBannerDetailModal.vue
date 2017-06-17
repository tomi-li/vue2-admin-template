<template>
  <i-modal title="Float banner Detail" size="lg">

    <div class="row">
      <div class="col-sm-6">
        <i-list>
          <i-list-item label="ID">{{ floatBanner.bannerId }}</i-list-item>
          <i-list-item label="Name">{{ floatBanner.bannerName }}</i-list-item>
          <i-list-item label="Click URL">{{ floatBanner.bannerClickUrl }}</i-list-item>
          <i-list-item label="Activity Type">{{ floatBanner.activityType }}</i-list-item>
          <i-list-item label="Position">{{ floatBanner.bannerPosition }}</i-list-item>
          <i-list-item label="bannerIsDeleted">
            <i-boolean-text :value="floatBanner.bannerIsDeleted"></i-boolean-text>
          </i-list-item>
        </i-list>
      </div>

      <div class="col-sm-6">
        <img :src="floatBanner.bannerPicUrl" style="max-width: 100%"/>
      </div>
    </div>

  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    data() {
      return {
        floatBanner: {},
      };
    },
    computed: {
      id() {
        return this.params.id;
      },
    },
    created() {
      this.API.floatBannerDetail.request({ id: this.id })
        .then((res) => {
          this.floatBanner = res.data;
        });
    },
  };
</script>
