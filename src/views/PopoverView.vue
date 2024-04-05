<template>
	<div>
		<div class="popoverView">
			<Popover :placement="placement" :offset="8" v-for="placement of placementList" :key="placement">
				<template #content>
					<div class="content">
						<h2>我是标题</h2>
						<div>我是 Popover 上的文本</div>
						<div>我是 Popover 上的文本</div>
						<div>我是 Popover 上的文本</div>
						<div class="desc">我是备注</div>
					</div>
				</template>
				<div class="base">
					<div>我是 {{ placement }}</div>
				</div>
			</Popover>
		</div>

		<div class="line"></div>

		<Popover v-model:open="controlledValue">
			<template #content>
				<div class="content">
					<h2>我是标题</h2>
					<div>我是 Popover 上的文本</div>
					<div>我是 Popover 上的文本</div>
					<div>我是 Popover 上的文本</div>
					<div class="desc">我是备注2</div>
				</div>
			</template>
			<div class="controlled">我是受控的 Popover，这是我的值{{ controlledValue }}</div>
		</Popover>


		<div>暂时没考虑自动调整位置</div>
	</div>

</template>
<script setup lang="ts">
import { ref } from 'vue'
import Popover from "../components/Popover.vue";

const placementList = ref([
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
])

const controlledValue = ref<boolean>(false)
</script>
<style scoped lang="scss">
.popoverView {
	position: relative;
	display: grid;
	grid-template-columns: repeat(3, 140px);
	grid-template-rows: repeat(4, 60px);
	gap: 20px;
	align-items: center;
	padding-top: 100px;

	.base {
		display: inline-flex;
		width: 140px;
		height: 60px;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		border: solid 2px rgba(250, 28, 28, 0.66);
		cursor: pointer;
		user-select: none;
	}
}

.line {
	margin: 20px 0;
	border-bottom: 2px solid #eeeeee;
}

.controlled {
	display: inline-block;
}

.content {

	h2 {
		margin: 0;
		border-bottom: 1px solid #cccccc;
	}
	.desc {
		font-size: 12px;
	}
}
</style>
