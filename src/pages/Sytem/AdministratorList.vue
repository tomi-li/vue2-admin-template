<template>
  <i-page>
    <i-box>
      <i-table
        api="adminList"
        ref="table"
        :columns="['ID','User','Name','Role','Email	Register','Time	Operation']"
        v-model="admins">

        <i-table-row>
          <td>{{ admin['id'] }}</td>
        </i-table-row>

      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  export default {
    data() {
      return {
        admins: () => ([]),
      };
    },
    mounted() {
      console.log(this.$refs);
    },
  };
</script>

