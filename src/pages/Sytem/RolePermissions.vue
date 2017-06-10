<template>
  <i-page>

    <p>Permission Settings for <b>{{ role.name }}</b></p>

    <i-form
      :debug="true"
      v-model="settings">

      <div class="row">
        <div class="col-xs-3">
          <i-box title="Customer Service">
            <i-form-item
              type="checkbox"
              name="CustomerService"
              :value="settings.CustomerService"
              :options="['Feedback']"></i-form-item>
          </i-box>
        </div>

        <div class="col-xs-3">
          <i-box title="Monitoring">
            <i-form-item
              type="checkbox"
              name="Monitoring"
              :value="settings.Monitoring"
              :options="['Reported user','Baned user','Ban history','New live broadcast','New recommended broadcast', 'Replay video','Deleted replay video','Avatar','Picture']"></i-form-item>
          </i-box>
        </div>

        <div class="col-xs-3">
          <i-box title="Campaigns">
            <i-form-item
              type="checkbox"
              name="Campaigns"
              :value="settings.Campaigns"
              :options="['Banner','Deleted banner','Float banner','Deleted float banner','Notification']"></i-form-item>
          </i-box>
        </div>

        <div class="col-xs-3">
          <i-box title="User Information">
            <i-form-item
              type="checkbox"
              name="UserInformation"
              :value="settings.UserInformation"
              :options="['Banner','Deleted banner','Float banner','Deleted float banner','Notification']"></i-form-item>
          </i-box>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-3">
          <i-box title="User Billing">
            <i-form-item
              type="checkbox"
              name="UserBilling"
              :value="settings.UserBilling"
              :options="['Balance','Cash out history','Cash out account','Coins conversion history Top up history','Add coins history','Gift sent','Gift received']"></i-form-item>
          </i-box>
        </div>

        <div class="col-xs-3">
          <i-box title="Upcoming">
            <i-form-item
              type="checkbox"
              name="Upcoming"
              :value="settings.Upcoming"
              :options="['Event','Recommended event','Past event','Deleted event']"></i-form-item>
          </i-box>
        </div>

        <div class="col-xs-3">
          <i-box title="App-View-Operations">
            <i-form-item
              type="checkbox"
              name="AppViewOperations"
              :value="settings.AppViewOperations"
              :options="['Explore','Recommended users','Trending tags','Forced update options','Filtered word list']"></i-form-item>
          </i-box>
        </div>

        <div class="col-xs-3">
          <i-box title="System">
            <i-form-item
              type="checkbox"
              name="System"
              :value="settings.System"
              :options="['Administrator','Operation log']"></i-form-item>
          </i-box>
        </div>

      </div>
    </i-form>

  </i-page>
</template>

<script>
  import API from '../../api';

  export default {
    data() {
      return {
        role: {},
        settings: {},
      };
    },
    created() {
      const params = this.$route.params;
      API.roleDetail.request({ id: params.id })
        .then((res) => {
          this.role = res.data;
        });
    },
  };
</script>
