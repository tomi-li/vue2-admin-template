<template>
  <i-table
    api="blockList"
    :columns="['ID', 'Name', 'Gender', 'Type', 'Block Time', 'Level', 'Operation']"
    :filter="filter"
    v-model="blockUsers">

    <i-table-row v-for="(item, index) in blockUsers" :key="index">
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
</template>

<script>
  export default {
    data() {
      return {
        blockUsers: [],
      };
    },
    computed: {
      filter() {
        return { id: this.$route.params.id };
      },
    },
  };
</script>
