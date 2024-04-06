<template>
	<p><Switch :default-value="switchValue" :is-disable="isDisabled" @change="changeValue"></Switch></p>

	<p><Switch v-model:value="switchValue" :is-disable="isDisabled">withLabel</Switch></p>

	<p>
		<Switch v-model:value="switchValue" :is-disable="isDisabled">
			<template #trueIcon>
				<svg t="1712408369868" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1602" width="48" height="48"><path d="M344.189719 297.542353l-57.889397-57.889397-48.231443 48.232466 57.889397 57.889397L344.189719 297.542353zM254.129654 480.812217l-96.462886 0L157.666768 545.103411l96.462886 0L254.129654 480.812217zM543.518311 162.503932l-64.291194 0 0 93.214915 64.291194 0L543.518311 162.503932zM784.677572 287.885422l-48.231443-48.232466-57.89042 57.889397 45.031568 45.027474L784.677572 287.885422zM678.555709 728.42137l57.89042 57.841302 45.07557-44.982449-57.934423-57.885304L678.555709 728.42137zM768.614751 545.103411l96.464932 0 0-64.291194-96.464932 0L768.614751 545.103411zM511.397785 320.009018c-106.116747 0-192.926795 86.855073-192.926795 192.927818 0 106.113677 86.810048 192.923725 192.926795 192.923725 106.11777 0 192.923725-86.810048 192.923725-192.923725C704.32151 406.864091 617.515555 320.009018 511.397785 320.009018M479.227117 863.459791l64.291194 0 0-93.259941-64.291194 0L479.227117 863.459791zM238.068879 738.030205l48.231443 48.231443 57.889397-57.841302-44.982449-45.027474L238.068879 738.030205z" fill="#231815" p-id="1603"></path></svg>
			</template>
			<template #falseIcon>
				<svg t="1712408618542" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3822" width="48" height="48"><path d="M424.704 124.768c0-23.168-17.376-41.984-38.816-41.984-58.24 0-271.488 176.256-271.488 419.392s182.4 440.384 407.232 440.384c224.928 0 387.936-232.096 387.936-293.632 0-23.104-17.344-41.984-38.816-41.984s-233.792 56.928-366.496-86.56C371.648 376.96 424.736 147.84 424.736 124.736z m0 0" p-id="3823" fill="#2c2c2c"></path></svg>
			</template>
			withIcon
		</Switch>
	</p>

	<p><Switch v-model:value="switchValue2" :is-disable="isDisabled">controlled: {{ switchValue2 }}</Switch></p>

	<div class="prop">
		<div class="title">
			isDisable
			<div class="desc">是否禁用按钮</div>
		</div>
		<div class="flex">
			<Checkbox v-model:check="isDisabled">{{isDisabled}}</Checkbox>
		</div>
	</div>


	<div>重新看下是否受控</div>
</template>
<script setup lang="ts">
import Switch from "../components/Switch.vue";
import {ref} from "vue";
import Checkbox from "../components/Checkbox.vue";

const switchValue = ref<boolean>(true)
const switchValue2 = ref<boolean>(false)
const isDisabled = ref<boolean>(false)

const changeValue = (value: boolean) => {
	console.log(value)
	switchValue.value = value
}
</script>
<style scoped lang="scss">

.prop {
	display: flex;
	border-bottom: 1px solid  #f1f1f1;
	padding: 20px 0;
}
.title {
	font-weight: bold;
	margin-right: 40px;
}

.desc {
	font-size: 12px;
	font-weight: normal;
}

</style>
