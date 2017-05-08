<template>
  <i-page>
    <i-tabs>
      <i-tab title="Using">
        <i-table
          :api="api.bannerList"
          :columns="['weight', 'adv_name', 'pic_url', 'click_url']"
          :onData="d => using = d"
          :filter="usingFilter">
          <tr v-for="(item, index) in using.response.result">
            <td>{{ (index + 1) + using.pageBase}}</td>
            <td>{{ item['weight'] }}</td>
            <td>{{ item['adv_name'] }}</td>
            <td><img class="float-banner-image" :src="item['pic_url']"></td>
            <td>{{ item['click_url'] }}</td>
          </tr>
        </i-table>
      </i-tab>
      <i-tab title="Deleted">
        <i-table
          :api="api.bannerList"
          :columns="['weight', 'adv_name', 'pic_url', 'click_url']"
          :onData="d => deleted = d"
          :filter="deletedFilter">
          <tr v-for="(item, index) in deleted.response.result">
            <td>{{ (index + 1) + deleted.pageBase}}</td>
            <td>{{ item['weight'] }}</td>
            <td>{{ item['adv_name'] }}</td>
            <td><img class="float-banner-image" :src="item['pic_url']"></td>
            <td>{{ item['click_url'] }}</td>
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
