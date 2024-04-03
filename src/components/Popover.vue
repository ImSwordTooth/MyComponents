<template>
	<div>
		<div ref="defaultChildren">
			<slot></slot>
		</div>

		<Teleport to="body">
			<div class="PopoverContent" ref="contentChildren" :style="contentLocation">
				<slot name="content"></slot>
			</div>
		</Teleport>
	</div>
</template>
<script setup lang="ts">

import {ref, onMounted, computed, watch, onBeforeMount} from "vue";
import { getPlacement } from '../utils/getPlacement.ts'

const props = withDefaults(defineProps<{
	placement?:
		| "top"
		| "bottom"
		| "right"
		| "left"
		| "top-start"
		| "top-end"
		| "bottom-start"
		| "bottom-end"
		| "left-start"
		| "left-end"
		| "right-start"
		| "right-end";
}>(), {
	placement: 'bottom'
})

const slots = defineSlots<{
	default: never
	content: never
}>()

const defaultChildren = ref()
const contentChildren = ref()
const contentLocation = ref({})
const contentObserver = ref<MutationObserver|null>(null)

const baseElementRect = computed((): DOMRect => {
	console.log(defaultChildren.value)
	return defaultChildren.value.children[0].getBoundingClientRect();
})
const contentElementRect = computed((): DOMRect => {
	return contentChildren.value.getBoundingClientRect();
})

const getLocation = (): void => {
	// 计算 Popover 内容的位置，不能用 computed 包裹 Rect，因为会有缓存值，想要的是实时的值
	contentLocation.value = getPlacement(defaultChildren.value.children[0].getBoundingClientRect(), contentChildren.value.getBoundingClientRect(), props.placement)
}

onMounted(() => {
	getLocation(); // 计算 Popover 内容的位置
	contentObserver.value = new MutationObserver(getLocation)
	contentObserver.value.observe(contentChildren.value, {
		childList: true,
		subtree: true
	})
	contentObserver.value.observe(defaultChildren.value, {
		childList: true,
		subtree: true
	})
	window.addEventListener('resize', getLocation) // 窗口尺寸变化时，重新计算位置

})

onBeforeMount(() => {
	if (contentObserver.value) {
		contentObserver.value.disconnect();
	}
	window.removeEventListener('resize', getLocation)
})

watch(() => props.placement, getLocation)


</script>
<style scoped lang="scss">
.PopoverContent {
	padding: 4px 10px;
	position: absolute;
	box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(0, 0, 0, 0.03) 0px 0px 15px 0px,
				rgba(0, 0, 0, 0.08) 0px 2px 30px 0px,
				rgba(0, 0, 0, 0.3) 0px 0px 1px 0px;
	border-radius: 14px;
}
</style>
