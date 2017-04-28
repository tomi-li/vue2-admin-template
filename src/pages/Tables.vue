<template>
  <i-page>
    <i-box title="Basic Table">
      <i-table
        :api="api.login"
        :columns="['id', 'userId', 'title', 'body']"
        :onData="data => posts = data">

        <tr v-for="item in posts">
          <td>{{ item['id'] }}</td>
          <td>
            <i-button :title="item['userId']"></i-button>
          </td>
          <td>{{ item['title'] }}</td>
          <td>{{ item['body'] }}</td>
        </tr>
      </i-table>

      <i-table
        :api="api.users"
        :columns="['id', 'userId', 'title', 'body']"
        :onData="data => users = data">

        <tr v-for="item in users">
          <td>{{ item['id'] }}</td>
          <td>
            <i-user-label :id="item['id']" :name="item['name']"></i-user-label>
          </td>
          <td>{{ item['email'] }}</td>
          <td>{{ item['phone'] }}</td>
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
        posts: undefined,
        users: undefined,
      };
    },
    methods: {},
  };
</script>
