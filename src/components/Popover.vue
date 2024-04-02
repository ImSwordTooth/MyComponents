<template>
	<div>
		<div ref="defaultChildren">
			<slot></slot>
		</div>

		<Teleport to="body">
			<div class="PopoverContent" ref="contentChildren">
				<slot name="content"></slot>
			</div>
		</Teleport>
	</div>
</template>
<script setup lang="ts">

import {ref, onMounted, computed} from "vue";

const slots = defineSlots<{
	default: never
	content: never
}>()

const defaultChildren = ref()
const contentChildren = ref()

const baseElementRect = computed((): DOMRect => {
	return defaultChildren.value.children[0].getBoundingClientRect();
})
const contentElementRect = computed((): DOMRect => {
	return contentChildren.value.getBoundingClientRect();
})


onMounted(() => {
	console.log(baseElementRect.value)
	console.log(contentElementRect.value)

})

</script>
<style scoped lang="scss">
.PopoverContent {
	border: solid 1px #cccccc;
	position: fixed;
}
</style>
