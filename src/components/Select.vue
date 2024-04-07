<template>
	<div
		:class="['select', { 'withLabel': label }]"
		:style="{ width: `${typeof width === 'number' ? `${width}px` : width}` }"
	>
		<div class="flex">
			<div class="label" v-if="label">{{ label }}</div>
			<div class="placeholder" v-if="placeholder">{{ placeholder }}</div>
		</div>

		<div>

		</div>


	</div>
</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{
	width?: string | number
	label?: string
	placeholder?: string
}>(), {
	width: '200px'
})
</script>
<style scoped lang="scss">
.select {
	height: 40px;
	border-radius: 12px;
	background-color: rgb(244, 244, 245);
	box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
	padding: 8px 12px;
	display: inline-flex;
	align-items: center;

	&.withLabel {
		height: 56px;

	}

	.flex {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.label {
		color: rgb(82, 82, 91);
		font-size: 14px;
	}

	.placeholder {
		color: rgb(113, 113, 122);
		font-size: 12px;
	}
}
</style>
