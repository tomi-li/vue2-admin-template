<template>
  <i-page>

    <i-box>
      <i-table
        :api="api.cashOutUser"
        :columns="['id', 'name', 'Deducted Diamonds', 'Cash-out Amount']"
        @onData="data => userData = data">

        <tr v-for="(item, index) in userData.response.result">
          <td>{{ (index + 1) + userData.pageBase}}</td>
          <td>{{ item['userId'] }}</td>
          <td>
            <i-user-label :id="item['userId']" :name="item['userName']"></i-user-label>
          </td>
          <td>{{ item['cash']}}</td>
          <td>{{ item['diamond'] }}</td>
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
  };
</script>
