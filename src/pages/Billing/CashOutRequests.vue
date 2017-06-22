<template>
  <i-page>

    <i-box>
      <i-form
        :inline="true"
        v-model="filter">
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
        api="transactionDiamondsToCash"
        :columns="[ 'User ID','Amount (SAR)', 'Diamonds', 'Cash-out Account','Request Time',   'Status']"
        :filter="filter"
        :lazy="true"
        v-model="transactions">
        <i-table-row v-for="(item, index) in transactions" :key="index">
          <td>
            <i-user-label :id="item['userId']" :name="item['userId']"></i-user-label>
          </td>
          <td>{{ item['cash'] }}</td>
          <td>{{ item['diamonds'] }}</td>
          <td>{{ item['cashOutBankAccountInfo'] && item['cashOutBankAccountInfo']['bankAccountNumber'] }}</td>
          <td>{{ item['updateTime'] | datetime }}</td>
          <td>{{ item['status'] }}</td>
        </i-table-row>
      </i-table>
    </i-box>

  </i-page>
</template>


<script>
  export default {
    data() {
      return {
        filter: {},
        transactions: [],
      };
    },
  };
</script>
