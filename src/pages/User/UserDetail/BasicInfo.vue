<template>
  <div class="row">
    <div class="col-xs-6">
      <i-box title="User Properties" :noPadding="true">
        <i-list>
          <i-list-item label="Admin"><i-boolean-text :value="user.admin"></i-boolean-text></i-list-item>
          <i-list-item label="Available"><i-boolean-text :value="user.available"></i-boolean-text></i-list-item>
          <i-list-item label="guest"><i-boolean-text :value="user.guest"></i-boolean-text></i-list-item>
          <i-list-item label="partner"><i-boolean-text :value="user.partner"></i-boolean-text></i-list-item>
          <i-list-item label="robot"><i-boolean-text :value="user.robot"></i-boolean-text></i-list-item>
          <i-list-item label="verified"><i-boolean-text :value="user.verified"></i-boolean-text></i-list-item>
        </i-list>
      </i-box>
    </div>
    <div class="col-xs-6">

    </div>
  </div>
</template>

<script>
  import api, { request } from '../../../api';

  export default {
    data() {
      return {
        user: {},
      };
    },
    created() {
      request(api.userDetail, { id: this.$route.params.id })
        .then((res) => {
          this.user = res.data;
        });
    },
  };
</script>
