<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
      <ul side-navigation class="nav metismenu" id="side-menu">
        <li class="nav-header">
          <div class="profile-element dropdown" v-dropdown>
            <span><img alt="image" class="img-circle" :src="require('../../assets/avatar.jpg')"></span>
            <a class="dropdown-handler">
              <span class="clear">
                  <span class="block m-t-xs"><strong class="font-bold">{{ user().user_name }}</strong></span>
                  <span class="text-muted text-xs block">Menu<b class="caret"></b></span>
              </span>
            </a>
            <ul class="animated fadeInRight m-t-xs">
              <li>
                <a @click="_logout">Logout</a>
              </li>
            </ul>
          </div>
          <div class="logo-element">

          </div>
        </li>

        <li v-for="route in routes" :key="route.name" :class="{active: _routeIn(route.name)}">

          <router-link v-if="!route.children" :to="{ name : route.name }">
            <i class="fa" :class="route.icon || 'fa-user'"></i><span class="nav-label">{{ route.name }}</span>
          </router-link>

          <a v-if="route.children" href="#"> <i class="fa" :class="route.icon || 'fa-user'"></i> <span class="nav-label">{{ route.name }}</span><span class="fa arrow"></span></a>
          <ul v-if="route.children" class="nav nav-second-level collapse" :class="{in: _routeIn(route.name)}">
            <router-link v-for="subroute in route.children" v-if="!subroute.hide" tag="li" :key="subroute.name" :to="{name : subroute.name}" active-class="active"><a>{{ subroute.name }}</a></router-link>
          </ul>
        </li>

      </ul>
    </div>
  </nav>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import _find from 'lodash/find';
  import _filter from 'lodash/filter';
  import $ from 'jquery';
  import 'metismenu';
  import routers from '../../routers';

  export default{
    data() {
      return {
        routes: () => ({}),
      };
    },
    computed: {
      ...mapGetters([
        'user',
      ]),
    },
    created() {
      const rootRoute = _find(routers.routes, { name: 'Index' });
      this.routes = _filter(rootRoute.children, route => route.path !== '*');
    },
    mounted() {
      $('.metismenu').metisMenu();
    },
    methods: {
      ...mapActions([
        'logout',
      ]),
      _routeIn(name) {
        return !!_find(this.$route.matched, { name });
      },
      _logout() {
        this.logout().then(() => {
          this.$router.push({ name: 'Login' });
        });
      },
    },
  };
</script>


<style lang="scss">
  .nav-header {
    img {
      width: 48px;
      height: 48px;
    }
  }
</style>
