<template>
  <input v-if="type === 'input'" type="text" class="form-control" :placeholder="placeholder" :class="{'error': !valid}" @input="validateDate">
  <div v-else-if="type === 'inline'"></div>
</template>

<script>
  import $ from 'jquery';
  import moment from 'moment';
  import 'bootstrap-datepicker';
  import 'bootstrap-datepicker/dist/css/bootstrap-datepicker3.css';

  export default {
    model: {
      event: 'value',
    },
    props: {
      placeholder: {
        type: String,
      },
      format: {
        type: String,
        default: 'yyyy-mm-dd',
      },
      type: {
        type: String,
        default: 'input', // [input, inline]
      },
      value: {
        type: Number,
      },
      clearButton: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        valid: true,
      };
    },
    watch: {
      value(val) {
        $(this.$el).datepicker('update', moment(val).toDate());
      },
    },
    mounted() {
      const datepicker = $(this.$el).datepicker({
        autoclose: true,
        clearBtn: this.clearButton,
        format: this.format,
      });

      if (this.value) {
        $(this.$el).datepicker('update', moment(this.value).toDate());
      }

      datepicker.on('changeDate', (event) => {
        const date = moment(event.date);
        if (date.isValid()) {
          this.valid = true;
          this.$emit('value', moment(event.date).valueOf());
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
