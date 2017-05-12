<template>
  <li class="list-group-item">
    <span v-if="label" class="label label-primary">{{ label }}</span>
    <b v-if="label" class="pull-right">
      <slot></slot>
    </b>

    <span v-if="!label"><slot></slot></span>
  </li>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  };
</script>
