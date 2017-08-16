<template>
  <div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Comment</th>
        <th class="date">Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(message, index) in messages" :key="index">
        <td>{{ message.text }}</td>
        <td class="date">{{ message.timestamp | datetime }}</td>
      </tr>
      </tbody>
    </table>

    <i-button title="Load More" type="primary" :loading="loading" :onPress="fetchData"></i-button>
  </div>
</template>

<script>
  import * as _ from 'lodash';
  import API, { request } from '../../../../api';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        messages: [],
        lastId: undefined,
        loading: false,
        hasMore: true,
      };
    },
    computed: {
      filter() {
        return this.lastId;
      },
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.loading = true;
        request(API.userComments, { id: this.id, lastId: this.lastId })
          .then((res) => {
            this.loading = false;
            if (res.data.length === 0) {
              this.hasMore = false;
            }

            this.messages = this.messages.concat(res.data);
            const lastMessage = _.last(res.data);
            if (!_.isUndefined(lastMessage)) {
              this.lastId = lastMessage.seq;
            }
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../../../public/SCSS/variables";

  thead, tbody {
    display: block;
    width: 100%;
    border: none;
  }

  td, th {
    border: none !important;
  }

  tr {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
  }

  th.date, td.date {
    flex: 0 0 300px;
  }

  thead {
    border-bottom: 1px solid $border-color;
  }

  tbody {
    max-height: 500px;
    overflow-y: scroll;

    tr {
      border-bottom: 1px solid $border-color;
    }
  }
</style>
