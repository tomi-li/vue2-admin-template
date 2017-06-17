<template>
  <i-page>
    <i-box>
      <i-table
        api="liveList"
        :columns="['cover', 'Operations']"
        v-model="lives">

        <i-table-row v-for="(live,index) in lives" :key="index">
          <td>{{ live }}</td>
          <td> TODO Operations</td>
        </i-table-row>
      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  export default {
    data() {
      return {
        lives: [],
      };
    },
  };
</script>
