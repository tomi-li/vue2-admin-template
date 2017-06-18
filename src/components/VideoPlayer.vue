<template>
  <div id="player"></div>
</template>

<script>
  import Clappr from 'clappr';
  import { toast } from '../utils';

  export default {
    props: ['url'],
    mounted() {
      const player = new Clappr.Player({
        source: this.url,
        parentId: '#player',
        events: {
          onError() {
            toast.error('Error while loading Video');
          },
        },
      });
      console.log(player);
    },
  };
</script>


<style scoped>
  #player {
    display: flex;
    justify-content: center;
  }
</style>
