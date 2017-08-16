<template>
  <div class="row">
    <div class="col-xs-6">
      <i-box title="Basic Info">
        <ul class="list">
          <li><label>ID</label> <span>{{user.id}}</span></li>
          <li><label>Super ID</label> <span>{{user.uid}}</span></li>
          <li><label>Avarta</label>
            <i-avatar type="rounded" :src="user.avatar"></i-avatar>
          </li>
          <li><label>Name</label> <span>{{user.name}}</span></li>
          <li><label>Gender</label> <span>{{user.gender}}</span></li>
          <li><label>Birthday</label> <span>{{user.birthday}}</span></li>
          <li><label>Email</label> <span>{{user.email}}</span></li>
          <li><label>Tagline</label> <span>{{user.tagline}}</span></li>
          <li><label>Platform</label> <span>{{user.platform}}</span></li>
          <li><label>3rd-party Login</label> <span>{{user.third_party_platform}}</span></li>
          <li><label>Registered Time</label> <span>{{user.register_time}}</span></li>
          <li><label>User Type</label> <span>{{user.membership | membershipToUserType}}</span></li>
          <li><label>Remark</label> <span>{{user.remark}}</span></li>
        </ul>
      </i-box>
    </div>
    <div class="col-xs-6">
      <i-box title="Level Info">
        <ul class="list">
          <li><label>Level</label> <span>{{ userLevel.level }}</span> <a class="edit-link" @click="showEditLevelModal">Edit</a></li>
          <li><label>Point</label> <span>{{ userLevel.point }}</span> <a class="edit-link" @click="showEditPointsModal">Edit</a></li>
        </ul>
      </i-box>
      <i-box title="Privilege Settings">
        <ul class="list">
          <li v-for="(value, key) in userPrivileges">
            <label>{{ key | startCase }}</label>
            <i-switch @change="(value) => changeSetting(key, value)" :value="value"></i-switch>
          </li>
        </ul>
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
        id: this.$route.params.id,
        user: {},
        userLevel: {},
        userPrivileges: {},
      };
    },
    created() {
      request(api.userDetail, { id: this.id })
        .then((res) => {
          this.user = res.data;
        });
      request(api.userLevel, { id: this.id })
        .then((res) => {
          this.userLevel = res.data;
        });
      request(api.userPrivileges, { id: this.id })
        .then((res) => {
          this.userPrivileges = res.data;
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
      changeSetting(key, value) {
        request(api.userSetPrivileges, {
          id: this.id,
          [key]: value,
        });
      },
    },
  };
</script>

<style lang="scss">
  .list {
    margin: 0;
    padding: 0;
    list-style-type: none;

    label {
      width: 30%;
      text-align: right;
      margin-right: 1em;
    }
  }

  .edit-link {
    margin-left: 10px;
  }
</style>
