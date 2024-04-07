<template>
	<h2>Select - 选择器</h2>

	<div class="part">
		<Select :label="'选择你的英雄'" :placeholder="'choose your hero'">

		</Select>
	</div>

	<div class="part">
		<Select :label="'选择你的英雄'">

		</Select>
	</div>

	<div class="part">
		<Select>

		</Select>
	</div>

	<div class="part">
		<Select :placeholder="'测试备注'">

		</Select>
	</div>

</template>
<script setup lang="ts">

import Select from "../components/Select.vue";
</script>

<style scoped lang="scss">
.part {
	margin: 20px 0;
}
</style>
