<template>
  <i-page>

    <i-box>
      <i-form
        :inline="true"
        @onValue="onFormValue">
        <i-form-item
          name="userId"
          placeholder="User ID"
          type="text"></i-form-item>
        <i-form-item
          name="processStage"
          type="select"
          :options="['PENDING', 'REJECTED', 'PROCESSED']"></i-form-item>
      </i-form>
    </i-box>

    <i-box>
      <i-table
        :api="api.cashOutRequests"
        :columns="['Request Time', 'User ID',  'Amount (SAR)', 'Diamonds', 'Cash-out Account', 'Status']"
        @onData="data => userData = data"
        :filter="filter"
        :lazy="true">
        <tr v-for="(item, index) in userData.response.result">
          <td>{{ (index + 1) + userData.pageBase}}</td>
          <td>{{ item['updateTime'] | datetime }}</td>
          <td>{{ item['userId'] }}</td>
          <td>{{ item['cash'] }}</td>
          <td>{{ item['diamonds'] }}</td>
          <td>{{ item['cashOutBankAccountInfo'] && item['cashOutBankAccountInfo']['bankAccountNumber'] }}</td>
          <td>{{ item['status'] }}</td>
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
        this.filter = value;
      },
    },
  };
</script>
