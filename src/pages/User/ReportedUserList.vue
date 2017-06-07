<template>
  <i-page>
    <i-box>
      <i-table
        :api="api.abuseSummary"
        :columns="['id', 'avatar', 'reason', 'Report Time']"
        v-model="userData">

        <tr v-if="!!userData.response" v-for="(item, index) in userData.response.result">
          <td>{{ (index + 1) + userData.pageBase}}</td>
          <td>{{ item['targetId'] }}</td>
          <td>
            <i-avatar :src="item['avatar']"></i-avatar>
          </td>
          <td>{{ item['reasons'] | arrayToString }}</td>
          <td>{{ item['reportTime'] | date }}</td>
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
        filter: {},
        userData: {
          response: {},
        },
      };
    },
    methods: {
      onFormValue(value) {
        this.filter = { ...value, AllUser: 'Partner' };
      },
    },
  };
</script>
