<template>
	<div class="popoverView">
		<Popover :placement="placement" :offset="8" v-for="placement of placementList" :key="placement">
			<template #content>
				<div class="content">
					我是 Popover 上的文本
				</div>
			</template>
			<div class="base">我是 {{ placement }}</div>
		</Popover>
	</div>
	<div>bug： 文本较少时，arrow 显示异常</div>

</template>
<script setup lang="ts">
import Popover from "../components/Popover.vue";

const placementList = [
	"top",
	"top-start",
	"top-end",
	"bottom",
	"bottom-start",
	"bottom-end",
	"right",
	"right-start",
	"right-end",
	"left",
	"left-start",
	"left-end"
]
</script>
<style scoped lang="scss">
.popoverView {
	position: relative;
	height: 500px;
	display: grid;
	grid-template-columns: repeat(3, 140px);
	grid-template-rows: repeat(4, 60px);
	gap: 100px 250px;
	align-items: center;
	padding-top: 100px;

	.base {
		display: inline-flex;
		width: 140px;
		height: 60px;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		border: solid 1px red;
		cursor: pointer;
	}
}
</style>
