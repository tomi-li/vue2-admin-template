<template>
  <i-modal title="Add Banner">
    <i-form
      ref="form"
      :debug="true"
      direction="horizontal"
      v-model="formData">

      <i-form-item
        label="Name"
        name="adv_name"
        :required="true"></i-form-item>

      <i-form-item
        name="weight"
        label="Weight"
        :required="true"
        type="number"></i-form-item>

      <i-form-item
        label="Poster"
        name="pic_url"
        type="photo"
        :required="true"></i-form-item>

      <i-form-item
        label="Action"
        name="redirect"
        type="select"
        :options="_map(actions, action => ({ name: action.name, value: action.index}))"
        :required="true"></i-form-item>

    </i-form>

    <!-- Watch Video -->
    <i-panel title="Video Settings" v-if="formData.redirect === '3'">
      <i-form
        direction="horizontal"
        :ref="`addOns${formData.redirect}`">
        <i-form-item
          label="cid"
          name="cid"
          :required="true"></i-form-item>
        <i-form-item
          label="sid"
          name="sid"
          :required="true"></i-form-item>
      </i-form>
    </i-panel>

    <!-- Follow User -->
    <i-panel title="Video Settings" v-if="formData.redirect === '4'">
      <i-form
        direction="horizontal"
        :ref="`addOns${formData.redirect}`">
        <i-form-item
          label="User ID"
          name="uid"
          :required="true"></i-form-item>
      </i-form>
    </i-panel>

    <!-- Un-Follow User -->
    <i-panel title="Video Settings" v-if="formData.redirect === '5'">
      <i-form
        direction="horizontal"
        :ref="`addOns${formData.redirect}`">
        <i-form-item
          label="User ID"
          name="uid"
          :required="true"></i-form-item>
      </i-form>
    </i-panel>

    <!-- To Page -->
    <i-panel title="Video Settings" v-if="formData.redirect === '6'">
      <i-form
        direction="horizontal"
        :ref="`addOns${formData.redirect}`">
        <i-form-item
          label="Page"
          name="pageName"
          type="select"
          :options="['mydiamond', 'home', 'mylevel', 'leaderboard', 'mytitle', 'topup', 'myprofile', 'leaderboard']"
          :required="true"></i-form-item>

        <i-form-item
          label="UnlockType"
          name="unlockType"
          type="select"
          :options="[{name: 'default', value: -1}, {name: 'all', value: 0}, { name: 'broadcast', value: 1}, {name: 'looper', value: 2}]"
          :required="true"></i-form-item>

      </i-form>
    </i-panel>

    <!-- To URL -->
    <i-panel title="URL" v-if="formData.redirect === '8'">
      <i-form
        direction="horizontal"
        :ref="`addOns${formData.redirect}`">
        <i-form-item
          label="URL"
          name="title"
          :required="true"></i-form-item>
        <i-form-item
          label="URL"
          name="url"
          :required="true"></i-form-item>
      </i-form>
    </i-panel>

    <!-- To URL -->
    <i-panel title="Store Settings" v-if="formData.redirect === '9'">
      <i-form
        direction="horizontal"
        :ref="`addOns${formData.redirect}`">
        <i-form-item
          label="Android"
          name="androidId"
          :required="true"></i-form-item>
        <i-form-item
          label="iOS"
          name="iosId"
          :required="true"></i-form-item>
      </i-form>
    </i-panel>

    <div slot="footer">
      <i-button
        title="Cancel"
        @onPress="dismiss"></i-button>
      <i-button
        title="Submit"
        type="primary"
        @onPress="submit"></i-button>
    </div>
  </i-modal>
</template>


<script>
  import _map from 'lodash/map';
  import _find from 'lodash/find';

  const schema = 'loopsmozat://';
  const actions = [
    { index: 1, name: 'Go Live', action: `${schema}broadcast/goLive` },
    { index: 2, name: 'To Feedback Page', action: `${schema}general/feedback` },
    { index: 3, name: 'Watch Video', action: `${schema}broadcast/openVideo`, params: ['cid', 'sid'] },
    { index: 4, name: 'Follow User', action: `${schema}account/follow`, params: ['uid'] },
    { index: 5, name: 'Un Follow User', action: `${schema}account/unfollow`, params: ['uid'] },
    { index: 6, name: 'To Page', action: `${schema}util/openAppPage`, params: [{ pageName: ['mydiamond', 'home', 'mylevel', 'leaderboard', 'mytitle', 'topup', 'myprofile', 'leaderboard'] }, { unlockType: { '-1': 'default', 0: 'all', 1: 'broadcaster', 2: 'looper' } }] },
    { index: 7, name: 'Un-clickable', action: `${schema}#unclickable` },
    { index: 8, name: 'To URL', action: `${schema}general/openUrl`, params: ['url', 'title'] },
    { index: 9, name: 'To App Store', action: `${schema}util/openAppStore`, params: ['androidId', 'iosId'] },
  ];

  export default {
    props: ['ok', 'dismiss', 'params'],
    data() {
      return {
        formData: {},
      };
    },
    computed: {
      actions() {
        return actions;
      },
    },
    methods: {
      submit() {
        let newBanner;
        this.$refs.form.submit()
          .then((values) => {
            newBanner = values;
            const clickUrl = _find(actions, { index: window.parseInt(values.redirect) }).action;
            const addOn = this._getAddOn(values.redirect);
            // if there are extra param handle them.
            if (addOn) {
              return addOn
                .then(addOnValues =>
                  Promise.resolve({
                    ...newBanner,
                    click_url: `${clickUrl}?${this.utils.serialize(addOnValues)}`,
                  }));
            }
            return Promise.resolve(...newBanner, { clickUrl });
          })
          .then(values => this.API.bannerCreate.request(values))
          .then(() => this.utils.toast.success('Banner Created'))
          .then(() => this.ok())
          .catch(() => ({}));
      },
      _map(p, fn) {
        return _map(p, fn);
      },
      _getAddOn(index) {
        const form = this.$refs[`addOns${index}`];
        if (form) {
          return form.submit();
        }
        return undefined;
      },
    },
  };
</script>
