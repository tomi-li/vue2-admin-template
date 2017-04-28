<template>
  <div class="i-user-label">
    <span class="badge badge-info" v-mouseenter-delay="showDetails" @mouseleave="hideDetails">
      <i class="fa fa-user"></i>
      <span>{{name}}</span>
    </span>

    <transition name="user-info">
      <div v-if="showDetail" class="popover top" role="tooltip" :style="`bottom: ${position.bottom}px; left: ${position.left}px; display:block;`">
        <div class="arrow" style="left: 50%;"></div>
        <div class="popover-content">
          <i-spinner v-if="!user" class="loader" type="circle"></i-spinner>
          <div v-if="user">
            <p>{{ user.name }}</p>
            <p>{{ user.email }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  import $ from 'jquery';
  import api, { request } from '../api';

  export default {
    props: {
      name: {
        type: String,
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
        request(api.userDetail)
          .then(({ data }) => {
            this.user = data;
          });
      },
    },
  };
</script>

<style lang="scss">
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

  .user-info-active {
    opacity: 0;
  }
</style>
