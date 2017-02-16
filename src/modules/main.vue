<template>
  <div>
    Main
    
    main
  </div>
</template>

<script>
  export default {
    data() {
//      console.log(this);
      console.log(this.api);
      console.log(this.$http.get('http://www.baidu.com'));
      return {};
    }
  };
</script>
