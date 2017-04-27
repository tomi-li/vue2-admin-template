<template>
  <i-page>
    <i-box title="Basic Table">
      <i-table
        :api="api.login"
        :columns="['id', 'userId', 'title', 'body']"
        :onData="onData">

        <tr v-for="item in data">
          <td>{{ item['id'] }}</td>
          <td>
            <i-button :title="item['userId']"></i-button>
          </td>
          <td>{{ item['title'] }}</td>
          <td>{{ item['body'] }}</td>
        </tr>
      </i-table>

    </i-box>
  </i-page>
</template>


<script>
  import api from '../api';

  export default {
    data() {
      return {
        api,
        data: undefined,
      };
    },
    methods: {
      onData(data) {
        this.data = data;
      },
    },
  };
</script>
