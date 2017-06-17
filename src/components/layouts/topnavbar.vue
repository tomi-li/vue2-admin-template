<template>
  <div class="row border-bottom">
    <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
      <div class="navbar-header">
        <a class="navbar-minimalize minimalize-styl-2 btn btn-primary" v-minimaliza-sidebar><i class="fa fa-bars"></i></a>
      </div>
      <ul class="nav navbar-top-links navbar-right">
        <li>
          <a @click="_logout">
            <i class="fa fa-sign-out"></i> Log out
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default{
    methods: {
      ...mapActions(['logout']),
      _logout() {
        this.logout()
          .then(() => this.$router.push({ name: 'Login' }));
      },
    },
  };
</script>
