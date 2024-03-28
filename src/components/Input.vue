<template>
  <div :class="['inputWp', isFocus ? 'noBCchange' : '']" @mousedown="clickInputWp">
    <div :class="['label', value || placeholder || isFocus ? 'withValue' : '']" v-if="label">{{ label }}</div>
    <div class="inner" :style="{ height: label ? '40px' :'auto' }">
      <input
          type="text"
          class="trueInput"
          ref="inputElement"
          :placeholder="placeholder"
          :value="value"
          @input="changeValue"
          @focus="handleFocus"
          @blur="handleBlur"
      >
    </div>

  </div>

</template>
<script setup lang="ts">
import { ref, nextTick } from "vue";

defineProps<{
  label?: string
  placeholder?: string
}>()

const inputElement = ref()
const value = ref<string>()
const isFocus = ref<boolean>(false)

const clickInputWp = () => {
  setTimeout(() => {
    inputElement.value.focus()
  })
  // nextTick(() => {
  //   inputElement.value.focus()
  // })
}
const changeValue = (e: Event) => value.value = (e.target as HTMLInputElement).value;
const handleFocus = () => isFocus.value = true;
const handleBlur = () => isFocus.value = false;

</script>
<style scoped lang="scss">
.inputWp {
  padding: 8px 12px;
  background-color: hsl(240 5% 96%);
  border-radius: 12px;
  position: relative;
  cursor: text;
  transition: background-color ease .15s;

  &:hover {
    background-color: hsl(240 6% 90%);
  }


  &.noBCchange {
    &:hover {
      background-color: hsl(240 5% 96%);
    }
  }

  .label {
    position: absolute;
    top: 0;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: -16px;
    height: 100%;
    will-change: transform;
    transition: all .3s;
    z-index: 0;

    &.withValue {
      transform: scale(0.85) translateY(-13px);
      transform-origin: left;
    }

  }

  .inner {
    width: 100%;
    display: inline-flex;
    align-items: flex-end;
    height: 40px;
    .trueInput {
      width: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      padding-left: 0;
      font-size: 14px;
    }
  }


}
</style>
