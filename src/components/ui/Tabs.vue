<template>
  <div class="tabs-container">
    <ul class="nav nav-tabs">
      <li v-for="tabModel in tabModels" :class="{'active': tabModel.tab.active}">
        <a data-toggle="tab" :href="`#tab-${tabModel.tab._uid}`">{{tabModel.title}}</a>
      </li>
    </ul>
    <div class="tab-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import _remove from 'lodash/remove';

  export default {
    data() {
      return {
        tabModels: [],
      };
    },
    methods: {
      onTabInserted(title, tab) {
        this.tabModels.push({
          title,
          tab,
        });

        // eslint-disable-next-line no-return-assign,no-param-reassign
        this.$children.forEach(child => child.active = false);
        this.$children[0].active = true;
      },
      onTabRemoved(title, tab) {
        _remove(this.tabModels, tab);
      },
    },
  };
</script>
