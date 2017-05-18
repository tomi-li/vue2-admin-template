<template>
  <i-page>

    <i-box>
      <i-table
        :api="api.banedUserList"
        :columns="['User ID', 'Ban Reason','Ban Start Time', 'Ban End Time']"
        @onData="data => userData = data">

        <tr v-for="(item, index) in userData.response.result">
          <td>{{ (index + 1) + userData.pageBase}}</td>
          <td>{{ item['id'] }}</td>
          <td>{{ item['reason_flag'] | banReason }}</td>
          <td>{{ item['begin_time'] | datetime }}</td>
          <td>{{ item['end_time'] | datetime }}</td>
        </tr>
      </i-table>

    </i-box>
  </i-page>
</template>


<script>
  import api from '../../api';

  export default {
    data() {
      return {
        api,
        userData: {
          response: {},
        },
      };
    },
  };
</script>
