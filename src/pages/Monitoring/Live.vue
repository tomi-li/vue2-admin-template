<template>
  <i-page>
    <i-box>
      <i-table
        api="liveList"
        ref="table"
        :columns="['Cover', 'Host', 'Title', 'Watching', 'StartTime', 'Operations']"
        v-model="lives">

        <i-table-row v-for="(live,index) in lives" :key="index">
          <td><img class="cover-photo" :src="live.coverUrl"></td>
          <td>
            <i-user-label :id="live['userId']" :name="live['userId']"></i-user-label>
          </td>
          <td>{{ live['title'] }}</td>
          <td>{{ live['watchingUsers'] }}</td>
          <td>{{ live['startTime'] | datetime }}</td>
          <td>
            <i-button
              size="xs"
              title="Details"
              @onPress="() => showLiveDetailModal(live)"></i-button>
            <i-button
              size="xs"
              title="Recommend"
              type="primary"
              @onPress="() => showRecommendModal(live.userId)"></i-button>
          </td>
        </i-table-row>
      </i-table>
    </i-box>
  </i-page>
</template>

<script>
  import LiveDetailModal from './modal/LiveDetailModal';
  import RecommendLiveModal from './modal/RecommendLiveModal';

  export default {
    data() {
      return {
        lives: [],
      };
    },
    methods: {
      showLiveDetailModal(live) {
        this.utils.modal(LiveDetailModal, { live });
      },
      showRecommendModal(userId) {
        this.utils.modal(RecommendLiveModal, { userId })
          .then(() => this.$refs.table.updateData());
      },
    },
  };
</script>


<style>
  .cover-photo {
    width: 40px;
  }
</style>
