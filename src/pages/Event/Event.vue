<template>
  <i-page>

    <i-box>
      <i-form
        :inline="true"
        @onValue="onFormValue">
        <i-form-item
          name="title"
          placeholder="Event Title"
          type="text"></i-form-item>
        <i-form-item
          name="timeRangeLower"
          type="date"
          placeholder="Start Time After"></i-form-item>
        <i-form-item
          name="timeRangeUpper"
          type="date"
          placeholder="Start Time Before"></i-form-item>
      </i-form>
    </i-box>

    <i-tabs>
      <i-tab title="All Event">
        <i-table
          :api="api.eventList"
          :columns="['Cover Image', 'Theme', 'Host', 'Start Time', 'End Time']"
          @onData="d => currentEvents = d"
          :filter="currentFilter">

          <tr v-for="(item, index) in currentEvents.response.result">
            <td>{{ (index + 1) + currentEvents.pageBase }}</td>
            <td><img class="event-cover" :src="item['event_poster']" alt=""></td>
            <td>{{ item['event_theme'] }}</td>
            <td>{{ item['host_id'] }}</td>
            <td>{{ item['event_start_time'] | datetime }}</td>
            <td>{{ item['event_end_time'] | datetime }}</td>
          </tr>
        </i-table>
      </i-tab>
      <i-tab title="Past Events">
        <i-table
          :api="api.eventList"
          :columns="['Cover Image', 'Theme', 'Host', 'Start Time', 'End Time']"
          @onData="d => pastEvents = d"
          :filter="pastFilter">

          <tr v-for="(item, index) in pastEvents.response.result">
            <td>{{ (index + 1) + pastEvents.pageBase }}</td>
            <td><img class="event-cover" :src="item['event_poster']" alt=""></td>
            <td>{{ item['event_theme'] }}</td>
            <td>{{ item['host_id'] }}</td>
            <td>{{ item['event_start_time'] | datetime }}</td>
            <td>{{ item['event_end_time'] | datetime }}</td>
          </tr>
        </i-table>
      </i-tab>
      <i-tab title="Deleted Events">
        <i-table
          :api="api.eventList"
          :columns="['Cover Image', 'Theme', 'Host', 'Start Time', 'End Time']"
          @onData="d => deletedEvents = d"
          :filter="deletedFilter">

          <tr v-for="(item, index) in deletedEvents.response.result">
            <td>{{ (index + 1) + deletedEvents.pageBase }}</td>
            <td><img class="event-cover" :src="item['event_poster']" alt=""></td>
            <td>{{ item['event_theme'] }}</td>
            <td>{{ item['host_id'] }}</td>
            <td>{{ item['event_start_time'] | datetime }}</td>
            <td>{{ item['event_end_time'] | datetime }}</td>
          </tr>
        </i-table>
      </i-tab>
    </i-tabs>
  </i-page>
</template>

<script>
  import moment from 'moment';
  import api from '../../api';

  export default {
    data() {
      return {
        api,
        currentEvents: { response: {} },
        currentFilter: { timeRangeLower: moment().format('x'), isDeleted: false },
        pastEvents: { response: {} },
        pastFilter: { timeRangeUpper: moment().format('x'), isDeleted: false },
        deletedEvents: { response: {} },
        deletedFilter: { isDeleted: true },
      };
    },
    methods: {
      onFormValue(value) {
        this.pastFilter = { ...this.pastFilter, ...value };
        this.currentFilter = { ...this.currentFilter, ...value };
        this.deletedFilter = { ...this.deletedFilter, ...value };
      },
    },
  };
</script>

<style>
  .event-cover {
    width: 48px;
    height: 48px;
  }
</style>
