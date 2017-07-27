<template>
  <div class="tabs-container">
    <ul class="nav nav-tabs">
      <router-link v-for="(link, index) in links" :key="index" tag="li" :to="{path: link.path}" active-class="active"><a>{{link.name}}</a></router-link>
    </ul>
    <div class="tab-content">
      <div class="tab-pane active">
        <div class="panel-body">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      links: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>
