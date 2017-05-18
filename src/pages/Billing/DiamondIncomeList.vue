<template>
  <i-page>
    <i-box>
      <i-form
        :inline="true"
        @onValue="onFormValue">

        <i-form-item
          name="diamondRangeFrom"
          placeholder="Minimum Amount"
          type="number"></i-form-item>

        <i-form-item
          name="diamondRangeTo"
          placeholder="Maximum Amount"
          type="number"></i-form-item>

      </i-form>
    </i-box>

    <i-box>
      <i-table
        :api="api.diamondIncome"
        :columns="['id', 'User', 'Earned Diamonds', 'Estimated Income']"
        @onData="data => userData = data"
        :filter="filter"
        :lazy="true">

        <tr v-for="(item, index) in userData.response.result">
          <td>{{ (index + 1) + userData.pageBase}}</td>
          <td>{{ item['userId'] }}</td>
          <td>
            <i-user-label :id="item['userId']" :name="item['userName']"></i-user-label>
          </td>
          <td>{{ item['diamondBalance'] }}</td>
          <td>{{ item['income'] }}</td>
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
