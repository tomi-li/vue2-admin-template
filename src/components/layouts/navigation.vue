<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
      <ul side-navigation class="nav metismenu" id="side-menu">
        <li class="nav-header">
          <div class="profile-element dropdown" v-dropdown>
            <span><img alt="image" class="img-circle" :src="require('../../assets/avatar.jpg')"></span>
            <a class="dropdown-handler">
              <span class="clear">
                  <span class="block m-t-xs"><strong class="font-bold">{{ currentUser.username }}</strong></span>
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

        <li v-for="route in routes" :key="route.name" :class="{active: _routeIn(route.name)}" v-if="!route.hide">

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
  import _includes from 'lodash/includes';
  import _filter from 'lodash/filter';
  import _every from 'lodash/every';
  import _cloneDeep from 'lodash/cloneDeep';
  import $ from 'jquery';
  import 'metismenu';
  import routers from '../../routers';

  export default{
    data() {
      return {
        currentUser: {},
      };
    },
    computed: {
      ...mapGetters(['user']),
      routes() {
        this.currentUser = this.user() || {};
        const rootRoute = _find(routers.routes, { name: 'Index' });
        const validRoutes = _filter(rootRoute.children, route => route.path !== '*');
        return this._filterRoutesByPermission(validRoutes);
      },
    },
    mounted() {
      $('.metismenu').metisMenu();
    },
    methods: {
      ...mapActions(['logout']),
      _routeIn(name) {
        return !!_find(this.$route.matched, { name });
      },
      _logout() {
        this.logout()
          .then(() => {
            this.$router.push({ name: 'Login' });
          });
      },
      _filterRoutesByPermission(routes) {
        // if assign the param. make a clone.
        // otherwise will cause the trace can not be erase.
        const routesWithPermission = _cloneDeep(routes);
        if (!this.currentUser) {
          return [];
        }
        try {
          if (this.currentUser.role && this.currentUser.role.permissions) {
            if (this.currentUser.role.id === this.consts.superRoleId
              || this.currentUser.id === this.consts.superUserId) {
              return routesWithPermission;
            }

            const permissions = JSON.parse(this.currentUser.role.permissions);
            // set all sub-route to hide
            routesWithPermission.forEach((route) => {
              if (route.children) {
                route.children.forEach((subroute) => {
                  if (!_includes(permissions[route.name], subroute.name)) {
                    // set menu visibility by permission
                    // eslint-disable-next-line no-param-reassign
                    subroute.hide = true;
                  }
                });
              }
            });

            // if all sub-route is hidden. set menu is hidden
            routesWithPermission.forEach((route) => {
              if (route.children && _every(route.children, { hide: true })) {
                // eslint-disable-next-line no-param-reassign
                route.hide = true;
              }
            });
          }
        } catch (e) {
          console.error(e);
          return routesWithPermission;
        }

        return routesWithPermission;
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
