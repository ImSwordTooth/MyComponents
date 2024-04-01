<template>
  <div
      :class="['boxWp', isPressing ? 'isPressing' : '', isDisable ? 'isDisable' : '']"
      @mousedown="isPressing = true"
      @mouseup="isPressing = false"
      @click="toggleIsChecked"
  >
    <div class="box">
      <div :class="['checkedbox', isInit ? 'init' : '', isChecked ? 'enter' : 'leave']">
        <svg aria-hidden="true" role="presentation" viewBox="0 0 17 18" class="z-10 opacity-0 group-data-[selected=true]:opacity-100 w-4 h-3 transition-opacity motion-reduce:transition-none"><polyline fill="none" points="1 9 7 14 15 4" stroke="currentColor" stroke-dasharray="22" stroke-dashoffset="44" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="transition: stroke-dashoffset 250ms linear 0.2s;"></polyline></svg>
        <div class="svgMask" />
      </div>
    </div>
    <div class="labelContent">
      <slot></slot>
    </div>
  </div>

</template>
<script setup lang="ts">
import {ref, watch} from 'vue'
defineProps<{
  isDisable?: boolean
}>()
const slots= defineSlots<{
  default: any
}>()

const isChecked = ref<boolean>(false)
const isPressing = ref<boolean>(false)
const isInit = ref<boolean>(true)

const toggleIsChecked = (): void => {
  isChecked.value = !isChecked.value
}

watch(isChecked, () => {
  if (isInit) {
    isInit.value = false;
  }
}, {
  once: true
})
</script>
<style scoped lang="scss">
.boxWp {
  cursor: pointer;
  user-select: none;

  &.isDisable {
    opacity: .5;
    pointer-events: none;
  }

  &:hover {
    .box {
      background-color: hsl(240 5% 96%);
    }
  }

  &.isPressing {
    .box {
      transform: matrix(0.95, 0, 0, 0.95, 0, 0);
    }
  }

  .box {
    width: 16px;
    height: 16px;
    border: 2px solid hsl(240 5% 84%);
    border-radius: 8px;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, transform;
    transition-timing-function: ease;
    transition-duration: .25s;
    position: relative;


    .checkedbox {
      position: absolute;
      width: 100%;
      height: 100%;
      left: -2px;
      top: -2px;
      border: 2px solid $primaryColor;
      border-radius: 8px;
      background-color: $primaryColor;
      color: #ffffff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;


      &.enter {
        animation: smallToBig ease .3s forwards;

        .svgMask {
          animation: toLeft ease .5s forwards;
        }
      }
      &.leave {
        opacity: 0;
        animation: BigToSmall ease .3s forwards;
      }

      &.init {
        animation: none;
        .svgMask {
          display: none;
        }
      }

      svg {
        width: 16px;
        height: 12px;
      }

      .svgMask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: $primaryColor;
        animation-delay: 1s;
        z-index: 3;
      }

    }
  }
}

@keyframes smallToBig {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes BigToSmall {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.5);
    opacity: 0;
  }
}


@keyframes toLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

</style>
