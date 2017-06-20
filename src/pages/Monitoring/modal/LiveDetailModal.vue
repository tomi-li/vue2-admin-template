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
  import config from '../../../config';
  import * as utils from '../../../utils';
  //  import io from 'socket.io-client';

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
      const wsURL = `${config.CHAT_URL_BASE}?${utils.serialize({
        userID: 10000,
        roomID: this.live.userId, //  This place has to be userId. DO NOT TOUCH.  it's not a bug.
      })}`;
      const socket = new WebSocket(wsURL);

      socket.onopen = (message) => {
        console.log('opend');
        console.log(message);
      };
      socket.onmessage = (message) => {
        console.log(message);
        // TODO handle Message
      };
      this.API.liveStatistic.request({ id: this.live.sessionId })
        .then((res) => {
          this.statistic = res.data;
        });
    },
  };
</script>
