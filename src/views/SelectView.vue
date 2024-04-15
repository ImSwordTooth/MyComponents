<template>
	<h2>Select - 选择器</h2>

	<div class="part">
		<div class="tip">普通 Select</div>
		<Select
			v-model:value="myHero"
			:options="optionList"
			:label="label"
			:placeholder="placeholder"
			:is-clearable="isClearable"
			:list-height="listHeight"
			:width="width"
			:option-width="isUseOptionWidth ? optionWidth : undefined"
		>
		</Select>
	</div>

	<div class="part">
		<div class="tip">自定义 options 渲染</div>
		<Select
			v-model:value="myHero"
			:options="optionList"
			:label="label"
			:placeholder="placeholder"
			:is-clearable="isClearable"
			:list-height="listHeight"
			:width="width"
			:option-width="isUseOptionWidth ? optionWidth : undefined"
		>
			<template #option="slotProps">
				<div class="customOption">
					<img :src="slotProps.img || 'https://x0.ifengimg.com/ucms/2022_18/0F3C1676F1F0FE2BCE928BF565DE65326A6CA8AC_size231_w440_h434.png'" alt="" />

					<div class="info">
						{{ slotProps.label }}
						<div class="desc">
							{{ slotProps.value }}
						</div>
					</div>
				</div>
			</template>
			<template #selectBox="slotProps">
				<div class="customOption">
					<img :src="slotProps.selected.img || 'https://x0.ifengimg.com/ucms/2022_18/0F3C1676F1F0FE2BCE928BF565DE65326A6CA8AC_size231_w440_h434.png'" alt="" />

					{{ slotProps.selected.label }}
				</div>
			</template>
		</Select>
	</div>

	<div class="part">
		<div class="tip">使用了虚拟列表</div>
		<Select :options="visualOptionList" label="虚拟列表" :is-visual="true">
			<template #option="{ value }">
				<div style="font-family: monospace">{{ value }}</div>
			</template>
		</Select>
	</div>

	<div class="part">
		<div class="tip">多选</div>
		<Select
			v-model:value="myHeros"
			:options="optionList"
			:label="label"
			:placeholder="placeholder"
			:is-clearable="isClearable"
			:list-height="listHeight"
			:width="400"
			:option-width="isUseOptionWidth ? optionWidth : undefined"
			:is-multi="true"
		>
			<template #multiRender="slotProps">
				<div class="multiTag">{{ slotProps.option?.label }}</div>
			</template>
		</Select>
	</div>

	<div class="prop">
		<div class="title">label<div class="desc">标题</div></div>
		<div class="flex">
			<Input label="标题" v-model:value="label" is-clearable />
		</div>
	</div>
	<div class="prop">
		<div class="title">placeholder</div>
		<div class="flex">
			<Input label="placeholder" v-model:value="placeholder" is-clearable />
		</div>
	</div>
	<div class="prop">
		<div class="title">isClearable<div class="desc">是否可清除</div></div>
		<div class="flex">
			<Checkbox v-model:check="isClearable">{{ isClearable }}</Checkbox>
		</div>
	</div>
	<div class="prop">
		<div class="title">width<div class="desc">Select 宽度</div></div>
		<div class="flex">
			<Slider v-model:value="width" :min-value="1" :max-value="1000" :step="1" :width="400" />
		</div>
	</div>
	<div class="prop">
		<div class="title">optionWidth<div class="desc">option 宽度，不传则和 width 同宽</div></div>
		<div class="flex">
			<Checkbox v-model:check="isUseOptionWidth">是否使用 optionWidth</Checkbox>
			<Slider v-model:value="optionWidth" :min-value="1" :max-value="1000" :step="1" :width="400" :is-disabled="!isUseOptionWidth" />
		</div>
	</div>
	<div class="prop">
		<div class="title">listHeight<div class="desc">下拉菜单的最大高度</div></div>
		<div class="flex">
			<Slider v-model:value="listHeight" :min-value="1" :max-value="1000" :step="1" :width="400" />
		</div>
	</div>
</template>
<script setup lang="ts">
import Select from "../components/Select.vue";
import {onMounted, ref} from "vue";
import Slider from "../components/Slider.vue";
import Checkbox from "../components/Checkbox.vue";
import Input from "../components/Input.vue";

const myHero = ref<string>('')
const myHeros = ref<string[]>([])
const label = ref<string>('选择你的英雄')
const placeholder = ref<string>('choose your hero')
const isClearable = ref<boolean>(false)
const listHeight = ref<number>(256)
const width = ref<number>(240)
const isUseOptionWidth = ref<boolean>(true)
const optionWidth = ref<number>(200)

const optionList = ref([
	{ value: 'PhantomAssassin', label: '幻影刺客', img: 'https://img2.baidu.com/it/u=3966599238,416582002&fm=253&fmt=auto&app=120&f=JPEG?w=801&h=500' },
	{ value: 'Luna', label: '露娜' },
	{ value: 'Anti-Mage', label: '敌法师' },
	{ value: 'Juggernaut', label: '主宰' },
	{ value: 'Mirana', label: '米拉娜' },
	{ value: 'Morphling', label: '水人', disabled: true },
	{ value: 'Phantom Lancer', label: '幻影长矛手' },
	{ value: 'Vengeful Spirit', label: '复仇之魂'},
	{ value: 'Doom', label: '末日使者'},
	{ value: 'Omniknight', label: '全能骑士'},
	{ value: 'Drow Ranger', label: '卓尔游侠'},
	{ value: 'Viper', label: '冥界亚龙'},
	{ value: 'Lich', label: '巫妖'},
])

const visualOptionList = ref([])

onMounted(() => {
	for (let i=0; i<10000; i++) {
		visualOptionList.value.push({ value: `第${i+1}条：${Math.floor(Math.random() * 10000)}` })
	}
})

</script>

<style scoped lang="scss">
.part {
	display: flex;
	align-items: center;
	margin: 20px 0;

	.tip {
		font-size: 12px;
		margin-right: 20px;
		flex-shrink: 0;
	}
}

.prop {
	display: flex;
	border-bottom: 1px solid  #f1f1f1;
	padding: 20px 0;
	align-items: center;

	.title {
		font-weight: bold;
		margin-right: 40px;
		width: 200px;
	}
	.desc {
		font-size: 12px;
		font-weight: normal;
	}
}

.customOption {
	position: relative;
	display: flex;
	align-items: center;
	height: 36px;

	img {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		margin-right: 10px;

	}

	.info {
		padding: 4px 0;
		.desc {
			font-size: 12px;
			line-height: 14px;
			color: #999999;
		}
	}
}

.multiTag {
	display: inline-flex;
	padding: 2px 8px;
	background-color: rgba(175, 175, 175, 0.25);
	border-radius: 12px;
	margin: 4px 8px 0 0;
}

</style>
