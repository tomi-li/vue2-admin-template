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
        ref="table"
        api="feedbackList"
        :columns="['ID', 'User Id', 'content', 'operations']"
        v-model="feedbacks"
        :filter="filter"
        :lazy="true">
        <i-table-row v-for="(item, index) in feedbacks" :key="index">
          <td>{{ item['id'] }}</td>
          <td>{{ item['userId'] }}</td>
          <td>{{ item['content'] | ellipses }}</td>
          <td>
            <i-button
              size="xs"
              title="Delete"
              type="danger"
              @onPress="() => remove(item.id)"></i-button>
            <i-button
              size="xs"
              title="Detail"
              @onPress="() => detail(item.id)"></i-button>
          </td>
        </i-table-row>
      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  import FeedbackDetailModal from './modal/FeedbackDetailModal';

  export default {
    data() {
      return {
        feedbacks: {},
        filter: {},
      };
    },
    methods: {
      remove(id) {
        this.utils.confirm('really want to delete this item?', 'Confirm Deletion')
          .then(() => this.API.feedbackRemove.request({ id }))
          .then(() => this.$refs.table.updateData())
          .catch(() => ({}));
      },
      detail(id) {
        this.utils.modal(FeedbackDetailModal, { id });
      },
    },
  };
</script>
