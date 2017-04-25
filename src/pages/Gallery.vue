<template>
  <i-page>
    <i-box title="basic images">
      <i-gallery
        :images="images"></i-gallery>
    </i-box>

    <i-box title="full images">
      <i-gallery
        :images="fullImages"></i-gallery>
    </i-box>
  </i-page>
</template>

<script>
  /* eslint-disable global-require */

  export default {
    data() {
      return {
        images: [
          require('../assets/gallery/1.jpg'),
          require('../assets/gallery/2.jpg'),
          require('../assets/gallery/3.jpg'),
          require('../assets/gallery/4.jpg'),
          require('../assets/gallery/5.jpg'),
          require('../assets/gallery/6.jpg'),
        ],
        fullImages: [
          {
            title: 'Image 1',
            href: require('../assets/gallery/1.jpg'),
            thumbnail: require('../assets/gallery/1s.jpg'),
          }, {
            title: 'Image 2',
            href: require('../assets/gallery/2.jpg'),
            thumbnail: require('../assets/gallery/2s.jpg'),
          }, {
            title: 'Image 3',
            href: require('../assets/gallery/3.jpg'),
            thumbnail: require('../assets/gallery/3s.jpg'),
          }, {
            title: 'Image 4',
            href: require('../assets/gallery/4.jpg'),
            thumbnail: require('../assets/gallery/4s.jpg'),
          }, {
            title: 'Image 5',
            href: require('../assets/gallery/5.jpg'),
            thumbnail: require('../assets/gallery/5s.jpg'),
          }, {
            title: 'Image 6',
            href: require('../assets/gallery/6.jpg'),
            thumbnail: require('../assets/gallery/6s.jpg'),
          },
        ],
      };
    },
  };
</script>
