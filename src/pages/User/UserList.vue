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
          name="userId"
          placeholder="User Id"
          type="text"></i-form-item>

        <i-form-item
          name="suid"
          placeholder="Super User Id"
          type="text"></i-form-item>

        <i-form-item
          name="email"
          placeholder="Email"
          type="text"></i-form-item>

        <div class="m-t-sm">

          <i-form-item
            name="registerFrom"
            placeholder="Register From"
            type="date"></i-form-item>

          <i-form-item
            name="registerTo"
            placeholder="Register To"
            type="date"></i-form-item>

          <i-form-item
            name="type"
            placeholder="asd"
            type="select"
            :value="'AllUser'"
            :options="['AllUser', 'NormalUser', 'Partner', 'Administrator']"></i-form-item>
        </div>

      </i-form>
    </i-box>

    <i-box>
      <i-table
        :api="api.userList"
        :columns="['id', 'avatar', 'gender', 'name', 'email', 'register time', 'birthday']"
        :onData="data => userData = data"
        :filter="filter"
        :lazy="true">

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
  import api from '../../api';

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
