<template>
  <div class="i-gallery">
    <div v-if="isPureImage">
      <a v-for="(image, index) in images" class="gallery-image" @click="() => showGallery(index)">
        <img :src="image">
      </a>
    </div>
    <div v-else="isPureImage">
      <a v-for="(imageObject, index) in images" class="gallery-image"
         :data-description="imageObject.description"
         @click="() => showGallery(index)">
        <img :src="imageObject.thumbnail">
      </a>
    </div>
  </div>
</template>

<script>
  import Gallery from 'blueimp-gallery';
  import $ from 'jquery';
  import _every from 'lodash/every';
  import 'blueimp-gallery/css/blueimp-gallery.min.css';

  const template = `
    <div id="blueimp-gallery" class="blueimp-gallery">
        <div class="slides"></div>
        <h3 class="title"></h3>
        <a class="prev">‹</a>
        <a class="next">›</a>
        <a class="close">×</a>
        <a class="play-pause"></a>
        <ol class="indicator"></ol>
      </div>
  `;

  export default {
    props: {
      images: {
        type: Array,
      },
    },
    data() {
      return {
        isPureImage: true,
      };
    },
    created() {
      if (this.images && this.images.length > 0) {
        if (_every(this.images, each => typeof each === 'object')) {
          this.isPureImage = false;
        } else if (_every(this.images, each => typeof each === 'string')) {
          this.isPureImage = true;
        } else {
          throw new Error('[i-gallery] Images type invalid');
        }
      }
    },
    destroyed() {
      const gallery = $('#blueimp-gallery');
      if (gallery.length) gallery.remove();
    },
    methods: {
      showGallery(index) {
        const gallery = $('#blueimp-gallery');
        if (!gallery.length) $('body').append($(template));
        Gallery(this.images, { index, title: 'wocao ' });
      },
    },
  };
</script>

<style lang="scss">
  $width: 100px;
  $height: 100px;

  .gallery-image {
    img {
      width: $width;
      height: $height;
    }
  }
</style>
