<template>
    <i-page>
        <i-box>
            <i-table
                    :api="api.filteredWordList"
                    :columns="['words', 'operation']"
                    v-model="userData"
                    :filter="filter">
                <tr v-for="(item, index) in userData.wordList">
                    <td>{{ (index + 1) + userData.pageBase }}</td>
                    <td>{{ item }}</td>
                    <td>delete</td>
                </tr>
            </i-table>
        </i-box>
    </i-page>
</template>

<script>
    import api from '../../api';

    export default{
      data() {
        return {
          api,
          filter: {},
          userData: {},
        };
      },

    };
</script>
