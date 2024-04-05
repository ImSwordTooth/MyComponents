<template>
	<div>
		<div ref="defaultChildren" @click="openContent">
			<slot></slot>
		</div>

		<Teleport to="body" v-if="open">
			<div
				:class="['PopoverContent', isEnter ? 'open' : 'close', { 'arrow': withArrow }]"
				ref="contentChildren"
				:style="contentLocation"
				v-show="open"
				:data-placement="placement"
				:data-small="IsSmallContent"
			>
				<slot name="content"></slot>
			</div>
		</Teleport>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch, onBeforeMount, nextTick } from 'vue'
import { getPlacement } from '../utils/getPlacement.ts'
import { adjustedBoundingRect } from '../utils/adjustedBoundingRect.ts'

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
		| "right-end"
	offset?: number
	withArrow?: boolean
}>(), {
	placement: 'bottom',
	offset: 8,
	withArrow: true
})

const open = defineModel<boolean>('open')

const slots = defineSlots<{
	default: never
	content: never
}>()

const defaultChildren = ref()
const contentChildren = ref()
const contentLocation = ref({})
const contentObserver = ref<MutationObserver|null>(null)

// const open = ref<boolean>(false) // 是否显示 Popover
const isEnter = ref<boolean>(false) // 是否显示 Popover，但是用于控制 Popover 的动画。如果直接把 open 给取消掉，就没有退场动画了

const baseElementRect = computed((): DOMRect => {
	console.log(defaultChildren.value)
	return defaultChildren.value.children[0].getBoundingClientRect();
})
const contentElementRect = computed((): DOMRect => {
	return contentChildren.value.getBoundingClientRect();
})

const IsSmallContent = computed(() => {
	if (contentChildren.value) {
		const { width, height } = contentChildren.value.getBoundingClientRect() as DOMRect;
		if (props.placement.indexOf('top') > -1 || props.placement.indexOf('bottom') > -1) {
			return width <= 20;
		} else {
			return height <= 20;
		}
	}
	return false;
})


const getLocation = (): void => {
	console.log('获取 location')
	// 计算 Popover 内容的位置，不能用 computed 包裹 Rect，因为会有缓存值，想要的是实时的值
	nextTick(() => {
		if (contentChildren.value) {
			contentLocation.value = getPlacement(defaultChildren.value.children[0].getBoundingClientRect(), adjustedBoundingRect(contentChildren.value), props.placement, props.offset)
		}
	})

}



const openContent = () => {
	open.value = true;
	isEnter.value = true;
	document.addEventListener('click', closeContent, true)
}

const closeContent = (e: MouseEvent) => {
	console.log('在监听 close')
	e.stopPropagation()
	if (!contentChildren.value.contains(e.target)) {
		isEnter.value = false;
		document.removeEventListener('click', closeContent, true)

		setTimeout(() => {
			open.value = false;
		}, 300)

	}
}

