<template>
  <span>
    <span v-if="type === 0" class="label label-default"><i class="fa fa-genderless"></i> Unknown</span>
    <span v-if="type === 1" class="label blue-bg"><i class="fa fa-mars"></i> Male</span>
    <span v-if="type === 2" class="label red-bg"><i class="fa fa-venus"></i> Female</span>
  </span>
</template>

<script>
  import _includes from 'lodash/includes';

  export default {
    props: {
      type: {
        type: Number,
        default: 0,
        validator: value => _includes([0, 1, 2], value),
      },
    },
  };
</script>
