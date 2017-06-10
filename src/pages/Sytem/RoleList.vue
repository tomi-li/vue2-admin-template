<template>
  <i-page>

    <div class="m-b-md">
      <i-button
        title="Add Role"
        icon="plus"
        type="primary"
        @onPress="showAddRoleModal"></i-button>
    </div>

    <i-box>
      <i-table
        ref="table"
        api="roleList"
        :columns="['name', 'operations']"
        v-model="roles">

        <i-table-row v-for="(role, index) in roles" :key="index">
          <td>{{role['name']}}</td>
          <td>
            <i-button
              icon="remove"
              size="xs"
              type="danger"
              @onPress="() => removeRole(role.id)"></i-button>
            <i-button
              icon="edit"
              size="xs"
              type="warning"
              @onPress="() => showEditRoleModal(role)"></i-button>
            <i-button
              title="permissions"
              size="xs"
              type="primary"
              @onPress="() => setPermissions()"></i-button>
          </td>
        </i-table-row>

      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  import AddRoleModal from './modal/AddRoleModal';
  import EditRoleModal from './modal/EditRoleModal';
  import API from '../../api';

  export default {
    data() {
      return {
        roles: [],
      };
    },
    methods: {
      showAddRoleModal() {
        this.utils.modal(AddRoleModal)
          .then(() => this.$refs.table.updateData());
      },
      removeRole(id) {
        this.utils.confirm('Are you sure to delete this role. (all permission settings with this role will be lost)')
          .then(() => API.roleRemove.request({ id }))
          .then(() => this.$refs.table.updateData())
          .catch(() => ({}));
      },
      showEditRoleModal(role) {
        this.utils.modal(EditRoleModal, { role })
          .then(() => this.$refs.table.updateData());
      },
      setPermissions() {
        // TODO add logic
      },
    },
  };
</script>
