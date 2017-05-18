<template>
  <i-page>
    <i-tabs>
      <i-tab title="Using">
        <i-table
          :api="api.floatBannerList"
          :columns="['bannerPosition', 'activityType', 'bannerName', 'bannerPicUrl', 'bannerClickUrl']"
          @onData="d => using = d"
          :filter="usingFilter">
          <tr v-for="(item, index) in using.floatBanners">
            <td>{{ (index + 1) + using.pageBase}}</td>
            <td>{{ item['bannerPosition'] }}</td>
            <td>{{ item['activityType'] }}</td>
            <td>{{ item['bannerName'] }}</td>
            <td><img class="float-banner-image" :src="item['bannerPicUrl']"></td>
            <td>{{ item['bannerClickUrl'] }}</td>
          </tr>
        </i-table>
      </i-tab>
      <i-tab title="Deleted">
        <i-table
          :api="api.floatBannerList"
          :columns="['bannerPosition', 'activityType', 'bannerName', 'bannerPicUrl', 'bannerClickUrl']"
          @onData="d => deleted = d"
          :filter="deletedFilter">
          <tr v-for="(item, index) in deleted.floatBanners">
            <td>{{ (index + 1) + deleted.pageBase}}</td>
            <td>{{ item['bannerPosition'] }}</td>
            <td>{{ item['activityType'] }}</td>
            <td>{{ item['bannerName'] }}</td>
            <td><img class="float-banner-image" :src="item['bannerPicUrl']"></td>
            <td>{{ item['bannerClickUrl'] }}</td>
          </tr>
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
