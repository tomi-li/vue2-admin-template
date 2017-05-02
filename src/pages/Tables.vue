<template>
  <i-page>
    <i-box>
      <i-form
        :inline="true"
        :onValue="onFormValue">
        <i-form-item
          name="name"
          placeholder="Name"
          type="text"></i-form-item>

        <i-form-item
          name="name"
          placeholder="User Id"
          type="text"></i-form-item>

        <i-form-item
          name="name"
          placeholder="Super User Id"
          type="text"></i-form-item>

        <i-form-item
          name="email"
          placeholder="Email"
          type="text"></i-form-item>

        <i-form-item
          name="registerTime"
          placeholder="Register Time"
          type="text"></i-form-item>
      </i-form>
    </i-box>

    <i-box>
      <i-table
        :api="api.users"
        :columns="['id', 'avatar', 'gender', 'name', 'email', 'register time', 'birthday']"
        :onData="data => userData = data"
        :filter="filter">

        <tr v-for="(item, index) in userData.accounts">
          <td>{{ (index + 1) + userData.pageBase}}</td>
          <td>{{ item['id'] }}</td>
          <td>
            <i-avatar :src="item['avatar']"></i-avatar>
          </td>
          <td>
            <i-gender :type="item['gender']"></i-gender>
          </td>
          <td>
            <i-user-label :id="item['id']" :name="item['name']"></i-user-label>
          </td>
          <td>{{ item['email'] }}</td>
          <td>{{ item['registerTime'] | datetime }}</td>
          <td>{{ item['birthday'] | date }}</td>
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
        filter: {},
        userData: {},
      };
    },
    methods: {
      onFormValue(value) {
        this.filter = value;
      },
    },
  };
</script>
