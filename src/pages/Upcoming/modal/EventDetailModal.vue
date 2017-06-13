<template>
  <i-modal title="Event Detail" size="lg">

    <div class="row">
      <div class="col-sm-6">
        <h2> Basic Info</h2>

        <i-list>
          <i-list-item label="ID">{{ event.event_id }}</i-list-item>
          <i-list-item label="Theme">{{ event.event_theme }}</i-list-item>
          <i-list-item label="Host">
            <i-user-label v-if="event.host_id" :id="event.host_id" :name="event.host_id" @onRedirect="dismiss"></i-user-label>
          </i-list-item>
          <i-list-item label="Start Time">{{ event.event_start_time | datetime }}</i-list-item>
          <i-list-item label="End Time">{{ event.event_end_time | datetime }}</i-list-item>
          <i-list-item label="Description">{{ event.event_description}}</i-list-item>
          <i-list-item label="Tags">{{ event.tags }}</i-list-item>
          <i-list-item label="Access Code">{{ event.access_code }}</i-list-item>
        </i-list>
      </div>

      <div class="col-sm-6">
        <i-tabs>
          <i-tab title="Poster">
            <img :src="event.event_poster"/>
          </i-tab>
          <i-tab title="Share Poster">
            <img :src="event.event_remarks"/>
          </i-tab>
        </i-tabs>
      </div>
    </div>

  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'dismiss', 'ok'],
    data() {
      return {
        event: {},
      };
    },
    computed: {
      id() {
        return this.params.id;
      },
    },
    created() {
      this.API.eventDetail.request({ id: this.id })
        .then((res) => {
          this.event = res.data;
        });
    },
  };
</script>
