<template>
	<div class="slider" :style="{ width: width ? `${width}px` : '100%' }">
		<div class="textPart">
			<div class="label">
				<slot name="label">{{ label }}</slot>
			</div>
			<div v-if="valueFormat">
				<template v-if="typeof valueFormat === 'boolean'">{{ sliderValue }}</template>
				<template v-else>{{ valueFormat(sliderValue) }}</template>
			</div>
		</div>
		<div class="sliderInner" ref="sliderInner">
			<div class="sliderThumb" :style="{ height: `${thumbHeight || 10}px` }" />
			<div class="sliderTube" :style="{ width: `${sliderPercent}%` }" />
			<div :class="['sliderButton', isStart ? 'draging' : '']" :style="{ left: `${sliderPercent}%` }" @mousedown="startDrag" />
		</div>
	</div>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, ref, SlotsType} from 'vue';


const props = withDefaults(defineProps<{
	minValue: number // 最小值
	maxValue: number // 最大值
	step: number // 每一格的值
	width?: number // 宽度，不写则为 100%
	thumbHeight?: number // 轨道高度
	label?: string | SlotsType
	valueFormat?: boolean | ((value: number) => string)
}>(), {
  valueFormat: true
})

const slots = defineSlots<{
  label?: any
}>()

const sliderValue = defineModel<number>('value', { required: true })
const sliderInner = ref()
const sliderPercent = computed(() => {
  return ((sliderValue.value - props.minValue) / props.maxValue) * 100
})

const staticClientRect= computed(() => {
  const { width, left, right } = sliderInner.value.getBoundingClientRect()
  return {
    stepWidth: width / ((props.maxValue - props.minValue) / props.step), // 每一步对应的宽度
    innerLeft: left, // slider 容器左边
    innerRight: right // slider 容器右边
  }
})

// step 的小数位数
const decimalLength = computed(() => {
  const patternRes = /\d\.?(\d+)?/g.exec(props.step.toString())
  if (patternRes) {
    return patternRes[1] ? patternRes[1].length : 0;
  } else {
    return 0
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
  e.preventDefault();
  const { stepWidth, innerLeft, innerRight } = staticClientRect.value
  if (isStart.value) {
    const { clientX: endX, clientY: endY } = e

    // 处理边界问题
    if (endX < innerLeft) {
      if (sliderValue.value !== props.minValue) { // 如果鼠标已经到达了边界，并且因为滑动太快没到最小值，就手动置为最小值【解决了快速滑到边界，但是值还卡在中间位置的bug】
        sliderValue.value = props.minValue
      } else { // 如果鼠标已经到达了边界并且为最小值，就 return 掉，不再处理
        return
      }
    }
    if (endX > innerRight) {
      if (sliderValue.value !== props.maxValue) {
        sliderValue.value = props.maxValue
      } else {
        return
      }
    }

    const delta = (endX - positionInfo.value.clientX) / stepWidth * props.step;

    // 如果差值没有到最小的 step，就 return 掉
    if (Math.abs(delta) < props.step) {
      return;
    }

    const finalValue = +(sliderValue.value + delta).toFixed(decimalLength.value)
    // const finalValue = (sliderValue.value + delta)

    // 最终值不能超过边界
    if (finalValue > props.maxValue) {
      sliderValue.value = props.maxValue
    } else if (finalValue < props.minValue) {
      sliderValue.value = props.minValue
    } else {
      sliderValue.value = finalValue
    }
    positionInfo.value = { clientX: endX, clientY: endY }
  }
}


const endDrag = () => {
  isStart.value = false;
  positionInfo.value = { clientX: 0, clientY: 0 }

  document.removeEventListener('mousemove', draging)
  document.removeEventListener('mouseup', endDrag)
}

</script>

<style scoped lang="scss">
.slider {
  .textPart {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;

    .label {
      color: hsl(202 24% 9%);
      font-size: 14px;
    }
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
      cursor: grab;
      //opacity: .3;

      &.draging {
        cursor: grabbing;

        &::after {
          transform: scale(0.8);
          cursor: grabbing;
        }
      }

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
        transition-duration: 0.3s;
        transition-property: transform;
        transition-timing-function: ease;
        cursor: grab;
      }
    }
  }
}
</style>
