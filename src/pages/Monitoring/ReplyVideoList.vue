<template>
  <i-page>
    <i-box>
      <div data-vjs-player>
        <video id="test" controls>
          <source src="http://d2uh71tzz9osss.cloudfront.net:80/videodt/mp4:/2017/05/03/14/191125/1493793029004/playlist.m3u8" type="application/x-mpegURL">
        </video>
      </div>
    </i-box>
  </i-page>
</template>

<script>
  import 'video.js/dist/video-js.css';
  import videojs from 'video.js';


  export default {
    created() {
      videojs(this.$el.querySelector('#test'));
    },
  };
</script>
