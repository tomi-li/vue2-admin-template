<template>
  <i-page>

    <div class="m-b-md">
      <i-button
        title="Create Event"
        icon="plus-circle"
        type="primary"
        @onPress="showAddEventModal"></i-button>
    </div>

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
          ref="allEventTable"
          :api="api.eventList"
          :columns="['Cover Image', 'Theme', 'Host', 'Start Time', 'End Time', 'Operations']"
          :filter="currentFilter"
          v-model="currentEvents">

          <i-table-row v-for="(item, index) in currentEvents" :key="index">
            <td><img class="event-cover" :src="item['event_poster']" alt=""></td>
            <td>{{ item['event_theme'] }}</td>
            <td>{{ item['host_id'] }}</td>
            <td>{{ item['event_start_time'] | datetime }}</td>
            <td>{{ item['event_end_time'] | datetime }}</td>
            <td>
              <i-button
                title="Details"
                size="xs"
                @onPress="() => showEventDetailsModal(item['event_id'])"></i-button>
              <i-button
                title="Edit"
                size="xs"
                type="warning"
                @onPress="() => showEditEventModal(item['event_id'])"></i-button>
              <i-button
                title="Delete"
                size="xs"
                type="danger"
                @onPress="() => deleteEvent(item['event_id'])"></i-button>
            </td>
          </i-table-row>
        </i-table>
      </i-tab>
      <i-tab title="Past Events">
        <i-table
          :api="api.eventList"
          :columns="['Cover Image', 'Theme', 'Host', 'Start Time', 'End Time']"
          :filter="pastFilter"
          v-model="pastEvents">

          <i-table-row v-for="(item, index) in pastEvents" :key="index">
            <td><img class="event-cover" :src="item['event_poster']" alt=""></td>
            <td>{{ item['event_theme'] }}</td>
            <td>{{ item['host_id'] }}</td>
            <td>{{ item['event_start_time'] | datetime }}</td>
            <td>{{ item['event_end_time'] | datetime }}</td>
          </i-table-row>
        </i-table>
      </i-tab>
      <i-tab title="Deleted Events">
        <i-table
          :api="api.eventList"
          :columns="['Cover Image', 'Theme', 'Host', 'Start Time', 'End Time']"
          :filter="deletedFilter"
          v-model="deletedEvents">

          <i-table-row v-for="(item, index) in deletedEvents" :key="index">
            <td><img class="event-cover" :src="item['event_poster']" alt=""></td>
            <td>{{ item['event_theme'] }}</td>
            <td>{{ item['host_id'] }}</td>
            <td>{{ item['event_start_time'] | datetime }}</td>
            <td>{{ item['event_end_time'] | datetime }}</td>
          </i-table-row>
        </i-table>
      </i-tab>
    </i-tabs>
  </i-page>
</template>

<script>
  import moment from 'moment';
  import api from '../../api';
  import AddEventModal from './modal/AddEventModal';
  import EditEventModal from './modal/EditEventModal';
  import EventDetailModal from './modal/EventDetailModal';

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
    methods: {
      showAddEventModal() {
        this.utils.modal(AddEventModal)
          .then(() => this.$refs.allEventTable.updateData())
          .catch(() => ({}));
      },
      showEditEventModal(id) {
        this.utils.modal(EditEventModal, { id })
          .then(() => this.$refs.allEventTable.updateData())
          .catch(() => ({}));
      },
      showEventDetailsModal(id) {
        this.utils.modal(EventDetailModal, { id })
          .catch(() => ({}));
      },
      deleteEvent(id) {
        this.utils.confirm('Confirm to delete ?', 'Deletion')
          .then(() => this.API.eventRemove.request({ id }))
          .then(() => this.$refs.allEventTable.updateData())
          .then(() => this.utils.toast.success('Success delete event'))
          .catch(() => ({}));
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
