<template>
  <i-page :withHeader="false">
    <div class="row m-t-lg">
      <div class="col-md-6 col-lg-3">
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

      <div class="col-md-6 col-lg-5">
        <table class="table m-b-xs">
          <tbody>
          <tr>
            <td><strong>Gender</strong>  <i-gender :type="user.gender"></i-gender></td>
            <td><strong>Email</strong> {{ user.email }} </td>
          </tr>
          <tr>
            <td><strong>Phone Number</strong> {{ user.phoneNumber }} </td>
            <td><strong>Tagline</strong> {{ user.tagline }} </td>
          </tr>
          <tr>
            <td><strong>Birthday</strong> {{ user.birthday | datetime }} </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Level Infos -->
      <div class="col-lg-4">
        <i-box>
          <ul class="stat-list">
            <li>
              <h2 class="no-margins inline">Level <span class="text-navy">{{ userLevel.level }}</span></h2>
              <i-button class="pull-right" size="xs" type="primary" icon="edit"></i-button>
              <i-progress-bar :currentValue="userLevel.level"></i-progress-bar>
            </li>
            <li>
              <h2 class="no-margins inline">Points <span class="text-navy">{{ userLevel.point }}</span></h2>
              <i-button class="pull-right" size="xs" type="primary" icon="edit"></i-button>
              <i-progress-bar :minValue="userLevel.currentLevelMinPoint" :maxValue="userLevel.currentLevelMaxPoint" :currentValue="userLevel.point"></i-progress-bar>
            </li>
          </ul>
          <div class="m-t-md">
            <small class="pull-right"><i class="fa fa-clock-o"></i> Update on {{ userLevel.updateTime | datetime }}</small>
          </div>
        </i-box>
      </div>
    </div>

    <div class="row">
      <!-- Properties -->
      <div class="col-lg-3">
        <i-box title="User Properties" :noPadding="true">
          <i-list>
            <i-list-item label="Banned">
              <i-button v-if="userIsBaned" title="UnBan" size="xs" type="info" :onPress="showUnBanModal"></i-button>
              <i-button v-if="userIsBaned" title="Detail" size="xs" type="default" :onPress="showBanDetailModal"></i-button>
              <i-button v-else="userIsBaned" title="Ban" size="xs" type="warning" :onPress="showBanModal"></i-button>
              <i-boolean-text :value="userIsBaned"></i-boolean-text>
            </i-list-item>
            <i-list-item label="Admin"><i-boolean-text :value="user.admin"></i-boolean-text></i-list-item>
            <i-list-item label="Available"><i-boolean-text :value="user.available"></i-boolean-text></i-list-item>
            <i-list-item label="guest"><i-boolean-text :value="user.guest"></i-boolean-text></i-list-item>
            <i-list-item label="partner"><i-boolean-text :value="user.partner"></i-boolean-text></i-list-item>
            <i-list-item label="robot"><i-boolean-text :value="user.robot"></i-boolean-text></i-list-item>
            <i-list-item label="verified"><i-boolean-text :value="user.verified"></i-boolean-text></i-list-item>
          </i-list>
        </i-box>
      </div>

      <!-- Activity -->
      <div class="col-lg-4">
        <i-box title="User Activity" :noPadding="true">
          <i-list>
            <i-list-item label="IP">{{ user.ip }}</i-list-item>
            <i-list-item label="Register Date">{{ user.registerTime | datetime}}</i-list-item>
            <i-list-item label="Last Online">{{ user.lastOnline | datetime }}</i-list-item>
            <i-list-item label="Last Offline">{{ user.lastOffline | datetime }}</i-list-item>
            <i-list-item label="Third Part Platform">{{ user.thirdPartyPlatform }}</i-list-item>
            <i-list-item label="Third Part UserId">{{ user.thirdPartyUserId }}</i-list-item>
          </i-list>
        </i-box>
      </div>

      <!-- Others -->
      <div class="col-lg-5">
        <i-box title="Other Information">
          <h4>userAgent</h4>
          <p>{{ user.userAgent }}</p>

          <h4>remark</h4>
          <p>{{ user.remark }}</p>

          <h4>verifyRemark</h4>
          <p>{{ user.verifyRemark }}</p>
        </i-box>
      </div>
    </div>

  </i-page>
</template>

<script>
  import api, { request } from '../../api';
  import BanUserModal from './modal/BanUserModal';

  export default {
    data() {
      return {
        id: undefined,
        user: {},
        userLevel: {},
        userBillings: {},
        userIsBaned: undefined,
        userIsBlocked: {},
      };
    },
    created() {
      const { id } = this.$route.params;
      if (id === undefined) throw new Error('path param <id> can not be null');
      this.id = id;
      Promise.all([
        request(api.userDetail, { id }),
        request(api.userLevel, { id }),
        request(api.isBanned, { id }),
      ]).then((resArray) => {
        this.user = resArray[0].data;
        this.userLevel = resArray[1].data;
        this.userIsBaned = resArray[2].data.msg;
      });
    },
    methods: {
      showBanModal() {
        this.utils.$modal(BanUserModal, { id: this.id })
          .then(() => this.$router.go(0));
      },
      showUnBanModal() {
        this.utils.confirm({
          content: `Do you really want to unBan this user: ${this.id}`,
          fn: () => request(api.unBan, { id: this.id }),
        }).then(() => this.$router.go(0));
      },
      showBanDetailModal() {
      },
    },
  };
</script>
