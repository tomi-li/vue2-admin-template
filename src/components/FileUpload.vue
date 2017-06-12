<template>
  <div>
    <i-button
      :title="text"
      type="primary"
      :loading="uploading"
      @onPress="() => empty ? select() : change()"></i-button>

    <form ref="fileInputForm">
      <input ref="fileInput" type="file" style="display: none">
    </form>
  </div>
</template>

<script>
  /**
   * Event: onValue
   */
  export default {
    data() {
      return {
        empty: true,
        uploading: false,
      };
    },
    computed: {
      text() {
        return this.empty ? 'Select' : 'Change';
      },
    },
    mounted() {
      const fileInput = this.$refs.fileInput;
      fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        this.empty = false;
        this.uploading = true;
        this.API.photoUpload.request({ file })
          .then((res) => {
            this.$emit('onValue', res.data.url);
            this.uploading = false;
          });
      });
    },
    methods: {
      select() {
        const fileInput = this.$refs.fileInput;
        fileInput.click();
      },
      change() {
        this.$refs.fileInputForm.reset();
        const fileInput = this.$refs.fileInput;
        fileInput.click();
      },
      clear() {
        this.$refs.fileInputForm.reset();
        this.empty = true;
      },
    },
  };
</script>
