<template>
  <i-page>
    <i-box>
      <h3>Add Tag</h3>
      <i-form
        ref="addTagForm">
        <div class="row">
          <div class="col-xs-6">
            <i-form-item
              name="tagName"></i-form-item>
          </div>
          <div class="col-xs-6">
            <i-button title="Add"
                      :isSubmit="true"
                      @onPress="submit"
                      type="primary"></i-button>
          </div>
        </div>
      </i-form>

      <h3>Tags</h3>
      <div class="well">
        <Tag v-for="(tag, index) in tags" :key="tag" :value="tag" @onDelete="id => removeTag(id)"></Tag>
      </div>
    </i-box>
  </i-page>
</template>

<script>
  import _indexOf from 'lodash/indexOf';
  import _find from 'lodash/find';
  import _map from 'lodash/map';
  import Tag from './components/Tag';

  export default {
    components: { Tag },
    data() {
      return {
        tags: () => ([]),
      };
    },
    created() {
      this.refresh();
    },
    methods: {
      removeTag(id) {
        const index = _indexOf(this.tags, _find(this.tags, { id }));
        this.tags.splice(index, 1);
        this.API.tagRemove.request({ id });
      },
      submit() {
        const weightBase = Math.max(..._map(this.tags, tag => tag.weight));
        this.$refs.addTagForm.submit()
          .then((values) => {
            const newTag = {
              tag_name: values.tagName,
              weight: weightBase + 1,
            };
            this.API.tagCreate.request(newTag);
            return newTag;
          })
          .then(newTag => this.tags.splice(0, 0, newTag));
      },
      refresh() {
        return this.API.tagList.request()
          .then((res) => {
            this.tags = res.data;
          });
      },
    },
  };
</script>
