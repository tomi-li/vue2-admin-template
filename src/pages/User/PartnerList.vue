<template>
  <i-page>
    <i-box>
      <i-form
        :inline="true"
        v-model="filter">

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
        </div>

      </i-form>
    </i-box>

    <i-box>
      <i-table
        :api="api.userList"
        :columns="['id', 'avatar', 'gender', 'name', 'email', 'register time', 'birthday']"
        :filter="partnerFilter"
        :lazy="true"
        v-model="userData">

        <i-table-row v-for="(item, index) in userData" :key="index">
          <td>
            <i-user-label
              :id="item['id']" :name="item['id']"></i-user-label>
          </td>
          <td>
            <i-avatar :src="item['avatar']"></i-avatar>
          </td>
          <td>
            <i-gender :type="item['gender']"></i-gender>
          </td>
          <td>
            {{ item['name'] }}
          </td>
          <td>{{ item['email'] }}</td>
          <td>{{ item['registerTime'] | datetime }}</td>
          <td>{{ item['birthday'] | date }}</td>
        </i-table-row>
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
    computed: {
      partnerFilter() {
        return { ...this.filter, type: 'Partner' };
      },
    },
  };
</script>
