<template>
  <i-page>

    <i-box>
      <i-table
        api="banedUserList"
        :columns="['User ID', 'Ban Reason','Ban Start Time', 'Ban End Time', 'Operations']"
        v-model="userData">

        <i-table-row v-for="(item, index) in userData" :key="index">
          <td>
            <i-user-label :id="item['id']" :name="item['id']"></i-user-label>
          </td>
          <td>{{ item['reason_flag'] | banReason }}</td>
          <td>{{ item['begin_time'] | datetime }}</td>
          <td>{{ item['end_time'] | datetime }}</td>
          <td>
            <i-button
              title="Details"
              size="xs"
              @onPress="() => showBanDetailModal(item['id'])"></i-button>
            <i-button
              title="Unban"
              size="xs"
              type="primary"
              @onPress="() => unBan(item['id'])"></i-button>
          </td>
        </i-table-row>
      </i-table>

    </i-box>
  </i-page>
</template>


<script>
  import BanUserDetail from './modal/BanUserDetailModal';

  export default {
    data() {
      return {
        userData: {},
      };
    },
    methods: {
      showBanDetailModal(id) {
        this.utils.modal(BanUserDetail, { id });
      },
      unBan(id) {
        this.utils.confirm(`Are you sure to unban this user ( User ID ${id})`, 'Un-Ban User')
          .then(() => this.API.unBan.request({ id }))
          .then(() => this.$refs.table.updateData())
          .catch(() => ({}));
      },
    },
  };
</script>
