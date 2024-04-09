<template>
	<h2>Select - 选择器</h2>

	<div class="part">
		<div class="tip">有 label 有 placeholder</div>
		<Select
			v-model:value="myHero"
			:label="label"
			:placeholder="placeholder"
			:options="optionList"
			:is-clearable="isClearable"
		>

		</Select>
	</div>

	<div class="part">
		<div class="tip">有 label 无 placeholder</div>
		<Select :label="label" :options="optionList" :width="300" :option-width="200" :is-clearable="isClearable">

		</Select>
	</div>

	<div class="part">
		<div class="tip">无 label 有 placeholder</div>
		<Select :placeholder="placeholder" :width="'100%'" :options="optionList" :is-clearable="isClearable">

		</Select>
	</div>

	<div class="part">
		<div class="tip">无 label 无 placeholder</div>
		<Select :width="200" :options="optionList" :list-height="listHeight" :is-clearable="isClearable">

		</Select>
	</div>



	<div class="prop">
		<div class="title">
			label
			<div class="desc">标题</div>
		</div>
		<div class="flex">
			<input v-model="label" />
		</div>
	</div>
	<div class="prop">
		<div class="title">
			placeholder
			<div class="desc">placeholder</div>
		</div>
		<div class="flex">
			<input v-model="placeholder" />
		</div>
	</div>
	<div class="prop">
		<div class="title">
			listHeight
			<div class="desc">下拉菜单的最大高度</div>
		</div>
		<div class="flex">
			<Slider v-model:value="listHeight" :min-value="1" :max-value="600" :step="1" :width="400" />
		</div>
	</div>
	<div class="prop">
		<div class="title">
			isClearable
			<div class="desc">是否可清除</div>
		</div>
		<div class="flex">
			<Checkbox v-model:check="isClearable">{{ isClearable }}</Checkbox>
		</div>
	</div>

</template>
<script setup lang="ts">
import Select from "../components/Select.vue";
import {ref} from "vue";
import Slider from "../components/Slider.vue";
import Checkbox from "../components/Checkbox.vue";

const myHero = ref<string>('')
const label = ref<string>('选择你的英雄')
const placeholder = ref<string>('choose your hero')
const listHeight = ref<number>(256)
const isClearable = ref<boolean>(false)

const optionList = ref([
	{ value: 'PhantomAssassin', label: '幻影刺客' },
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

	.title {
		font-weight: bold;
		margin-right: 40px;
	}
	.desc {
		font-size: 12px;
		font-weight: normal;
	}
}

</style>
