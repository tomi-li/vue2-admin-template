<template>
  <i-modal title="Video Detail" size="lg">

    <i-tabs>
      <i-tab title="Video">
        <i-video-player
          :url="urls.hlsUrl"></i-video-player>
      </i-tab>
      <i-tab title="Statistics">
        <i-list>
          <i-list-item label="Currency">{{ statistic.currency}}</i-list-item>
          <i-list-item label="Diamond Count">{{ statistic.diamond_count}}</i-list-item>
          <i-list-item label="Earnings">{{ statistic.earnings}}</i-list-item>
          <i-list-item label="Gift Count">{{ statistic.gift_count}}</i-list-item>
          <i-list-item label="Like Count">{{ statistic.like_count}}</i-list-item>
          <i-list-item label="Online Count">{{ statistic.online_count}}</i-list-item>
          <i-list-item label="PV Count">{{ statistic.pv_count}}</i-list-item>
          <i-list-item label="UV Count">{{ statistic.uv_count}}</i-list-item>
        </i-list>
      </i-tab>
    </i-tabs>


  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    data() {
      return {
        urls: this.params.live.nbsSessionUrls[0],
        statistic: {},
      };
    },
    computed: {
      live() {
        return this.params.live;
      },
    },
    created() {
      this.API.liveStatistic.request({ id: this.live.sessionId })
        .then((res) => {
          this.statistic = res.data;
        });
    },
  };
</script>
