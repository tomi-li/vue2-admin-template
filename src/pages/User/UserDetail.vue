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
              <i-button class="pull-right" size="xs" type="primary" icon="edit" @onPress="showEditLevelModal"></i-button>
              <i-progress-bar :currentValue="userLevel.level"></i-progress-bar>
            </li>
            <li>
              <h2 class="no-margins inline">Points <span class="text-navy">{{ userLevel.point }}</span></h2>
              <i-button class="pull-right" size="xs" type="primary" icon="edit" @onPress="showEditPointsModal"></i-button>
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
      <i-tab-navigation
        :links="[
          {name: 'Basic Info',path: 'basic-info'},
          {name: 'Comments',path: 'comments'},
          {name: 'Replay',path: 'replay'},
          {name: 'Title History',path: 'title-history'},
          {name: 'Photos',path: 'photos'},
          {name: 'Blocked Users',path: 'blocked-users'},
          {name: 'Banned history',path: 'banned-history'},
          ]"></i-tab-navigation>

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
    </div>


    <div class="row">
      <div class="col-lg-3">
        <i-box title="Balance" :noPadding="true">
          <i-list>
            <i-list-item label="Diamond Balance">{{ userBalance.diamond_balance }}</i-list-item>
            <i-list-item label="Coin Balance">{{ userBalance.coin_balance }}</i-list-item>
            <i-list-item label="Conversion Rate">{{ userBalance.share_ratio }}</i-list-item>
            <i-list-item label="Estimated Income">{{ userBalance.estimated_income }} / {{ userBalance.currency }}</i-list-item>
          </i-list>
        </i-box>
      </div>

      <div class="col-lg-9">
        <i-button
          title="Block User"
          type="danger"
          @onPress="showBlockUserModal"></i-button>
      </div>

    </div>
  </i-page>
</template>


<script>
  import api, { request } from '../../api';
  import BanUserModal from '../Monitoring/modal/BanUserModal';
  import EditLevelModal from './modal/EditLevelModal';
  import EditPointsModal from './modal/EditPointsModal';
  import BanUserDetailModal from '../Monitoring/modal/BanUserDetailModal';
  import BlockUserModal from './modal/BlockUserModal';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        user: {},
        userLevel: {},
        userBillings: {},
        userIsBaned: undefined,
        userIsBlocked: {},
        userBalance: {},
        incomeList: [],
        cashOutList: [],
        cashOutStage: {},
      };
    },
    computed: {
      incomeFilter() {
        return { id: this.$route.params.id };
      },
      cashOutFilter() {
        return { id: this.$route.params.id, ...this.cashOutStage };
      },
    },
    created() {
      const id = this.id;
      if (id === undefined) throw new Error('path param <id> can not be null');

      Promise.all([
        request(api.userDetail, { id }),
        request(api.userLevel, { id }),
        request(api.userIsBanned, { id }),
        request(api.userBalance, { id }),
      ]).then((resArray) => {
        this.user = resArray[0].data;
        this.userLevel = resArray[1].data;
        this.userIsBaned = resArray[2].data.msg;
        this.userBalance = resArray[3].data;
      });
    },
    methods: {
      showBanModal() {
        this.utils.modal(BanUserModal, { id: this.id })
          .then(() => this.$router.go(0));
      },
      showUnBanModal() {
        this.utils.confirm({
          content: `Do you really want to unBan this user: ${this.id}`,
          fn: () => request(api.unBan, { id: this.id }),
        }).then(() => this.$router.go(0));
      },
      showBanDetailModal() {
        this.utils.modal(BanUserDetailModal, { id: this.id });
      },
      showEditLevelModal() {
        this.utils.modal(EditLevelModal, { id: this.id, level: this.userLevel })
          .then(() => request(api.userLevel, { id: this.id }))
          .then((res) => {
            this.userLevel = res.data;
          });
      },
      showEditPointsModal() {
        this.utils.modal(EditPointsModal, { id: this.id, level: this.userLevel })
          .then(() => request(api.userLevel, { id: this.id }))
          .then((res) => {
            this.userLevel = res.data;
          });
      },
      showBlockUserModal() {
        this.utils.modal(BlockUserModal, { id: this.id });
        // TODO
      },
    },
  };
</script>
