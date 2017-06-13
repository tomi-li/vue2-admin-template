<template>
  <i-modal size="sm" title="Add Word">

    <i-form
      ref="form">
      <i-form-item
        name="word"
        placeholder="Word"
        :required="true"></i-form-item>
    </i-form>

    <div slot="footer">
      <i-button
        title="Cancel"
        @onPress="dismiss"></i-button>
      <i-button
        type="primary"
        title="Add"
        @onPress="add"></i-button>
    </div>
  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    methods: {
      add() {
        this.$refs.form.submit()
          .then(values => this.API.filteredWordAdd.request({ word: values.word }))
          .then(() => this.ok())
          .catch(() => this.utils.toast.error('Fail to add new word'));
      },
    },
  };
</script>
