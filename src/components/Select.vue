<template>
	<div
		:class="['select', { 'withLabel': label }]"
		:style="{ width: `${typeof width === 'number' ? `${width}px` : width}` }"
		ref="baseElement"
		@mousedown="openOptions"
	>
		<div class="textPart">
			<div :class="['label', {'withValue': value}]" v-if="label">{{ label }}</div>
			<div class="value" v-if="value">
				<slot name="selectBox" :selected="options.find(o => o.value === value)">
					{{ options.find(o => o.value === value)?.label || options.find(o => o.value === value)?.value }}
				</slot>

			</div>
			<div class="placeholder" v-if="!value && placeholder">{{ placeholder }}</div>
		</div>

		<svg v-if="isClearable && !!value" @mousedown="clear" class="clearIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
			<path d="M519.656727 472.459636l-160.512-160.488727a36.584727 36.584727 0 1 0-51.712 51.712l160.488728 160.512-160.488728 160.512a36.584727 36.584727 0 1 0 51.712 51.712l160.512-160.512 160.488728 160.512a36.584727 36.584727 0 1 0 51.735272-51.712l-160.512-160.512 160.512-160.512a36.584727 36.584727 0 1 0-51.735272-51.712L519.68 472.436364zM512 1024C229.236364 1024 0 794.763636 0 512S229.236364 0 512 0s512 229.236364 512 512-229.236364 512-512 512z" />
		</svg>

		<svg :class="['icon', { 'active': open }]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
			<path d="M904 332c0-8.189-3.124-16.379-9.372-22.628-12.497-12.496-32.759-12.496-45.256 0L512 646.745 174.628 309.372c-12.497-12.496-32.758-12.496-45.255 0-12.497 12.498-12.497 32.758 0 45.256l360 360c12.497 12.496 32.758 12.496 45.255 0l360-360C900.876 348.379 904 340.189 904 332z" />
		</svg>
	</div>

	<teleport to="body" v-if="!isFirstOpen">
		<div
			class="selectContent"
			v-show="open"
			ref="targetElement"
			:style="{
				width: `${optionWidth ? (typeof optionWidth === 'number' ? `${optionWidth}px` : optionWidth) : (typeof width === 'number' ? `${width}px`: width)}`,
				...location
			} "
		>
			<VisualList v-if="isVisual" :height="listHeight" :per-height="32" :list="options">
				<template #item="{ props }">
					<div
						:class="{ 'active': props.value === value, 'disabled': props.disabled }"
						:data-value="props.value"
						@click="changeValue"
					>
						<div>{{ props.label || props.value }}</div>
						<svg class="rightIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
							<path d="M149.95456 471.77728a30.72 30.72 0 0 1 41.2672-2.00704l2.19136 2.00704 224.4608 224.4608 412.71296-412.73344a30.72 30.72 0 0 1 41.2672-1.98656l2.19136 1.98656a30.72 30.72 0 0 1 1.98656 41.24672l-1.98656 2.19136-434.46272 434.46272a30.72 30.72 0 0 1-41.24672 1.98656l-2.19136-1.98656-246.1696-246.19008a30.72 30.72 0 0 1 0-43.43808z" fill="#131415" />
						</svg>
					</div>
				</template>
			</VisualList>
			<div  v-else class="optionList" :style="{ maxHeight: `${listHeight}px` }">
				<template v-for="(option, index) of options" :key="index">
					<li
						:class="{ 'active': option.value === value, 'disabled': option.disabled }"
						:data-value="option.value"
						@click="changeValue"
					>
						<slot  name="option" :label="option.label" :value="option.value" :img="option.img">
							{{ option.label || option.value }}
						</slot>

						<svg class="rightIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
							<path d="M149.95456 471.77728a30.72 30.72 0 0 1 41.2672-2.00704l2.19136 2.00704 224.4608 224.4608 412.71296-412.73344a30.72 30.72 0 0 1 41.2672-1.98656l2.19136 1.98656a30.72 30.72 0 0 1 1.98656 41.24672l-1.98656 2.19136-434.46272 434.46272a30.72 30.72 0 0 1-41.24672 1.98656l-2.19136-1.98656-246.1696-246.19008a30.72 30.72 0 0 1 0-43.43808z" fill="#131415" />
						</svg>
					</li>
				</template>
			</div>
		</div>
	</teleport>
</template>
<script setup lang="ts">
import {nextTick, ref, watch} from "vue";
import {getPlacement} from "../utils/getPlacement.ts";
import VisualList from "../utils/VisualList.vue";

type SelectOptions = {
	value: string | number
	label: string
	disabled?: boolean
}

