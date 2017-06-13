<template>
  <i-modal title="Event Edit">

    <i-form
      ref="form"
      direction="horizontal"
      :ratio="[3,9]">

      <i-form-item
        label="Name"
        name="event_theme"
        :value="event.event_theme"
        :required="true"></i-form-item>

      <i-form-item
        label="Host ID"
        name="host_id"
        :value="event.host_id"
        :required="true"></i-form-item>

      <i-form-item
        label="Start Date"
        name="event_start_time"
        type="date"
        :value="event.event_start_time"
        :required="true"></i-form-item>

      <i-form-item
        label="End time"
        name="event_end_time"
        type="date"
        :value="event.event_end_time"
        :required="true"></i-form-item>

      <i-form-item
        label="Poster"
        name="event_poster"
        :value="event.event_poster"
        type="photo"></i-form-item>

      <i-form-item
        label="Share Poster"
        name="event_remarks"
        :value="event.event_remarks"
        type="photo"></i-form-item>

      <i-form-item
        label="Description"
        name="event_description"
        :value="event.event_description"
        type="textarea"></i-form-item>

      <i-form-item
        label="Access code"
        name="access_code"
        :value="event.access_code"></i-form-item>

      <i-form-item
        label="Tags"
        name="tags"
        :value="event.event_tags || ' '"
        type="textarea"></i-form-item>

    </i-form>

    <div slot="footer">
      <i-button
        title="Cancel"
        @onPress="dismiss"></i-button>
      <i-button
        title="Edit"
        type="primary"
        @onPress="submit"></i-button>
    </div>

  </i-modal>
</template>

<script>
  // TODO EDIT is not working
  export default {
    props: ['params', 'ok', 'dismiss'],
    data() {
      return {
        event: {},
      };
    },
    created() {
      this.API.eventDetail.request({ id: this.params.id })
        .then((res) => {
          this.event = res.data;
        });
    },
    methods: {
      submit() {
        this.$refs.form.submit()
          .then(values => this.API.eventEdit.request({ ...values, id: this.params.id }))
          .then(() => this.utils.toast.success('Edit Successful'))
          .then(() => this.ok())
          .catch(err => this.utils.toast.error(err));
      },
    },
  };
</script>
