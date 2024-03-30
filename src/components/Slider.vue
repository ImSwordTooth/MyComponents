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
import {computed, nextTick, onMounted, ref} from 'vue';

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

const staticClientRect= computed(() => {
  console.log(sliderInner.value.getBoundingClientRect())
  const { width, left, right } = sliderInner.value.getBoundingClientRect()
  return {
    stepWidth: width / ((props.maxValue - props.minValue) / props.step), // 每一步对应的宽度
    innerLeft: left, // slider 容器左边
    innerRight: right // slider 容器右边
  }
})

const isStart = ref<boolean>(false)
const positionInfo = ref<{  clientX: number, clientY: number }>({ clientX: 0, clientY: 0 })

const startDrag = (e: MouseEvent) => {
  const { clientX, clientY } = e
  isStart.value = true;
  positionInfo.value = { clientX,clientY }

  document.addEventListener('mouseup', endDrag)
  document.addEventListener('mousemove', draging)
}

const draging = (e: MouseEvent) => {
  console.log(e)
  e.preventDefault();
  const { stepWidth, innerLeft, innerRight } = staticClientRect.value
  if (isStart.value) {
    const { clientX: endX, clientY: endY } = e
    if (endX < innerLeft || endX > innerRight) {
      console.log('超了')
      return
    }
    console.log({ '开始': positionInfo.value.clientX, '结束': endX })
    console.log('差值：', endX - positionInfo.value.clientX)
    // nextTick(() => {
    console.log('差值/step：', (endX - positionInfo.value.clientX)/stepWidth)
      sliderValue.value += (endX - positionInfo.value.clientX)/stepWidth

    const finalValue = sliderValue.value + (endX - positionInfo.value.clientX)/stepWidth

    if (finalValue > props.maxValue) {
      sliderValue.value = props.maxValue
    }
    if (finalValue < props.minValue) {
      sliderValue.value = props.minValue
    }

    console.log(sliderValue.value)
    positionInfo.value = { clientX: endX, clientY: endY }

  }
}


const endDrag = () => {
  isStart.value = false;
  positionInfo.value = { clientX: 0, clientY: 0 }

  document.removeEventListener('mousemove', draging)
  document.removeEventListener('mouseup', endDrag)
}

onMounted(() => {
  const { stepWidth } = staticClientRect.value
  console.log(stepWidth)
})

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
