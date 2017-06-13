<template>
  <i-page>
    <i-box>
      <i-table
        api="reportedUserList"
        ref="table"
        :columns="['ID', 'Times', 'Reason', 'Report Time', 'Operations']"
        v-model="userData">
        <i-table-row v-for="(item, index) in userData" :key="index">
          <td>
            <i-user-label :id="item['targetId']" :name="item['targetId']">{{ item['targetId'] }}</i-user-label>
          </td>
          <td>{{ item['times'] }}</td>
          <td>{{ item['reasons'] | arrayToString }}</td>
          <td>{{ item['reportTime'] | date }}</td>
          <td>
            <i-button
              title="Detail"
              size="xs"
              @onPress="() => showUserReportDetail(item['targetId'])"></i-button>
            <i-button
              title="Ban"
              size="xs"
              type="danger"
              @onPress="() => showBanUserModal(item['targetId'])"></i-button>
            <i-button
              title="Ignore"
              size="xs"
              type="warning"
              @onPress="() => ignoreReports(item['targetId'])"></i-button>
          </td>
        </i-table-row>
      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  import ReportDetailModal from './modal/ReportDetailModal';
  import BanUserModal from './modal/BanUserModal';

  export default {
    data() {
      return {
        userData: {},
      };
    },
    methods: {
      showUserReportDetail(id) {
        this.utils.modal(ReportDetailModal, { id });
      },
      ignoreReports(id) {
        this.utils.confirm(`Ignore all past reports about this user ( User ID ${id})?`, 'Confirm Deletion')
          .then(() => this.API.reportedUserDelete.request({ id, mark: 2 }))
          .then(() => this.$refs.table.updateData())
          .catch(() => ({}));
      },
      showBanUserModal(id) {
        this.utils.modal(BanUserModal, { id })
          .then(() => this.API.reportedUserDelete.request({ id, mark: 1 }))
          .then(() => this.$refs.table.updateData())
          .catch(() => ({}));
      },
    },
  };
</script>
