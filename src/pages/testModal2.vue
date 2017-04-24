<template>
  <i-modal>
    ...
    {{ test }}

    <div slot="footer">
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Save changes</button>
    </div>
  </i-modal>
</template>

<script>
  export default {
    data() {
      return {
        test: '111',
      };
    },
  };
</script>
