<template>
  <i-page>

    <i-box>
      <i-form
        :inline="true"
        :onValue="onFormValue">
        <i-form-item
          name="userId"
          type="text"
          placeholder="User Id"></i-form-item>
        <i-form-item
          name="createBefore"
          type="date"
          placeholder="Creation Time From"></i-form-item>
        <i-form-item
          name="createAfter"
          type="date"
          placeholder="Creation Time To"></i-form-item>
      </i-form>
    </i-box>

    <i-box>
      <i-table
        :api="api.feedbackList"
        :columns="['id', 'userId', 'content']"
        @onData="d => pictures = d"
        :filter="filter"
        :lazy="true">
        <tr v-for="(item, index) in pictures.entityList">
          <td>{{ (index + 1) + pictures.pageBase }}</td>
          <td>{{ item['id'] }}</td>
          <td>{{ item['userId'] }}</td>
          <td>{{ item['content'] | ellipses }}</td>
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
    methods: {
      onFormValue(value) {
        this.filter = value;
      },
    },
  };

</script>
