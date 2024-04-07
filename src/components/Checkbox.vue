<template>
	<div
		:class="{ 'boxWp': true, 'isPressing': isPressing, 'isDisable': isDisable, 'isReadOnly': isReadOnly }"
		@mousedown="startPressing"
		@click="toggleIsChecked"
	>
		<div class="box">
			<div
				:class="['checkedbox', { 'init': isInit }, (defaultChecked !== undefined ? innerChecked : isChecked) ? 'enter' : 'leave']">
				<slot name="icon">
					<svg aria-hidden="true" role="presentation" viewBox="0 0 17 18" class="z-10 opacity-0 group-data-[selected=true]:opacity-100 w-4 h-3 transition-opacity motion-reduce:transition-none">
						<polyline fill="none" points="1 9 7 14 15 4" stroke="currentColor" stroke-dasharray="22" stroke-dashoffset="44" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="transition: stroke-dashoffset 250ms linear 0.2s;"></polyline>
					</svg>
				</slot>
				<div class="svgMask" v-if="!slots.icon"/>
			</div>
		</div>
		<div class="labelContent">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import {ref, watch} from 'vue'

const props = withDefaults(defineProps<{
	isDisable?: boolean // 是否禁用
	isReadOnly?: boolean // 是否只读
	defaultChecked?: boolean | undefined // 默认 value，非受控
}>(), {
	defaultChecked: undefined
});

const isChecked = defineModel<boolean | undefined>('check', { })

const slots = defineSlots<{
	default: never,
	icon: never
}>();

const emits = defineEmits<{
	(e: 'change', checked: boolean): void
}>()

const innerChecked = ref<boolean>(!!props.defaultChecked) // 内部的 value，如果没有受控的值
const isPressing = ref<boolean>(false); // 是否被按下
const isInit = ref<boolean>(true) // 是否初次显示，初次显示时不需要动画效果

const startPressing = () => { // 开始按下
	isPressing.value = true;

	const cancelPressing = () => {
		isPressing.value = false;
		document.removeEventListener('mouseup', cancelPressing);
	}
	document.addEventListener('mouseup', cancelPressing); // 抬起效果要加在 document 上
}

const toggleIsChecked = (): void => {
	if (props.defaultChecked !== undefined) {
		innerChecked.value = !innerChecked.value
		emits('change', innerChecked.value)
	} else {
		isChecked.value = !isChecked.value;
		emits('change', isChecked.value)
	}
}

watch(() => (props.defaultChecked !== undefined ? innerChecked : isChecked), () => {
	isInit.value = false;
}, {
	once: true,
	deep: true
})
</script>
<style scoped lang="scss">
.boxWp {
	display: flex;
	align-items: center;
	cursor: pointer;
	user-select: none;

	&.isDisable {
		opacity: .5;
		pointer-events: none;
	}

	&.isReadOnly {
		pointer-events: none;
	}

	&:hover {
		.box {
			background-color: hsl(240 5% 96%);
		}
	}

	&.isPressing {
		.box {
			transform: matrix(0.95, 0, 0, 0.95, 0, 0);
		}
	}

	.box {
		width: 20px;
		height: 20px;
		border: 2px solid hsl(240 5% 84%);
		border-radius: 8px;
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, transform;
		transition-timing-function: ease;
		transition-duration: .25s;
		position: relative;
		margin-right: 8px;

		.checkedbox {
			position: absolute;
			width: 100%;
			height: 100%;
			left: -2px;
			top: -2px;
			border: 2px solid $primaryColor;
			border-radius: 8px;
			background-color: $primaryColor;
			color: #ffffff;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			box-sizing: content-box;


			&.enter {
				animation: smallToBig ease .3s forwards;

				.svgMask {
					animation: toLeft ease .5s forwards .2s;
				}
			}

			&.leave {
				opacity: 0;
				animation: BigToSmall ease .3s forwards;
			}

			&.init {
				animation: none;

				.svgMask {
					display: none;
				}
			}

			svg {
				width: 16px;
				height: 12px;
			}

			:deep(img) {
				width: 100%;
				height: 100%;
			}

			.svgMask {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: $primaryColor;
			}
		}
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

@keyframes BigToSmall {
	0% {
		transform: scale(1);
		opacity: 1;
	}
	100% {
		transform: scale(0.5);
		opacity: 0;
	}
}

@keyframes toLeft {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(100%);
	}
}
</style>
