<template>
  <i-page>
    <i-box title="Basic Table">
      <table class="table">
        <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        </tbody>
      </table>

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