const props = withDefaults(defineProps<{
	width?: string | number // select 的宽度
	label?: string
	placeholder?: string
	options: SelectOptions[]
	optionWidth?: string | number // option 的宽度，如果不传，则和 Select 宽度一致
	listHeight?: number
	isClearable?: boolean
	isVisual?: boolean // 是否开启虚拟滚动
}>(), {
	width: '240px',
	listHeight: 256,
	isClearable: false,
	isVIsual: false
})

const slots = defineSlots<{
	option(props: SelectOptions): never
	selectBox(obj: SelectOptions): never
}>()

const value = defineModel<string|number>('value')
const open = ref<boolean>(false)
const isFirstOpen = ref<boolean>(true) // 是否为第一次打开，第一次打开后 dom 保留

const baseElement = ref();
const targetElement = ref();
const location = ref<{ left?: string, top?: string }>({})

const getLocation = () => {
	nextTick(() => {
		if (targetElement.value) {
			location.value = getPlacement(baseElement.value.getBoundingClientRect(), targetElement.value.getBoundingClientRect(), 'bottom-start', 8)
		}
	})
}

const openOptions = () => {
	if (isFirstOpen.value) {
		isFirstOpen.value = false;
	}
	open.value = true;
	document.addEventListener('mousedown', cancelOpen, true)
}
const cancelOpen = (e: Event) => {
	e.stopPropagation();
	if (!targetElement.value.contains(e.target)) {
		open.value = false;
		document.removeEventListener('mousedown', cancelOpen, true);
	}
}

const changeValue = (e: MouseEvent) => {
	console.log(e.currentTarget)
	const { value: optionValue } = (e.currentTarget as HTMLLIElement).dataset
	value.value = optionValue
	open.value = false;
	document.removeEventListener('mousedown', cancelOpen, true);
}

const clear = (e: Event) => {
	// e.preventDefault();
	e.stopPropagation()
	value.value = '';
}

watch(open, getLocation)

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
	justify-content: space-between;
	cursor: pointer;

	&:hover {
		background-color: rgb(228, 228, 231);
	}

	&.withLabel {
		height: 56px;
	}

	.textPart {
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: relative;
		width: 100%;

		.label {
			//position: absolute;
			width: 100%;
			color: rgb(82, 82, 91);
			font-size: 14px;
			transition: transform .2s cubic-bezier(0,0,.2,1);

			&.withValue {
				transform: scale(.85) translateY(-6px);
				margin-bottom: -8px;
				transform-origin: left;
			}
		}

		.value {
			font-size: 14px;
		}

		.placeholder {
			color: rgb(113, 113, 122);
			font-size: 12px;
		}
	}

	.icon {
		width: 14px;
		height: 14px;
		transition: transform .25s ease;

		&.active {
			transform: rotate(180deg);
		}
	}

	.clearIcon {
		width: 16px;
		height: 16px;
		cursor: pointer;
		fill: #888888;
		transition: fill ease .15s;
		margin-right: 6px;

		&:hover {
			fill: #000000;
		}
	}
}

.selectContent {
	position: fixed;
	padding: 8px 4px 8px 6px;
	border-radius: 14px;
	box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.03) 0px 0px 15px 0px, rgba(0, 0, 0, 0.08) 0px 2px 30px 0px, rgba(0, 0, 0, 0.3) 0px 0px 1px 0px;
	background-color: #ffffff;
	z-index: 9999;



	.optionList {
		list-style: none;
		overflow: auto;

		&::-webkit-scrollbar {
			width: 5px;
			height: 5px;
			margin-right: 20px;
			padding-right: 10px;
		}
		&::-webkit-scrollbar-track {
			background-color: rgba(239, 239, 239, 0.5);
			margin-right: 20px;
			padding-right: 10px;
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgb(203, 203, 203);
			border-radius: 4px;
		}
		&::-webkit-scrollbar-corner {
			background-color: rgba(239, 239, 239, 0.5);
		}

		li {
			position: relative;
			//height: 32px;
			padding: 6px 6px 6px 8px;
			border-radius: 8px;
			transition: all .25s ease;
			font-size: 14px;
			cursor: pointer;
			margin-right: 2px;

			&:hover {
				background-color: hsl(240 5% 84%);
			}

			&.active {
				.rightIcon {
					display: inline-block;
				}
			}
			&.disabled {
				opacity: .5;
				pointer-events: none;
			}

			.rightIcon {
				width: 16px;
				height: 16px;
				position: absolute;
				right: 10px;
				top: 0;
				bottom: 0;
				margin: auto;
				display: none;
			}
		}
	}


}
</style>
