<template>
  <div class="input-group date-range-picker w-300">
    <input type="text" class="form-control disabled" v-model="displayValue" :placeholder="placeholder" disabled>
    <span class="input-group-btn">
      <button type="button"
              class="btn btn-primary"
              @click="toggleDropDown"><i class="fa fa-calendar"></i></button>
    </span>
    <transition name="fade">
      <div v-if="shown" class="date-range-pick-panel w-300">
        <div class="pickers">
          <div>
            <h3>From :</h3>
            <i-date-picker :value="from" @value="v => this.from = v" type="inline" :clearButton="false"></i-date-picker>
          </div>
          <div>
            <h3>To :</h3>
            <i-date-picker :value="to" @value="v => this.to = v" type="inline" :clearButton="false"></i-date-picker>
          </div>
        </div>
        <div class="buttons">
          <i-button type="primary" size="sm" title="OK" @onPress="submit"></i-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import $ from 'jquery';
  import moment from 'moment';

  export default {
    props: {
      placeholder: {
        type: String,
      },
      value: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        shown: false,
        from: this.value[0],
        to: this.value[1],
      };
    },
    computed: {
      displayValue() {
        return (this.from === undefined && this.to === undefined)
          ? ''
          : `${moment(this.from).format('YYYY-MM-DD')} - ${moment(this.to).format('YYYY-MM-DD')}`;
      },
    },
    methods: {
      submit() {
        this.$emit('value', [this.from, this.to]);
        this.toggleDropDown();
      },
      toggleDropDown() {
        this.shown = !this.shown;

        // if user click other place not inside the panel. click the panel
        const globalCanceler = (e) => {
          if ($(e.target).hasClass('date-range-picker')
            || $(e.target).parents('.date-range-picker').length !== 0) {
            return;
          }
          this.$root.$el.removeEventListener('click', globalCanceler);
          this.shown = false;
        };

        if (this.shown) {
          this.$root.$el.addEventListener('click', globalCanceler);
        } else {
          this.$root.$el.removeEventListener('click', globalCanceler);
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../public/SCSS/variables";

  .date-range-pick-panel {
    position: absolute;
    top: 48px;
    left: 0;
    border: 1px solid $navy;
    background-color: white;
    z-index: 105;
    padding: 20px;
  }

  .date-range-pick-panel .pickers {
    display: flex;
    justify-content: space-between;
  }

  .date-range-pick-panel .pickers div {
    width: 46%;
  }

  .date-range-pick-panel .buttons {
    display: flex;
    justify-content: flex-end;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
