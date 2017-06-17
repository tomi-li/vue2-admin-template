<template>
  <i-page>

    <div class="m-b-md">
      <i-button
        title="Add Float Banner"
        icon="plus-circle"
        type="primary"
        @onPress="showAddFloatBannerModal"></i-button>
    </div>

    <i-tabs>
      <i-tab title="Using">
        <i-table
          ref="table"
          api="floatBannerList"
          :columns="['Position ', 'Activity Type', 'Name', 'Poster', 'Operations']"
          v-model="using"
          :filter="usingFilter">
          <i-table-row v-for="(item, index) in using" :key="index">
            <td>{{ item['bannerPosition'] }}</td>
            <td>{{ item['activityType'] }}</td>
            <td>{{ item['bannerName'] }}</td>
            <td><img class="float-banner-image" :src="item['bannerPicUrl']"></td>
            <td>{{ item['bannerClickUrl'] }}</td>
            <td>
              <i-button
                title="Details"
                size="xs"
                @onPress="() => showFloatBannerDetailModal(item['bannerId'])"></i-button>
              <i-button
                icon="remove"
                size="xs"
                type="danger"
                @onPress="() => remove(item['bannerId'])"></i-button>
              <i-button
                icon="edit"
                size="xs"
                type="warning"
                @onPress="() => showEditFloatBannerModal(item['bannerId'])"></i-button>
            </td>
          </i-table-row>
        </i-table>
      </i-tab>
      <i-tab title="Deleted">
        <i-table
          api="floatBannerList"
          :columns="['Position ', 'Activity Type', 'Name', 'Poster', 'Operations']"
          v-model="deleted"
          :filter="deletedFilter">
          <i-table-row v-for="(item, index) in deleted" :key="index">
            <td>{{ item['bannerPosition'] }}</td>
            <td>{{ item['activityType'] }}</td>
            <td>{{ item['bannerName'] }}</td>
            <td><img class="float-banner-image" :src="item['bannerPicUrl']"></td>
            <td>{{ item['bannerClickUrl'] }}</td>
            <td>
              <i-button
                title="Details"
                size="xs"
                @onPress="() => showFloatBannerDetailModal(item['bannerId'])"></i-button>
            </td>
          </i-table-row>
        </i-table>
      </i-tab>
    </i-tabs>
  </i-page>
</template>

<script>
  import AddFloatBannerModal from './modal/AddFloatBannerModal';
  import FloatBannerDetailModal from './modal/FloatBannerDetailModal';

  export default {
    data() {
      return {
        using: {},
        usingFilter: { isNotDeleted: true },
        deleted: {},
        deletedFilter: { isNotDeleted: false },
      };
    },
    methods: {
      showAddFloatBannerModal() {
        this.utils.modal(AddFloatBannerModal)
          .then(() => this.$refs.table.updateData())
          .catch(() => ({}));
      },
      showEditFloatBannerModal(id) {
        console.log('TODO', id);
        // TODO
      },
      showFloatBannerDetailModal(id) {
        this.utils.modal(FloatBannerDetailModal, { id });
      },
      remove(id) {
        this.utils.confirm('Are you sure to remove this float banner?', 'Confirm Deletion')
          .then(() => this.API.floatBannerDelete.request({ id }))
          .then(() => this.$refs.table.updateData())
          .then(() => this.utils.toast.success('Delete Success'))
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
