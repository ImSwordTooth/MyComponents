<template>
  <div class="slider">
    <div class="textPart">
      <div>Temperature</div>
      <div>{{ sliderValue }}</div>
    </div>
    <div class="sliderInner" ref="sliderInner">
      <div class="sliderThumb" :style="{ height: `${thumbHeight || 10}px` }"></div>
      <div class="sliderTube" :style="{ width: `${sliderPercent}%` }"></div>
      <div class="sliderButton" :style="{ left: `${sliderPercent}%` }" @mousedown="startDrag" @mousemove="draging" />
    </div>
  </div>

</template>

<script setup lang="ts">
import {computed, nextTick, ref} from 'vue';

const props = defineProps<{
  minValue: number // 最小值
  maxValue: number // 最大值
  step: number // 每一格的值
  thumbHeight?: boolean // 轨道高度
}>()

const sliderInner = ref()
const sliderValue = ref<number>(props.maxValue)
const sliderPercent = computed(() => {
  return ((sliderValue.value - props.minValue) / props.maxValue) * 100
})
const stepWidth = computed(() => {
  const { width } = sliderInner.value.getBoundingClientRect()
  return width / ((props.maxValue - props.minValue) / props.step)
})

const isStart = ref<boolean>(false)
const positionInfo = ref<{  clientX: number, clientY: number }>({ clientX: 0, clientY: 0 })

const startDrag = (e: MouseEvent) => {
  const { clientX, clientY } = e
  isStart.value = true;
  positionInfo.value = { clientX,clientY }

  document.addEventListener('mouseup', () => {
    isStart.value = false;
    positionInfo.value = { clientX: 0, clientY: 0 }
  })
}

const draging = (e: MouseEvent) => {
  if (isStart.value) {
    const { clientX: endX, clientY: endY } = e
    console.log({ startX: positionInfo.value.clientX, endX })
    nextTick(() => {
      sliderValue.value += (endX - positionInfo.value.clientX)/stepWidth.value
      positionInfo.value = { clientX: endX, clientY: endY }
    })


  }
}

</script>

<style scoped lang="scss">
.slider {
  .textPart {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .sliderInner {
    position: relative;
    width: 100%;
    box-sizing: border-box;
    border-left: 10px solid $primaryColor;
    border-right: 10px solid hsl(240 5% 84%/.5);
    border-radius: 999px;

    .sliderThumb {
      background-color: hsl(240 5% 84%/.5);
    }

    .sliderTube {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background-color: $primaryColor;
      box-sizing: border-box;
    }

    .sliderButton {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 20px;
      height: 20px;
      background-color: $primaryColor;
      border-radius: 50%;
      box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, .02), 0px 2px 10px 0px rgba(0, 0, 0, .06), 0px 0px 1px 0px rgba(0, 0, 0, .3);
      transform: translateX(-50%);
      //opacity: .3;

      &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        background-color: #ffffff;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
}
</style>
