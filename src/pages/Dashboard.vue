<template>
  <i-page>
    Nothing here yet.

    <i-form
      :debug="true">

      <i-form-item
        name="test123"
        type="text"></i-form-item>

      <i-form-item
        name="photo"
        type="photo"></i-form-item>

      <i-button
        title="test"
        :isSubmit="true"
        @onPress="() => log(1)"></i-button>

    </i-form>

  </i-page>
</template>

<script>
  export default {
    methods: {
      log(value) {
        console.log(value);
      },
    },
  };
</script>
