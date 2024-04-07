<template>
	<div :class="['switch', { 'disable': isDisable }]" @click="changeValue" @mousedown="startPressing">
		<div class="thumb" :data-value="defaultValue !== undefined ? innerValue : value" :data-test="value === undefined">
			<div class="block" :data-pressing="isPressing">
				<slot name="trueIcon" v-if="defaultValue !== undefined ? innerValue : value"></slot>

				<slot name="falseIcon" v-if="!(defaultValue !== undefined ? innerValue : value)"></slot>
			</div>
		</div>
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import {ref} from "vue";
const props = withDefaults(defineProps<{
	isDisable?: boolean
	defaultValue?: boolean | undefined
}>(), {
	defaultValue: undefined
})

const emits = defineEmits<{
	(e: 'change', value: boolean): void
}>()

defineSlots<{
	default?: never
	trueIcon?: never
	falseIcon?: never
}>()

const value = defineModel<boolean | undefined>('value')

const innerValue = ref<boolean>(!!props.defaultValue)
const isPressing = ref<boolean>(false)

const changeValue = () => {
	if (props.defaultValue !== undefined) {
		innerValue.value = !innerValue.value
		emits('change', innerValue.value)
	} else {
		value.value = !value.value;
		emits('change', value.value)
	}
}

const startPressing = () => {
	isPressing.value = true;
	document.addEventListener('mouseup', cancelPressing)
}

const cancelPressing = () => {
	isPressing.value = false;
	document.removeEventListener('mouseup', cancelPressing);
}


</script>
<style scoped lang="scss">
.switch {
	display: inline-flex;
	align-content: center;
	cursor: pointer;
	user-select: none;

	&.disable {
		opacity: 0.5;
		pointer-events: none;
	}

	.thumb {
		position: relative;
		width: 48px;
		height: 28px;
		background-color: $primaryColor;
		border-radius: 999px;
		padding: 0 4px;
		transition: all 0.25s ease;
		margin-right: 8px;

		.block {
			position: absolute;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			background-color: #ffffff;
			top: 0;
			bottom: 0;
			left: 0;
			margin: auto 0 auto 24px;
			transition: all 0.25s ease;
			display: inline-flex;
			align-item: center;
			justify-content: center;
			padding: 2px;

			:deep(svg),
			:deep(img){
				width: 100%;
				height: 100%;
				object-fit: cover;
			}

			&[data-pressing='true'] {
				width: 23px;
				margin-left: 21px;
			}
		}

		&[data-value="false"] {
			background-color: #cccccc;

			.block {
				margin-left: 4px;
			}
		}
	}
}
</style>
