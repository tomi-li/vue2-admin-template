<template>
  <i-page>
    <i-tabs>
      <i-tab title="Using">
        <i-table
          :api="api.floatBannerList"
          :columns="['bannerPosition', 'activityType', 'bannerName', 'bannerPicUrl', 'bannerClickUrl']"
          v-model="using"
          :filter="usingFilter">
          <i-table-row v-for="(item, index) in using" :key="index">
            <td>{{ item['bannerPosition'] }}</td>
            <td>{{ item['activityType'] }}</td>
            <td>{{ item['bannerName'] }}</td>
            <td><img class="float-banner-image" :src="item['bannerPicUrl']"></td>
            <td>{{ item['bannerClickUrl'] }}</td>
          </i-table-row>
        </i-table>
      </i-tab>
      <i-tab title="Deleted">
        <i-table
          :api="api.floatBannerList"
          :columns="['bannerPosition', 'activityType', 'bannerName', 'bannerPicUrl', 'bannerClickUrl']"
          v-model="deleted"
          :filter="deletedFilter">
          <i-table-row v-for="(item, index) in deleted" :key="index">
            <td>{{ item['bannerPosition'] }}</td>
            <td>{{ item['activityType'] }}</td>
            <td>{{ item['bannerName'] }}</td>
            <td><img class="float-banner-image" :src="item['bannerPicUrl']"></td>
            <td>{{ item['bannerClickUrl'] }}</td>
          </i-table-row>
        </i-table>
      </i-tab>
    </i-tabs>
  </i-page>
</template>

<script>
  import api from '../../api';

  export default {
    data() {
      return {
        api,
        using: {},
        usingFilter: { isNotDeleted: true },
        deleted: {},
        deletedFilter: { isNotDeleted: false },
      };
    },
  };
</script>

<style>
  .float-banner-image {
    width: 200px;
    height: 50px;
  }
</style>
