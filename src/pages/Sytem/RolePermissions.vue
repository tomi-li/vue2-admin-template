<template>
  <i-page>

    <div class="m-b-md">
      <span>Permission Settings for <b>{{ role.name }}</b></span>
      <i-button
        class="pull-right"
        title="Save"
        type="primary"
        size="sm"
        @onPress="save()"></i-button>
    </div>

    <i-form
      ref="form"
      v-model="settings">

      <div class="flex-container">
        <i-box class="flex-item" v-for="(route, index) in routes" v-if="route.children" :key="index" :title="route.name">
          <i-form-item
            type="checkbox"
            :name="route.name"
            :value="settings[route.name]"
            :options="_map(route.children, subroute => subroute.name)"></i-form-item>
        </i-box>
      </div>

    </i-form>
  </i-page>
</template>

<script>
  import _find from 'lodash/find';
  import _filter from 'lodash/filter';
  import _map from 'lodash/map';
  import routers from '../../routers';

  export default {
    data() {
      return {
        role: {},
        settings: {},
        routes: [],
      };
    },
    created() {
      const params = this.$route.params;

      this.API.roleDetail.request({ id: params.id })
        .then((res) => {
          this.role = res.data;
          try {
            this.settings = JSON.parse(res.data.permissions);
          } catch (e) {
            this.settings = {};
          }
        })
        .then(() => {
          const rootRoute = _find(routers.routes, { name: 'Index' });
          this.routes = _filter(rootRoute.children, route => route.path !== '*' && !route.hide);
        });
    },
    methods: {
      _map(array, fn) {
        return _map(array, fn);
      },
      save() {
        this.$refs.form.submit()
          .then((values) => {
            const params = this.$route.params;
            return this.API.roleUpdate.request({
              id: params.id,
              permissions: JSON.stringify(values),
            });
          })
          .then(() => this.utils.toast.info('updated'))
          .catch(() => this.utils.toast.info('update failed'));
      },
    },
  };
</script>

<style>
  .flex-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .flex-item {
    width: 23%;
  }
</style>
