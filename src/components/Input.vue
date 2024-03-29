<template>
  <div
      :class="[
          'inputWp',
          isFocus ? 'noBCchange' : '',
          isDisable ? 'disable' : '',
          `variant_${variant || 'flat'}`
      ]"
      @mousedown="clickInputWp"
      :style="{ width: '200px' }"
  >
    <div :class="['label', value || placeholder || isFocus ? 'withValue' : '']" v-if="label">{{ label }}</div>
    <div class="inner" :style="{ height: label ? '40px' :'auto' }">
      <input
          type="text"
          class="trueInput"
          ref="inputElement"
          :placeholder="placeholder"
          :disabled="isDisable"
          :value="value"
          @input="changeValue"
          @focus="handleFocus"
          @blur="handleBlur"
      >

      <svg v-if="isClearable && !!value" @click="clear" class="clearIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <path d="M519.656727 472.459636l-160.512-160.488727a36.584727 36.584727 0 1 0-51.712 51.712l160.488728 160.512-160.488728 160.512a36.584727 36.584727 0 1 0 51.712 51.712l160.512-160.512 160.488728 160.512a36.584727 36.584727 0 1 0 51.735272-51.712l-160.512-160.512 160.512-160.512a36.584727 36.584727 0 1 0-51.735272-51.712L519.68 472.436364zM512 1024C229.236364 1024 0 794.763636 0 512S229.236364 0 512 0s512 229.236364 512 512-229.236364 512-512 512z" />
      </svg>
    </div>
  </div>
  <div class="description">{{ description }}</div>

</template>
<script setup lang="ts">
import { ref, nextTick } from "vue";

withDefaults(defineProps<{
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined' // 预设样式
  label?: string // 文本框的标题，可以为空
  description?: string // 描述
  placeholder?: string
  isDisable?: boolean
  isClearable?: boolean
}>(), {
  variant: 'flat'
})

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
const clear = () => value.value = '';

</script>
<style scoped lang="scss">
.inputWp {
  padding: 8px 12px;
  background-color: hsl(240 5% 96%);
  border-radius: 12px;
  position: relative;
  cursor: text;
  transition: background-color ease .15s;

  &.disable {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }

  &:hover {
    background-color: hsl(240 6% 90%);
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
      transform: scale(0.85) translateY(-14px);
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

    .clearIcon {
      width: 16px;
      height: 16px;
      cursor: pointer;
      fill: #888888;
      transition: fill ease .15s;

      &:hover {
        fill: #000000;
      }
    }
  }

  &.variant_flat {
    &.noBCchange {
      &:hover {
        background-color: hsl(240 5% 96%);
      }
    }
  }

  &.variant_bordered {
    background-color: #ffffff;
    outline: 2px solid hsl(240 6% 90%);
    transition: outline ease .15s;

    &:hover {
      outline-color: hsl(240 5% 65%);
    }

    &.noBCchange {
      &:hover {
        outline-color: hsl(0 0% 0%);
      }
    }
  }

  &.variant_faded {
    background-color: hsl(240 5% 96%);
    outline: 2px solid hsl(240 6% 90%);
    transition: outline ease .15s;

    &:hover {
      outline-color: hsl(240 5% 65%);
    }
  }

  &.variant_underlined {
    background-color: transparent;
    border-bottom: 2px solid hsl(240 6% 90%);
    border-radius: 0;
    padding: 7px 4px;
    transition: border ease .15s;

    &:hover {
      border-color: hsl(240 5% 65%);
    }

    &.noBCchange {
      &:hover {
        border-color: hsl(0 0% 0%);
      }
    }
  }
}

.description {
  padding: 4px;
  font-size: 12px;
  line-height: 16px;
  color: hsl(240 5% 65%);
}
</style>
