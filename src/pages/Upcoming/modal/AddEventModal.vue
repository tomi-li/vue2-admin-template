<template>
  <i-modal title="Add Event Modal">
    <i-form
      ref="form"
      direction="horizontal"
      v-model="newEvent"
      :ratio="[3,9]">

      <i-form-item
        label="Name"
        name="event_theme"
        :required="true"></i-form-item>

      <i-form-item
        label="Host ID"
        name="host_id"
        :required="true"></i-form-item>

      <i-form-item
        label="Start Date"
        name="event_start_time"
        type="date"
        :required="true"></i-form-item>

      <i-form-item
        label="End time"
        name="event_end_time"
        type="date"
        :required="true"></i-form-item>

      <i-form-item
        label="Poster"
        name="event_poster"
        type="photo"></i-form-item>

      <i-form-item
        label="Share Poster"
        name="event_remarks"
        type="photo"></i-form-item>

      <i-form-item
        label="Description"
        name="event_description"
        type="textarea"></i-form-item>

      <i-form-item
        label="Access code"
        name="access_code"></i-form-item>

      <i-form-item
        label="Tags"
        name="tags"
        value=" "
        type="textarea"></i-form-item>

    </i-form>

    <div slot="footer">
      <i-button
        title="Create"
        @onPress="create"></i-button>
    </div>
  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    data() {
      return {
        newEvent: {},
      };
    },
    methods: {
      create() {
        this.$refs.form.submit()
          .then(values => this.API.eventCreate.request(values))
          .then(() => this.utils.toast.success('Success create new event'))
          .then(() => this.ok())
          .catch(e => this.utils.toast.error(e));
      },
    },
  };
</script>
