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

    <div class="row m-b-lg">
      <div class="col-lg-12">
        <i-tabs>
          <!-- Income -->
          <i-tab title="Income History">
            <i-table
              api="userIncome"
              :filter="incomeFilter"
              :columns="['Date', 'Sessions', 'Earning', 'Diamonds']"
              v-model="incomeList">
              <i-table-row v-for="(income, index) in incomeList" :key="index">
                <td>{{ income['year'] }} / {{ income['month'] }}</td>
                <td>{{ income['session_count'] }}</td>
                <td>{{ income['earning'] }}</td>
                <td>{{ income['diamonds'] }}</td>
              </i-table-row>
            </i-table>
          </i-tab>

          <!-- Cash out-->
          <i-tab title="Cash-out History">
            <!-- Filter -->
            <i-form
              v-model="cashOutStage">
              <i-form-item
                label="Process Stage"
                name="processStage"
                :options="['PENDING', 'PROCESSED', 'REJECTED']"
                type="select"></i-form-item>
            </i-form>
            <i-table
              api="userCashOut"
              :filter="cashOutFilter"
              :columns="['Request Time','Amount (SAR)','Diamonds','Account','Status','Operation']"
              v-model="cashOutList">
              <i-table-row v-for="(cashOut, index) in cashOutList" :key="index">
                <td>{{ cashOut['createTime'] | datetime }}</td>
                <td>{{ cashOut['cash'] }}</td>
                <td>{{ cashOut['diamonds'] }}</td>
                <td>{{ cashOut['cashOutBankAccountInfo'] }}</td>
                <td>{{ cashOut['status'] }}</td>
                <td>
                  <i-button
                    title="Details"
                    size="xs"
                    @onPress="showCashoutDetailModel"></i-button>
                </td>
              </i-table-row>
            </i-table>
          </i-tab>
        </i-tabs>
      </div>
    </div>

  </i-page>
</template>


<script>
  import api, { request } from '../../api';
  import BanUserModal from '../Monitoring/modal/BanUserModal';
  import EditLevelModal from './modal/EditLevelModal';
  import EditPointsModal from './modal/EditPointsModal';

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
        userIncome: {},
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
        request(api.userIncome, { id }),
      ]).then((resArray) => {
        this.user = resArray[0].data;
        this.userLevel = resArray[1].data;
        this.userIsBaned = resArray[2].data.msg;
        this.userBalance = resArray[3].data;
        this.userIncome = resArray[4].data;
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
        // TODO
      },
      showCashoutDetailModel() {
        // TODO
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
    },
  };
</script>
