<template>
  <i-page>

    <div class="m-b-md">
      <i-button
        icon="plus-circle"
        title="Add Word"
        type="primary"
        @onPress="showAddWordModal"></i-button>
    </div>

    <i-box>
      <i-table
        api="filteredWordList"
        ref="table"
        :columns="['Word', 'Operations']"
        v-model="wordList"
        :filter="filter">
        <i-table-row v-for="(item, index) in wordList" :key="index">
          <td>{{ item }}</td>
          <td>
            <i-button
              title="Remove"
              size="xs"
              type="danger"
              @onPress="() => remove(item)"></i-button>
          </td>
        </i-table-row>
      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  import AddWordModal from './modal/AddWordModal';

  export default{
    data() {
      return {
        filter: {},
        wordList: {},
      };
    },
    methods: {
      showAddWordModal() {
        this.utils.modal(AddWordModal)
          .then(() => this.$refs.table.updateData())
          .catch(() => ({}));
      },
      remove(word) {
        this.utils.confirm(`Remove word '${word}' from list?`, 'Confirm Deletion')
          .then(() => this.API.filteredWordRemove.request({ word }))
          .then(() => this.$refs.table.updateData())
          .catch(() => ({}));
      },
    },
  };
</script>
