<template>
  <i-page>

    <div class="m-b-md">
      <i-button
        title="Add Admin"
        icon="plus"
        type="primary"
        @onPress="showAddAdminModal"></i-button>
    </div>

    <i-box>
      <i-table
        api="adminList"
        ref="table"
        :columns="['ID','User Name','Role','Email',	'Register Time','Operation']"
        v-model="admins">

        <i-table-row v-for="(admin, index) in admins" :key="index">
          <td>{{ admin['id'] }}</td>
          <td>{{ admin['username'] }}</td>
          <td>{{ admin['role'] && admin['role']['name'] }}</td>
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
  import AddAdminModal from './modal/AddAdminModal';

  export default {
    data() {
      return {
        admins: () => ([]),
      };
    },
    methods: {
      showAddAdminModal() {
        this.utils.modal(AddAdminModal)
          .then(() => this.$refs.table.updateData());
      },
      remove(id) {
        this.utils.confirm('are you sure to delete this administrator')
          .then(() => this.API.adminDelete.request({ id }))
          .then(() => this.utils.toast.info('admin has been deleted'))
          .then(() => this.$refs.table.updateData());
      },
      resetPassword(id) {
        this.utils.modal(ResetPasswordModal, { id })
          .then(() => this.utils.toast.info('successfully reset password'));
      },
    },
  };
</script>

