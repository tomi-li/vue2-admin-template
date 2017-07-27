<template>
  <i-table
    api="userIsBanned"
    :columns="['id']"
    :filter="filter"
    v-model="banHistory">

    <i-table-row v-for="(historyItem, index) in banHistory" :key="index">
      <td>{{ historyItem }}</td>
    </i-table-row>
  </i-table>
</template>

<script>
  export default {
    data() {
      return {
        banHistory: undefined,
      };
    },
    computed: {
      filter() {
        return {
          id: this.$route.params.id,
        };
      },
    },
  };
</script>
