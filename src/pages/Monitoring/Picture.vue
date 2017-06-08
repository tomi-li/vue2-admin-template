<template>
  <i-page>

    <i-box>
      <i-form
        :inline="true"
        v-model="filter">
        <i-form-item
          name="type"
          type="select"
          :options="['Unknown', 'Avatar','ProfileCover', 'DefaultAvatar']"></i-form-item>
        <i-form-item
          name="userId"
          type="text"
          placeholder="User Id"></i-form-item>
        <i-form-item
          name="createFrom"
          type="date"
          placeholder="Creation Time From"></i-form-item>
        <i-form-item
          name="createTo"
          type="date"
          placeholder="Creation Time To"></i-form-item>
      </i-form>
    </i-box>

    <i-box>
      <i-table
        :api="api.photos"
        :columns="['userId', 'Image', 'size', 'type', 'Creation Time']"
        :filter="filter"
        :lazy="true"
        v-model="pictures">
        <tr v-for="(item, index) in pictures.entityList">
          <td>{{ (index + 1) + pictures.pageBase }}</td>
          <td>{{ item['userId'] }}</td>
          <td><img class="picture-image" :src="item['url']" alt=""></td>
          <td>{{ item['size'] | byteToSize }}</td>
          <td>{{ item['type'] }}</td>
          <td>{{ item['createTime'] | datetime }}</td>
        </tr>
      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  import api from '../../api';

  export default {
    data() {
      return {
        api,
        pictures: {},
        filter: {},
      };
    },
  };
</script>


<style>
  .picture-image {
    width: 80px;
    height: 80px;
  }
</style>
