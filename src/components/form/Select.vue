<template>
  <select class="form-control" @change="select">
    <!-- if there are no default value. will put empty value as default -->
    <option v-if="!value" value="">------</option>
    <option v-if="isSimpleData" v-for="option in options" :value="option">{{option}}</option>
    <option v-if="!isSimpleData" v-for="option in options" :value="option.value" :selected="isEqual(option.value, value)">{{option.name}}</option>
  </select>
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
      },
      value: {
        type: [String, Number],
      },
    },
    computed: {
      isSimpleData() {
        if (!this.options || this.options.length === 0) return true;
        return typeof this.options[0] === 'string';
      },
    },
    methods: {
      select(e) {
        this.$emit('value', e.target.value);
      },
      isEqual(val1, val2) {
        return String(val1) === String(val2);
      },
    },
  };
</script>