onMounted(() => {
	getLocation(); // 计算 Popover 内容的位置

	contentObserver.value = new MutationObserver(getLocation)
	if (contentChildren.value) {
		contentObserver.value.observe(contentChildren.value, {
			childList: true,
			subtree: true
		})
	}
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

watch([() => props.placement, open], getLocation)


</script>
<style scoped lang="scss">
.PopoverContent {
	padding: 4px 10px;
	position: absolute;
	z-index: 9999;
	background: #ffffff;
	box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(0, 0, 0, 0) 0px 0px 0px 0px,
				rgba(0, 0, 0, 0.03) 0px 0px 15px 0px,
				rgba(0, 0, 0, 0.08) 0px 2px 30px 0px,
				rgba(0, 0, 0, 0.3) 0px 0px 1px 0px;
	border-radius: 14px;

	&.open {
		animation: smallToBig .3s ease forwards;
	}
	&.close {
		animation: bigToSmall .3s ease forwards;
	}

	&.arrow::after {
		content: '';
		position: absolute;
		margin: auto;
		width: 0;
		height: 0;
		border: none;
	}
	&[data-placement="top"]::after {
		left: 0;
		right: 0;
		bottom: -6px;
		border-left: solid 6px transparent;
		border-right: solid 6px transparent;
		border-top: solid 6px #ffffff;
		filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="bottom"]::after {
		left: 0;
		right: 0;
		top: -6px;
		border-left: solid 6px transparent;
		border-right: solid 6px transparent;
		border-bottom: solid 6px #ffffff;
		filter: drop-shadow(0px -1px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="left"]::after {
		right: -6px;
		top: 0;
		bottom: 0;
		border-top: solid 6px transparent;
		border-bottom: solid 6px transparent;
		border-left: solid 6px #ffffff;
		filter: drop-shadow(1px 0px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="right"]::after {
		left: -6px;
		top: 0;
		bottom: 0;
		border-top: solid 6px transparent;
		border-bottom: solid 6px transparent;
		border-right: solid 6px #ffffff;
		filter: drop-shadow(-1px 0px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="top-start"]::after {
		left: 20px;
		bottom: -6px;
		border-left: solid 6px transparent;
		border-right: solid 6px transparent;
		border-top: solid 6px #ffffff;
		filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="top-start"][data-small="true"]::after {
		left: 0;
		right: 0;
	}
	&[data-placement="top-end"]::after {
		right: 20px;
		bottom: -6px;
		border-left: solid 6px transparent;
		border-right: solid 6px transparent;
		border-top: solid 6px #ffffff;
		filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="top-end"][data-small="true"]::after {
		left: 0;
		right: 0;
	}
	&[data-placement="bottom-start"]::after {
		left: 20px;
		top: -6px;
		border-left: solid 6px transparent;
		border-right: solid 6px transparent;
		border-bottom: solid 6px #ffffff;
		filter: drop-shadow(0px -1px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="bottom-start"][data-small="true"]::after {
		left: 0;
		right: 0;
	}
	&[data-placement="bottom-end"]::after {
		right: 20px;
		top: -6px;
		border-left: solid 6px transparent;
		border-right: solid 6px transparent;
		border-bottom: solid 6px #ffffff;
		filter: drop-shadow(0px -1px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="bottom-end"][data-small="true"]::after {
		left: 0;
		right: 0;
	}
	&[data-placement="left-start"]::after {
		right: -6px;
		top: 20px;
		border-top: solid 6px transparent;
		border-bottom: solid 6px transparent;
		border-left: solid 6px #ffffff;
		filter: drop-shadow(1px 0px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="left-start"][data-small="true"]::after {
		top: 0;
		bottom: 0;
	}
	&[data-placement="left-end"]::after {
		right: -6px;
		bottom: 20px;
		border-top: solid 6px transparent;
		border-bottom: solid 6px transparent;
		border-left: solid 6px #ffffff;
		filter: drop-shadow(1px 0px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="left-end"][data-small="true"]::after {
		top: 0;
		bottom: 0;
	}
	&[data-placement="right-start"]::after {
		left: -6px;
		top: 20px;
		border-top: solid 6px transparent;
		border-bottom: solid 6px transparent;
		border-right: solid 6px #ffffff;
		filter: drop-shadow(-1px 0px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="right-start"][data-small="true"]::after {
		top: 0;
		bottom: 0;
	}
	&[data-placement="right-end"]::after {
		left: -6px;
		bottom: 20px;
		border-top: solid 6px transparent;
		border-bottom: solid 6px transparent;
		border-right: solid 6px #ffffff;
		filter: drop-shadow(-1px 0px 1px rgba(0, 0, 0, 0.1));
	}
	&[data-placement="right-end"][data-small="true"]::after {
		top: 0;
		bottom: 0;
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

@keyframes bigToSmall {
	0% {
		transform: scale(1);
		opacity: 1;
	}
	100% {
		transform: scale(0.8);
		opacity: 0;
	}
}
</style>
