<template>
  <i-page>
    <i-box>
      <i-table
        api="adminList"
        ref="table"
        :columns="['ID','User Name','Role','Email',	'Register Time','Operation']"
        v-model="admins">

        <i-table-row v-for="(admin, index) in admins" :key="index">
          <td>{{ admin['id'] }}</td>
          <td>{{ admin['user_name'] }}</td>
          <td>{{ admin['roles'] }}</td>
          <td>{{ admin['email'] }}</td>
          <td>{{ admin['create_time'] | datetime }}</td>
          <td>
            <i-button title="Remove"
                      size="xs"
                      type="danger"
                      @onPress="() => remove(admin['id'])"></i-button>

            <i-button title="Reset Password"
                      size="xs"
                      type="warning"
                      @onPress="() => resetPassword(admin['id'])"></i-button>
          </td>
        </i-table-row>

      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  import ResetPasswordModal from './modal/ResetPasswordModal';

  export default {
    data() {
      return {
        admins: () => ([]),
      };
    },
    methods: {
      remove(id) {
        console.log(id);
        this.utils.confirm('are you sure to delete this administrator')
          .then(() => {
            console.log(id);
          });
      },
      resetPassword(id) {
        this.utils.modal(ResetPasswordModal, { id });
      },
    },
  };
</script>

