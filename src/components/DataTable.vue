<template>
  <div>
    <table class="table table-hover">
      <thead>
      <tr>
        <th v-if="withIndex">#</th>
        <th v-for="column in columns" @click="sortBy(column)">
          <span>{{ column }}</span>
          <span class="sort-indicator">
            <i v-show="column === sortColumn && sortDirection === 'DESC'" class="fa fa-sort-desc"></i>
            <i v-show="column === sortColumn && sortDirection === 'ASC'" class="fa fa-sort-asc"></i>
          </span>
        </th>
      </tr>
      </thead>
      <tbody>
      <slot></slot>
      </tbody>
    </table>

    <p>Total: {{totalCount}} Records</p>

    <ul class="pagination">
      <li :class="{'disabled' : page === 1}"><a @click="updatePage(1)"><<</a></li>
      <li :class="{'disabled' : page === 1}"><a @click="updatePage(page -1)"><</a></li>
      <li v-for="pageNumber in pageRange" :class="{'active': page == pageNumber}"><a @click="() => updatePage(pageNumber)">{{ pageNumber }}</a></li>
      <li :class="{'disabled' : page === pageCount}"><a @click="updatePage(page + 1)">></a></li>
      <li :class="{'disabled' : page === pageCount}"><a @click="updatePage(pageCount)">>></a></li>
    </ul>

  </div>
</template>

<script>
  import _debounce from 'lodash/debounce';
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
        default: 'pageNo',
      },
      pageSizeParam: {
        type: String,
        default: 'pageSize',
      },
      sortParam: {
        type: String,
        default: '_sort',
      },
      sortDirectionParam: {
        type: String,
        default: '_order',
      },
      pageSize: {
        type: Number,
        default: 10,
      },
      paginationSize: {
        type: Number,
        default: 7,
      },
      withIndex: {
        type: Boolean,
        default: true,
      },
      filter: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        pageCount: 0,
        pageRange: [],
        totalCount: 0,
        page: 1,
        data: undefined,
        sortColumn: undefined,
        sortDirection: 'ASC',
      };
    },
    watch: {
      page() {
        this.updateData();
      },
      sortColumn() {
        this.updateData();
      },
      sortDirection() {
        this.updateData();
      },
      filter() {
        this.debouncedUpdate();
      },
    },
    computed: {
      debouncedUpdate() {
        return _debounce(this.updateData, 300);
      },
    },
    created() {
      this.updateData();
    },
    methods: {
      updateData() {
        console.log('1@#');
        let requestOptions = {
          [this.pageParam]: this.page,
          [this.pageSizeParam]: this.pageSize,
        };

        if (this.sortColumn) {
          requestOptions[this.sortParam] = this.sortColumn;
          requestOptions[this.sortDirectionParam] = this.sortDirection;
        }

        if (this.filter) {
          requestOptions = Object.assign({}, requestOptions, this.filter);
        }

        request(this.api, requestOptions)
        // eslint-disable-next-line no-unused-vars
          .then(({ data }) => {
            this.data = data;
            this.data.pageBase = this.page * this.pageSize;
            this.totalCount = data.totalRecordCount;
            this.setPagination(this.totalCount);
            this.onData(data);
          });
      },
      updatePage(pageNumber) {
        if (pageNumber > this.pageCount || pageNumber <= 0) return;
        this.page = pageNumber;
      },
      setPagination(totalCount) {
        const pageCount =
                window.parseInt(totalCount / this.pageSize)
                + (totalCount % this.pageSize === 0 ? 0 : 1);

        let pageRange = [];
        if (pageCount <= this.paginationSize) {
          pageRange = Array.from({ length: pageCount }, (v, i) => (i + 1));
        } else {
          const currentPage = this.page;
          const sizeWidth = window.parseInt(this.paginationSize / 2);
          let offset = 0;

          // oversize.
          // get offset
          if ((currentPage - sizeWidth) < 0 || (currentPage + sizeWidth) > (pageCount - 1)) {
            const direction = 1 - (currentPage - sizeWidth) > 0 ? 'forward' : 'afterward';
            offset = direction === 'forward' ? (currentPage - sizeWidth) : pageCount - (currentPage + sizeWidth) - 1;
          }
          // calculate numbers
          pageRange = Array.from(
            { length: this.paginationSize }
            , (v, i) => (i + 1 + Math.abs(currentPage - sizeWidth) + offset));
        }

        // set to DATA
        this.pageCount = pageCount;
        this.pageRange = pageRange;
      },
      sortBy(column) {
        if (this.sortColumn === undefined || this.sortColumn !== column) {
          this.sortColumn = column;
          this.sortDirection = 'ASC';
        } else if (this.sortColumn === column && this.sortDirection === 'ASC') {
          this.sortDirection = 'DESC';
        } else if (this.sortColumn === column && this.sortDirection === 'DESC') {
          this.sortColumn = undefined;
        }
      },
    },
  };
</script>


<style lang="scss">

  table.table thead th {
    white-space: nowrap;
    cursor: pointer;
  }

  table.table tbody td {
    vertical-align: middle;
  }

  .pagination li {
    text-align: center;
  }

  .pagination li a {
    user-select: none;
    display: inline-block;
    min-width: 37px; // no jumping. minimal 2 digits
  }

  .pagination .disabled a {
    color: #cccccc;

    &:hover {
      color: #cccccc;
    }
  }

</style>
