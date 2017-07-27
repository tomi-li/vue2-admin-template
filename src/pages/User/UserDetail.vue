<template>
  <i-page :withHeader="false">
    <div class="row m-t-lg">
      <div class="col-md-4 col-lg-3">
        <div class="profile-image">
          <img :src="user.avatar" class="img-circle circle-border m-b-md"/>
        </div>
        <div class="profile-info">
          <h3>{{ user.name }}</h3>
          <h5>ID : {{ user.id }}</h5>
          <h5>SUID : {{ user.suid }}</h5>
          <h5>Type : {{ user.membership | membershipToUserType }}</h5>
        </div>
      </div>

      <div class="col-md-4 col-lg-5">
        <router-link :to="{name: 'User Basic Profile'}">Profile</router-link>
        <router-link :to="{name: 'User Billing'}">Billing</router-link>
      </div>

      <div class="col-md-4 col-lg-4 flex-center">
        <i-button title="Block User" type="warning" :onPress="showBlockUserModal"></i-button>
        <i-button title="Ban User" type="danger" :onPress="showBanModal"></i-button>
        <i-button title="Unban User" type="primary" :disabled="!this.userBanned" :onPress="showUnBanModal"></i-button>
      </div>
    </div>

    <div class="row">
      <router-view></router-view>
    </div>

  </i-page>
</template>


<script>
  import api, { request } from '../../api';
  import BanUserModal from '../Monitoring/modal/BanUserModal';
  import UnBanUnderModal from '../Monitoring/modal/UnBanUnderModal';
  import BlockUserModal from './modal/BlockUserModal';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        user: {},
        userBanned: false,
        userBanInfo: {},
        currentView: '', // ['basic info', 'billing']
      };
    },
    created() {
      const id = this.id;
      if (id === undefined) throw new Error('path param <id> can not be null');

      request(api.userDetail, { id })
        .then((res) => {
          this.user = res.data;
        });

      request(api.userIsBanned, { id })
        .then((res) => {
          this.userBanned = !!res.data;
          this.userBanInfo = res.data;
        });
    },
    methods: {
      showBanModal() {
        this.utils.modal(BanUserModal, { id: this.id });
      },
      showUnBanModal() {
        this.utils.modal(UnBanUnderModal, { id: this.id });
      },
      showBlockUserModal() {
        this.utils.modal(BlockUserModal, { id: this.id, name: this.user.name });
      },
    },
  };
</script>
