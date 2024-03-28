<template>
  <button
      :class="[
          'my-button',
          `my-button-${variant || 'solid'}`,
          isPressing ? 'isPressing' : '',
          isDisable ? 'isDisable' : '',
          isLoading ? 'isLoading' : ''
      ]"
      @mousedown="isPressing = true"
      @mouseup="isPressing = false"
  >
    <slot name="startContent" />
    <template v-if="!isLoading">
      <slot></slot>
    </template>

    <template v-else>
      <svg class="loadingSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <path d="M563.2 819.2a102.4 102.4 0 1 1 0 204.8 102.4 102.4 0 0 1 0-204.8z m-320.4608-153.6a128 128 0 1 1 0 256 128 128 0 0 1 0-256z m592.7936 25.6a102.4 102.4 0 1 1 0 204.8 102.4 102.4 0 0 1 0-204.8zM947.2 477.1328a76.8 76.8 0 1 1 0 153.6 76.8 76.8 0 0 1 0-153.6zM128 307.2a128 128 0 1 1 0 256 128 128 0 0 1 0-256z m782.6432-40.6016a51.2 51.2 0 1 1 0 102.4 51.2 51.2 0 0 1 0-102.4zM409.6 0a153.6 153.6 0 1 1 0 307.2 153.6 153.6 0 0 1 0-307.2z m384 153.6a25.6 25.6 0 1 1 0 51.2 25.6 25.6 0 0 1 0-51.2z" />
      </svg>
      {{ loadingText || '加载中' }}
    </template>

    <slot name="endContent" />
  </button>
</template>
<script setup lang="ts">
import {ref} from "vue";

defineProps<{
  variant?: 'solid'|'bordered'|'light'|'flat'|'faded'|'shadow'|'ghost', // 预设样式
  isLoading?: boolean // 加载中
  loadingText?: string // 加载中的文本
  isDisable?: boolean // 是否不可用
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

    .loadingSvg {
      fill: #ffffff;
      width: 20px;
      height: 20px;
      margin-right: 6px;
      animation: rotate360 .8s linear infinite;
    }

    &.isPressing {
      transform: matrix(0.97, 0, 0, 0.97, 0, 0);
    }
    &.isDisable, &.isLoading {
      pointer-events: none;
      user-select: none;
      cursor: default;
      opacity: .5;
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
      &:hover {
        opacity: 0.8;
      }

      .loadingSvg {
        fill: $primaryColor;
      }
    }
    &.my-button-bordered {
      border: 2px solid $primaryColor;
      background-color: #ffffff;
      color: $primaryColor;

      .loadingSvg {
        fill: $primaryColor;
      }
    }
    &.my-button-light {
      background-color: #ffffff;
      color: $primaryColor;

      &:hover {
        background-color: $flatColor;
      }

      .loadingSvg {
        fill: $primaryColor;
      }
    }
    &.my-button-ghost {
      border: 2px solid $primaryColor;
      background-color: #ffffff;
      color: $primaryColor;

      &:hover {
        background-color: $primaryColor;
        color: #ffffff;
      }

      .loadingSvg {
        fill: $primaryColor;
      }
    }
    &.my-button-shadow {
      background-color: $primaryColor;
      color: #ffffff;
      box-shadow: $shadow;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  @keyframes rotate360 {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
