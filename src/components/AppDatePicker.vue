<template>
  <div class="app-datepicker" :class="{ error: hasErrors }">
    <v-date-picker v-on="$listeners" v-bind="_attrs">
      <template v-slot="{ inputValue, inputEvents, togglePopover }">
        <app-input
          :value="inputValue"
          :label="label"
          :errors="errors"
          @click="togglePopover"
          @change.native="inputEvents.change"
        
        />
      </template>
    </v-date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  setup() {
    return {};
  },
})
export default class AppDatePicker extends Vue {
  @Prop(String) label: string;
  @Prop({ type: Array, default: () => [] }) errors: string[];
  get hasErrors() {
    return this.errors.length > 0;
  }
  get _attrs() {
    const defaultOptions = {};
    return Object.assign({}, defaultOptions, this.$attrs);
  }
}
</script>

<style lang="scss">
.app-datepicker {
}
</style>