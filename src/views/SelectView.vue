<template>
	<h2>Select - 选择器</h2>

	<div class="part">
		<Select
			v-model:value="myHero"
			:label="'选择你的英雄'"
			:placeholder="'choose your hero'"
			:options="optionList"
		>

		</Select>
	</div>

	<div class="part">
		<Select :label="'选择你的英雄'" :options="optionListWithLabel" :width="300" :option-width="200">

		</Select>
	</div>

	<div class="part">
		<Select :width="200" :options="optionListWithLabel">

		</Select>
	</div>

	<div class="part">
		<Select :placeholder="'测试备注'" :width="'100%'" :options="optionListWithLabel">

		</Select>
	</div>

</template>
<script setup lang="ts">
import Select from "../components/Select.vue";
import {ref} from "vue";

const myHero = ref<string>('')

const optionList = ref([
	'PhantomAssassin',
	'Luna Moonfang',
	'Anti-Mage',
	'Juggernaut',
	'Mirana',
	'Morphling',
	'Phantom Lancer', // houzi
	'Vengeful Spirit'
])

const optionListWithLabel = ref([
	{ value: 'PhantomAssassin', label: '幻影刺客' },
	{ value: 'Luna Moonfang', label: '露娜' },
	{ value: 'Anti-Mage', label: '敌法师' },
	{ value: 'Juggernaut', label: '主宰' },
	{ value: 'Mirana', label: '米拉娜' },
	{ value: 'Morphling', label: '水人' },
	{ value: 'Phantom Lancer', label: '幻影长矛手' },
	{ value: 'Vengeful Spirit', label: '复仇之魂'}
])
</script>

<style scoped lang="scss">
.part {
	margin: 20px 0;
}
</style>
