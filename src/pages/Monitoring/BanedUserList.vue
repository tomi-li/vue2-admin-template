<template>
  <i-page>

    <i-box>
      <i-table
        api="banedUserList"
        :columns="['User ID', 'Ban Reason','Ban Start Time', 'Ban End Time']"
        v-model="userData"
        :filter="filter">

        <i-table-row v-for="(item, index) in userData" :key="index">
          <td>{{ item['id'] }}</td>
          <td>{{ item['reason_flag'] | banReason }}</td>
          <td>{{ item['begin_time'] | datetime }}</td>
          <td>{{ item['end_time'] | datetime }}</td>
        </i-table-row>
      </i-table>

    </i-box>
  </i-page>
</template>


<script>

  export default {
    data() {
      return {
        filter: { stillBanAfter: new Date().getTime() },
        userData: {},
      };
    },
  };
</script>
