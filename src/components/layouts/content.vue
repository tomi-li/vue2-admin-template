<template>
  <!-- Wrapper-->
  <div id="wrapper">

    <!-- Navigation -->
    <navigation></navigation>
    <!-- Page wraper -->
    <!-- ng-class with current state name give you the ability to extended customization your view -->
    <div id="page-wrapper" class="gray-bg">

      <!-- Page wrapper -->
      <top-navigation></top-navigation>

      <router-view></router-view>

      <!-- Footer -->
      <page-footer></page-footer>

    </div>
    <!-- End page wrapper-->

  </div>
  <!-- End wrapper-->
</template>

<script>
  export default {};
</script>

