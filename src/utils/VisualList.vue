<template>
	<div class="parent" :style="{ height: `${height}px` }" @scroll="handleScroll">
		<div class="visualList" ref="listRef" :style="{ height: `${perHeight * list.length}px`, transform: `translateY(${listScrollTop}px)` }" >
			<div class="before"></div>
			<div class="content" :style="{ height: `${height}px` }">
				<slot name="item" v-for="(option, value) of ContentList" :props="option"></slot>
			</div>
			<div class="after"></div>
		</div>
	</div>


</template>
<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

const props = defineProps<{
	height: number // 列表高度
	perHeight: number // 每条数据的高度
	list: []
}>()

const slots = defineSlots<{
	item(props: object): never
}>()

const listRef = ref()
const listScrollTop = ref<number>(0); // 滚动高度
const currentIndex = ref<number>(0)

const ContentList = computed(() => {
	const length = props.height / props.perHeight
	console.log( props.list.slice(currentIndex.value, currentIndex.value + length))
	return props.list.slice(currentIndex.value, currentIndex.value + length)
})

const handleScroll = (e: Event) => {
	const { scrollTop } = e.target
	listScrollTop.value = scrollTop
	currentIndex.value = Math.floor(scrollTop / props.perHeight)
	console.log({ currentIndex: currentIndex.value })
}

</script>
<style scoped lang="scss">
.parent {
	overflow: auto;
}
.visualList {
	position: relative;
	//overflow: auto;
	background-color: rgba(100, 108, 255, 0.27);

	.content {
		background-color: red;
	}
}
</style>
