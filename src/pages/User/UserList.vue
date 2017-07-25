<template>
  <i-page>
    <i-box>
      <i-form
        :debug="true"
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
            placeholder="Register Time"
            :name="['registerFrom', 'registerTo']"
            type="date-range"></i-form-item>

          <i-form-item
            placeholder="Level"
            :name="['levelFrom', 'levelTo']"
            type="number-range"></i-form-item>

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
        api="userList"
        :columns="['ID', 'avatar' , 'gender', 'name','type', 'Super User ID', 'email', 'register time']"
        :filter="filter"
        :lazy="true"
        v-model="userData">

        <i-table-row v-for="(item, index) in userData" :key="index">
          <td>
            <i-user-label :id="item['id']" :name="item['id']"></i-user-label>
          </td>
          <td>
            <i-avatar :src="item['avatar']"></i-avatar>
          </td>
          <td>
            <i-gender :type="item['gender']"></i-gender>
          </td>
          <td>{{ item['name'] }}</td>
          <td>{{ item['membership'] | membershipToUserType }}</td>
          <td>{{ item['suid'] }}</td>
          <td>{{ item['email'] }}</td>
          <td>{{ item['registerTime'] | datetime }}</td>
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
