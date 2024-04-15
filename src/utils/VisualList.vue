<template>
	<div class="parent" :style="{ height: `${height}px` }" @scroll="handleScroll">
		<div class="visualList" ref="listRef" :style="{ height: `${perHeight * list.length}px` }" >
			<div class="content" :style="{ height: `${height}px`, transform: `translateY(${listScrollTop}px)` }">
				<slot name="item" v-for="(option, index) of ContentList" :itemInfo="option" :key="index"></slot>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
	height: number // 列表高度
	perHeight: number // 每条数据的高度
	list: []
}>()

defineSlots<{
	item(itemInfo: object): never
}>()

const listRef = ref()
const listScrollTop = ref<number>(0); // 滚动高度
const currentIndex = ref<number>(0)

const ContentList = computed(() => {
	const length = props.height / props.perHeight
	return props.list.slice(currentIndex.value, currentIndex.value + length)
})

const handleScroll = (e: Event) => {
	const { scrollTop, offsetHeight } = e.target as HTMLElement;

	if(scrollTop + offsetHeight > props.perHeight * props.list.length) {
		return
	}

	listScrollTop.value = scrollTop
	currentIndex.value = Math.floor(scrollTop / props.perHeight)
}
</script>
<style scoped lang="scss">
.parent {
	overflow: auto;
}
.visualList {
	position: relative;
	//overflow: auto;
	//background-color: rgba(100, 108, 255, 0.27);

	.content {
		//background-color: red;
	}
}
</style>
