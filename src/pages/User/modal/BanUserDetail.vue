<template>
  <i-modal title="Ban User">
    <i-form
      direction="horizontal"
      v-model="formData">

      <i-form-item
        label="User ID"
        name="id"
        :value="params.id"
        type="static"></i-form-item>

      <i-form-item
        label="Duration"
        name="duration"
        :value="getDuration(1, 'weeks')"
        :options="[
          { name: '5 minutes', value: getDuration(5, 'minutes')},
          { name: '10 minutes', value: getDuration(10, 'minutes')},
          { name: '30 minutes', value: getDuration(30, 'minutes')},
          { name: '1 hour', value: getDuration(1, 'hours')},
          { name: '1 day', value: getDuration(1, 'days')},
          { name: '1 week', value: getDuration(1, 'weeks')},
          { name: '1 month', value: getDuration(1, 'months')},
          { name: '6 months', value: getDuration(6, 'months')},
          { name: '1 year', value: getDuration(1, 'years')},
          { name: '5 years', value: getDuration(5, 'years')}
        ]"
        type="select"></i-form-item>

      <i-form-item
        label="Reason"
        name="reason_flag"
        :options="[
            { name: $root.$options.filters.reasonFlag(0) , value: 0 },
            { name: $root.$options.filters.reasonFlag(1) , value: 1 },
            { name: $root.$options.filters.reasonFlag(2) , value: 2 },
            { name: $root.$options.filters.reasonFlag(3) , value: 3 },
            { name: $root.$options.filters.reasonFlag(4) , value: 4 },
            { name: $root.$options.filters.reasonFlag(5) , value: 5 }
          ]"
        type="radio"></i-form-item>

      <i-form-item
        label="Remark"
        name="remark"
        type="textarea"></i-form-item>

    </i-form>

    <div slot="footer">
      <i-button type="default" title="Cancel" :closeModal="true"></i-button>
      <i-button type="danger" title="Ban" @onPress="ban"></i-button>
    </div>
  </i-modal>
</template>

<script>
  import moment from 'moment';
  import api, { request } from '../../../api';

  export default {
    props: ['params'],
    data() {
      return {
        formData: undefined,
      };
    },
    methods: {
      getDuration(number, unit) {
        return moment.duration(number, unit).asMilliseconds();
      },
      ban() {
        request(api.ban, this.formData)
          .then(() => this.utils.closeModal(this));
      },
    },
  };
</script>
