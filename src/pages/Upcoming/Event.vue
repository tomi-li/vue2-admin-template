<template>
  <i-page>

    <i-box>
      <i-form
        :inline="true"
        v-model="filterValue">

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
          :filter="currentFilter"
          v-model="currentEvents">

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
          :filter="pastFilter"
          v-model="pastEvents">

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
          :filter="deletedFilter"
          v-model="deletedEvents">

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
        filterValue: {},
        currentEvents: { response: {} },
        pastEvents: { response: {} },
        deletedEvents: { response: {} },
      };
    },
    computed: {
      currentFilter() {
        return { timeRangeLower: moment().format('x'), isDeleted: false, ...this.filterValue };
      },
      pastFilter() {
        return { timeRangeUpper: moment().format('x'), isDeleted: false, ...this.filterValue };
      },
      deletedFilter() {
        return { isDeleted: true, ...this.filterValue };
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
