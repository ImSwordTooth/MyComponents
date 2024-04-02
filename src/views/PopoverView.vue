<template>
	<div class="popoverView">
<!--		<Button cl :variant="'bordered'">左上</Button>-->
<!--		<Button variant="light">右上</Button>-->
<!--		<Button class="center">中间位置</Button>-->
<!--		<Button :variant="'ghost'">左下</Button>-->
<!--		<Button :variant="'flat'">右下</Button>-->

		<Popover>
			<div class="base">我是一段文本</div>
		</Popover>

	</div>
</template>
<script setup lang="ts">
import Popover from "../components/Popover.vue";
</script>
<style scoped lang="scss">
.popoverView {
	position: relative;
	height: 500px;
	.base {
		position: absolute;
		left: 50%;
		top: 50%;
	}
}
</style>
