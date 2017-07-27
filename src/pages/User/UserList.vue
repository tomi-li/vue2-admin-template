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
          placeholder="Register Time"
          :name="['register_begin_time', 'register_end_time']"
          type="date-range"></i-form-item>

        <i-form-item
          placeholder="Level"
          :name="['level_lower', 'level_upper']"
          type="number-range"></i-form-item>

        <i-form-item
          name="suid"
          placeholder="Super User Id"
          type="text"></i-form-item>

        <i-form-item
          name="type"
          type="select"
          placeholder="All Users"
          :options="['NormalUser', 'Partner', 'Administrator']"></i-form-item>

        <i-form-item
          name="gender"
          type="select"
          placeholder="All Gender"
          :options="['UNKNOWN', 'MALE', 'FEMALE']"></i-form-item>

      </i-form>
    </i-box>

    <i-box>
      <i-table
        api="userList"
        :columns="['ID', 'Name' , 'Gender','Type', 'Super User ID', 'Register time', 'Level']"
        :filter="filter"
        :lazy="true"
        v-model="userData">

        <i-table-row v-for="(item, index) in userData" :key="index">
          <td>
            <i-user-label :id="item['id']" :name="item['id']"></i-user-label>
          </td>
          <td>
            <i-avatar :src="item['avatar']"></i-avatar>
            <span>{{ item['name'] }}</span>
          </td>
          <td>
            <i-gender :type="item['gender']"></i-gender>
          </td>
          <td>{{ item['membership'] | membershipToUserType }}</td>
          <td>{{ item['suid'] }}</td>
          <td>{{ item['registerTime'] | datetime }}</td>
          <td>{{ item['level'] }}</td>
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
        userData: {},
      };
    },
  };
</script>
