<template>
  <div>
    <!-- Header -->
    <div v-if="withHeader" class="row wrapper border-bottom white-bg page-heading">
      <div class="col-lg-10">
        <h2>{{this.$route.name}}</h2>
        <ol class="breadcrumb">
          <li v-for="path in this.$route.matched">
            <router-link :to="path.path">{{path.name}}</router-link>
          </li>
        </ol>
      </div>
      <div class="col-lg-2">

      </div>
    </div>

    <!-- Content -->
    <div class="wrapper wrapper-content animated fadeInRight">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      withHeader: {
        type: Boolean,
        default: true,
      },
    },
  };
</script>
