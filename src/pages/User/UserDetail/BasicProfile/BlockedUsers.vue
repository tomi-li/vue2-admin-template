<template>
  <i-table
    api="blockList"
    :columns="['ID', 'Name', 'Gender', 'Type', 'Block Time', 'Level', 'Operation']"
    :filter="filter"
    v-model="blockUsers">

    <i-table-row v-for="(item, index) in blockUsers" :key="index">
      <td>
        <i-user-label :id="item['user']['id']" :name="item['user']['id']"></i-user-label>
      </td>
      <td>
        <i-avatar :src="item['user']['avatar']"></i-avatar>
        <span>{{ item['user']['name'] }}</span>
      </td>
      <td>
        <i-gender :type="item['gender']"></i-gender>
      </td>
      <td>{{ item['user']['membership'] | membershipToUserType }}</td>
      <td>{{ item['registerTime'] | datetime }}</td>
      <td>{{ item['user']['level'] }}</td>
      <td>
        <i-button size="xs" title="Unblock" @onPress="() => unblock(item['user_id'])"></i-button>
      </td>
    </i-table-row>

  </i-table>
</template>

<script>
  export default {
    data() {
      return {
        id: this.$route.params.id,
        blockUsers: [],
      };
    },
    computed: {
      filter() {
        return { id: this.$route.params.id };
      },
    },
    methods: {
      unblock(id) {
        this.utils.confirm(`Are you sure to unblock user: ${id} for host: ${this.id}`, 'Unblock User', () => {
          console.log(this);
        }).then(() => this.utils.toast.success('!!!'))
          .catch(() => ({}));
      },
    },
  };
</script>
