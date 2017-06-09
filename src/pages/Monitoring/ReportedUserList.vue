<template>
  <i-page>
    <i-box>
      <i-table
        api="reportedUserList"
        :columns="['id', 'avatar', 'reason', 'Report Time']"
        v-model="userData">
        <i-table-row v-for="(item, index) in userData" :key="index">
          <td>{{ item['targetId'] }}</td>
          <td>
            <i-avatar :src="item['avatar']"></i-avatar>
          </td>
          <td>{{ item['reasons'] | arrayToString }}</td>
          <td>{{ item['reportTime'] | date }}</td>
        </i-table-row>
      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  export default {
    data() {
      return {
        userData: {},
      };
    },
  };
</script>
