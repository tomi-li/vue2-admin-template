<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th v-for="column in columns">{{column}}</th>
      </tr>
      </thead>
      <tbody>
      <slot></slot>
      </tbody>
    </table>

    {{page }}
    <ul class="pagination">
      <li :class="{active: this.page === 1}"><a @click="() => updatePage(1)">1</a></li>
      <li :class="{active: this.page === 2}"><a @click="() => updatePage(2)">2</a></li>
      <li :class="{active: this.page === 3}"><a @click="() => updatePage(3)">3</a></li>
      <li :class="{active: this.page === 4}"><a @click="() => updatePage(4)">4</a></li>
    </ul>
  </div>
</template>

<script>
  import { request } from '../api';

  export default {
    props: {
      api: {
        type: Object,
        required: true,
      },
      columns: {
        type: Array,
        required: true,
      },
      onData: {
        type: Function,
        required: true,
      },
      pageParam: {
        type: String,
        default: '_page',
      },
      pageSizeParam: {
        type: String,
        default: '_limit',
      },
      pageSize: {
        type: Number,
        default: 20,
      },
    },
    data() {
      return {
        data: undefined,
        page: 1,
      };
    },
    watch: {
      page() {
        this.update();
      },
    },
    created() {
      this.update();
    },
    methods: {
      update() {
        request(this.api, { [this.pageParam]: this.page, [this.pageSizeParam]: [this.pageSize] })
          .then((res) => {
            this.data = res;
            this.onData(res);
          });
      },
      updatePage(pageNumber) {
        this.page = pageNumber;
      },
    },
  };
</script>
