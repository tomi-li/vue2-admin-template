<template>
  <i-page>

    <i-box>
      <i-table
        :api="api.convertCoinUser"
        :columns="['id', 'User', 'Converted Coins', 'Deducted Diamonds']"
        @onData="data => userData = data">

        <tr v-for="(item, index) in userData.response.result">
          <td>{{ (index + 1) + userData.pageBase}}</td>
          <td>{{ item['userId'] }}</td>
          <td>
            <i-user-label :id="item['userId']" :name="item['userName']"></i-user-label>
          </td>
          <td>{{ item['coins'] }}</td>
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
        userData: {
          response: {},
        },
      };
    },
    methods: {
      onFormValue(value) {
        this.filter = value;
      },
    },
  };
</script>
