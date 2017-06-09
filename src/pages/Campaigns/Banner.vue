<template>
  <i-page>
    <i-tabs>
      <i-tab title="Using">
        <i-table
          :api="api.bannerList"
          :columns="['weight', 'adv_name', 'pic_url', 'click_url']"
          v-model="using"
          :filter="usingFilter">
          <i-table-row v-for="(item, index) in using" :key="index">
            <td>{{ item['weight'] }}</td>
            <td>{{ item['adv_name'] }}</td>
            <td><img class="float-banner-image" :src="item['pic_url']"></td>
            <td>{{ item['click_url'] }}</td>
          </i-table-row>
        </i-table>
      </i-tab>
      <i-tab title="Deleted">
        <i-table
          :api="api.bannerList"
          :columns="['weight', 'adv_name', 'pic_url', 'click_url']"
          v-model="deleted"
          :filter="deletedFilter">
          <i-table-row v-for="(item, index) in deleted" :key="index">
            <td>{{ item['weight'] }}</td>
            <td>{{ item['adv_name'] }}</td>
            <td><img class="float-banner-image" :src="item['pic_url']"></td>
            <td>{{ item['click_url'] }}</td>
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
        using: { response: {} },
        usingFilter: { isDeleted: false },
        deleted: { response: {} },
        deletedFilter: { isDeleted: true },
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
