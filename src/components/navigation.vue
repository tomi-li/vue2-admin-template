<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
      <ul side-navigation class="nav metismenu" id="side-menu">
        <li class="nav-header">

          <div class="profile-element dropdown" v-dropdown>
            <a class="dropdown-handler">
              <span class="clear">
                  <span class="block m-t-xs"><strong class="font-bold">test</strong></span>
                  <span class="text-muted text-xs block">Example menu<b class="caret"></b></span>
              </span>
            </a>
            <ul class="animated fadeInRight m-t-xs">
              <li><a href="">Logout</a></li>
            </ul>
          </div>
          <div class="logo-element">
            IN+
          </div>
        </li>

        <li>
          <router-link to="/dashboard/main">
            <i class="fa fa-laptop"></i> <span class="nav-label">Main page</span>
          </router-link>
        </li>
        <li ui-sref-active="active">
          <router-link to="/dashboard/minor">
            <i class="fa fa-desktop"></i> <span class="nav-label">Minor page</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default{};
</script>
