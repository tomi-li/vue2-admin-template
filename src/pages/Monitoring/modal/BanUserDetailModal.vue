<template>
  <i-modal size="lg" title="Ban User">


    <div class="row">
      <div class="col-sm-7">
        <h2>Ban Info</h2>

        <i-list>
          <i-list-item label="User ID">{{ banInfo.id }}</i-list-item>
          <i-list-item label="Start time">{{ banInfo.begin_time | datetime }}</i-list-item>
          <i-list-item label="End time">{{ banInfo.end_time | datetime }}</i-list-item>
          <i-list-item label="Duration">{{ duration(banInfo.begin_time, banInfo.end_time) }}</i-list-item>
          <i-list-item label="Reason">{{ banInfo.reason_flag | banReason }}</i-list-item>
          <i-list-item label="Create time">{{ banInfo.create_time | datetime}}</i-list-item>
          <i-list-item label="Update time">{{ banInfo.update_time | datetime }}</i-list-item>
          <i-list-item label="Remark">{{ banInfo.remark }}</i-list-item>
        </i-list>
      </div>

      <div class="col-sm-5">
        <h2>Operation Log</h2>

        <i-list>
          <i-list-item label="Operator">{{ operationLog.operator }}</i-list-item>
          <i-list-item label="Operator Role">{{ operationLog.role }}</i-list-item>
          <i-list-item label="Start time">{{ operationLog.ban_time | datetime }}</i-list-item>
        </i-list>
      </div>
    </div>

    <div slot="footer">
      <i-button type="danger" title="Ban" @onPress="dismiss"></i-button>
    </div>
  </i-modal>
</template>

<script>
  import moment from 'moment';

  export default {
    props: ['params', 'ok', 'dismiss'],
    data() {
      return {
        banInfo: {},
        operationLog: {},
      };
    },
    computed: {
      id() {
        return this.params.id;
      },
    },
    created() {
      this.API.banDetail.request({ id: this.id })
        .then((res) => {
          this.banInfo = res.data.account_ban;
          this.operationLog = res.data.latest_log;
        });
    },
    methods: {
      duration(startTime, endTime) {
        if (!startTime || !endTime) return '';
        return moment.duration(endTime - startTime).humanize();
      },
    },
  };
</script>
