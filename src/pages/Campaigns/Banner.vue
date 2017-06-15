<template>
  <i-page>

    <div class="m-b-md">
      <i-button
        title="Create Banner"
        icon="plus-circle"
        type="primary"
        @onPress="showCreateBannerModal"></i-button>
    </div>

    <i-tabs>
      <i-tab title="Using">
        <i-table
          ref="table"
          api="bannerList"
          :columns="['Weight', 'Name', 'Pic', 'Operations']"
          v-model="using"
          :filter="usingFilter">
          <i-table-row v-for="(item, index) in using" :key="index">
            <td>{{ item['weight'] }}</td>
            <td>{{ item['adv_name'] }}</td>
            <td><img class="float-banner-image" :src="item['pic_url']"></td>
            <td>
              <i-button
                title="Remove"
                type="danger"
                size="xs"
                @onPress="() => remove(item.id)"></i-button>
            </td>
          </i-table-row>
        </i-table>
      </i-tab>
      <i-tab title="Deleted">
        <i-table
          api="bannerList"
          :columns="['weight', 'adv_name', 'pic_url']"
          v-model="deleted"
          :filter="deletedFilter">
          <i-table-row v-for="(item, index) in deleted" :key="index">
            <td>{{ item['weight'] }}</td>
            <td>{{ item['adv_name'] }}</td>
            <td><img class="float-banner-image" :src="item['pic_url']"></td>
          </i-table-row>
        </i-table>
      </i-tab>
    </i-tabs>
  </i-page>
</template>

<script>
  import AddBannerModal from './modal/AddBannerModal';

  export default {
    data() {
      return {
        using: { response: {} },
        usingFilter: { isDeleted: false },
        deleted: { response: {} },
        deletedFilter: { isDeleted: true },
      };
    },
    methods: {
      showCreateBannerModal() {
        this.utils.modal(AddBannerModal)
          .then(() => this.$refs.table.updateData())
          .catch(() => ({}));
      },
      remove(id) {
        this.utils.confirm(`Are you sure to delete banner with id ${id}`, 'Confirm Deletion')
          .then(() => this.API.bannerRemove.request({ id }))
          .then(() => this.$refs.table.updateData())
          .then(() => this.utils.toast.success('Successfully Deleted'))
          .catch(() => ({}));
      },
    },
  };
</script>

<style>
  .float-banner-image {
    width: 200px;
    height: 50px;
  }
</style>
