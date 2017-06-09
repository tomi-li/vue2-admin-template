<template>
  <i-page>

    <i-box>
      <i-form
        :inline="true"
        v-model="filter">
        <i-form-item
          name="userId"
          type="number"
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
        api="feedbackList"
        :columns="['id', 'userId', 'content']"
        v-model="feedbacks"
        :filter="filter"
        :lazy="true">
        <i-table-row v-for="(item, index) in feedbacks" :key="index">
          <td>{{ item['id'] }}</td>
          <td>{{ item['userId'] }}</td>
          <td>{{ item['content'] | ellipses }}</td>
        </i-table-row>
      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  export default {
    data() {
      return {
        feedbacks: {},
        filter: {},
      };
    },
  };
</script>
