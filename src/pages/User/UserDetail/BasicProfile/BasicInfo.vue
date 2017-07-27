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
      </div>
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
</template>

<script>
  import api, { request } from '../../../../api';
  import EditLevelModal from '../../modal/EditLevelModal';
  import EditPointsModal from '../../modal/EditPointsModal';


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
    methods: {
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
    },
  };
</script>
