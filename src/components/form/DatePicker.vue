<template>
  <input type="text" class="form-control" :placeholder="placeholder" :class="{'error': !valid}" @input="validateDate">
</template>

<script>
  import $ from 'jquery';
  import moment from 'moment';
  import 'bootstrap-datepicker';
  import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.css';

  export default {
    props: {
      placeholder: {
        type: String,
      },
      format: {
        type: String,
        default: 'yyyy-mm-dd',
      },
    },
    data() {
      return {
        valid: true,
      };
    },
    mounted() {
      const datepicker = $(this.$el).datepicker({
        autoclose: true,
        clearBtn: true,
        format: this.format,
      });

      datepicker.on('changeDate', (event) => {
        const date = moment(event.target.value);
        if (date.isValid()) {
          this.valid = true;
          this.$emit('value', moment(event.target.value).format('x'));
        }
      });

      datepicker.on('clearDate', () => {
        this.$emit('value', '');
      });
    },
    methods: {
      validateDate(e) {
        const value = e.target.value;
        if (value === '') {
          this.valid = true;
          return;
        }

        const date = moment(value);
        this.valid = date.isValid();
      },
    },
  };
</script>
