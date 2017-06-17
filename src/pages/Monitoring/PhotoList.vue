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
        api="photoList"
        :columns="['userId', 'Image', 'size', 'type', 'Creation Time']"
        :filter="filter"
        :lazy="true"
        v-model="pictures">
        <i-table-row v-for="(item, index) in pictures" :key="index">
          <td>
            <i-user-label :id="item['userId']" :name="item['userId']"></i-user-label>
          </td>
          <td>
            <i-gallery :images="[item['url']]"></i-gallery>
          </td>
          <td>{{ item['size'] | byteToSize }}</td>
          <td>{{ item['type'] }}</td>
          <td>{{ item['createTime'] | datetime }}</td>
        </i-table-row>
      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  export default {
    data() {
      return {
        pictures: [],
        filter: {},
      };
    },
  };
</script>
