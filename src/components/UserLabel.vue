<template>
  <div class="i-user-label">
    <span class="badge badge-info"
          v-mouseenter-delay="showDetails"
          @mouseleave="hideDetails"
          @click="showDetailPage">
      <i class="fa fa-user"></i>
      <span>{{name}}</span>
    </span>

    <transition name="user-info">
      <div v-if="showDetail" class="popover top" role="tooltip" :style="`bottom: ${position.bottom}px; left: ${position.left}px; display:block;`">
        <div class="arrow" style="left: 50%;"></div>
        <div class="popover-content">
          <i-spinner v-if="!user" class="loader" type="circle"></i-spinner>
          <div v-if="user" class="user-info">
            <div class="row">
              <div class="col-sm-4">
                <img :src="user.avatar" class="avatar circle-border">
              </div>
              <div class="col-sm-8">
                <h4>{{ user.name }}
                  <small>{{ user.id }}</small>
                </h4>
                <i-gender :type="user.gender"></i-gender>
              </div>
            </div>

            <i-list size="xs" :isRound="false">
              <i-list-item label="SUID">{{ user.suid }}</i-list-item>
              <i-list-item label="IP">{{ user.ip }}</i-list-item>
              <i-list-item label="Membership">{{ user.membership | membershipToUserType }}</i-list-item>
              <i-list-item label="Last Online">{{ user.lastOnline | datetime }}</i-list-item>
              <i-list-item label="Birthday">{{ user.birthday | datetime }}</i-list-item>
            </i-list>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  /**
   * @events: onRedirect
   */
  import $ from 'jquery';
  import api, { request } from '../api';
  import { vm } from '../main';

  export default {
    props: {
      name: {
        type: [String, Number],
        required: true,
      },
      id: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        position: {
          left: 0,
          bottom: 0,
        },
        user: undefined,
        showDetail: false,
      };
    },
    created() {
    },
    mounted() {
      const width = $(this.$el).width();
      const height = $(this.$el).outerHeight() + 11;// arrow height
      this.position.left = (width / 2) - 50;
      this.position.bottom = height;
    },
    methods: {
      showDetails() {
        if (!this.showDetail) this.showDetail = true;
        if (this.user === undefined) this.requestInfo();
      },
      hideDetails() {
        if (this.showDetail) this.showDetail = false;
      },
      requestInfo() {
        request(api.userDetail, { id: this.id })
          .then(({ data }) => {
            this.user = data;
          })
          .catch(() => {
            this.utils.toast.error('Error fetch user information');
          });
      },
      showDetailPage() {
        vm.$router.push({ name: 'User Detail', params: { id: this.id } });
        this.$emit('onRedirect');
      },
    },
  };
</script>

<style lang="scss" scoped>
  .i-user-label {
    position: relative;
    display: inline-block;
    cursor: pointer;

    .popover {
      top: auto;

      .popover-content {
        min-height: 100px;
        min-width: 100px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .user-info {
    min-width: 300px;
    padding: 0 15px;
    .avatar {
      width: 60px;
      height: 60px;
    }

    .list-group {
      margin: 0;
    }
  }

</style>
