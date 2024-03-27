<template>
  <button
      :class="['my-button', `my-button-${variant || 'solid'}`, isPressing ? 'isPressing' : '']"
      @mousedown="isPressing = true"
      @mouseup="isPressing = false"
  >
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  variant: 'solid'|'bordered'|'light'|'flat'|'faded'|'shadow'|'ghost', // 预设样式
}>()

const isPressing = ref(false); // 按钮是否被按下中

</script>
<style scoped lang="scss">
  .my-button {
    color: #ffffff;
    padding: 0 16px;
    font-size: 14px;
    line-height: 20px;
    height: 40px;
    border: none;
    border-radius: 12px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition-property: transform, color, background, background-color, border-color, text-decoration-color, fill, stroke, opacity;
    transition-timing-function: ease;
    transition-duration: .25s;

    &.isPressing {
      transform: matrix(0.97, 0, 0, 0.97, 0, 0);
    }

    &.my-button-solid {
      background-color: $primaryColor;

      &:hover {
        opacity: 0.8;
      }
    }

    &.my-button-flat {
      background-color: $flatColor;
      color: $primaryColor;
    }
  }
</style>
