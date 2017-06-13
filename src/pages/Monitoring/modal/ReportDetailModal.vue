<template>
  <i-modal title="Report Detail" size="lg">
    <i-table
      api="reportedUserDetail"
      :filter="tableParam"
      :columns="['Session', 'Detail', 'Reason', 'By', 'Reported Time']"
      v-model="reports">

      <i-table-row v-for="(report, index) in reports" :key="index">
        <td>{{ report['detail'] }}</td>
        <td>{{ report['location'] }}</td>
        <td>{{ report['reason'] }}</td>
        <td>
          <i-user-label :id="report['userId']" :name="report['userId']" @onRedirect="onRedirect"></i-user-label>
        </td>
        <td>{{ report['reportTime'] | datetime }}</td>
      </i-table-row>

    </i-table>
  </i-modal>
</template>

<script>
  export default {
    props: ['params', 'ok', 'dismiss'],
    data() {
      return {
        reports: [],
      };
    },
    computed: {
      userId() {
        return this.params.id;
      },
      tableParam() {
        return { id: this.params.id };
      },
    },
    methods: {
      onRedirect() {
        this.dismiss();
      },
    },
  };
</script>
