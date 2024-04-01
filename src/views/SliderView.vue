<template>
  <div>
    <h2>Slider - 滑动输入框</h2>

    <div class="width400">
      <div style="margin-bottom: 20px">我是一个宽度为 400px 的 div</div>

      <Slider :max-value="100" :min-value="0" :step="1">
        <template #label>
          <h3>我是一个 h3</h3>
        </template>
      </Slider>
      <Slider :max-value="10" :min-value="0" :step="1" label="Price" :value-format="(value: string) => `$${value}`"></Slider>
      <Slider :max-value="200" :min-value="0" :step="1" label="有label没value" :value-format="false"></Slider>
      <Slider :max-value="1" :min-value="0" :step="0.1"></Slider>

    </div>

    <div>
      带有 step，并且要对结果保留小数时，可能会有数据偏移，导致鼠标位置偏了点
    </div>
  </div>

</template>
<script setup lang="ts">
import Slider from "../components/Slider.vue";
import {onMounted, ref} from "vue";
// import {  } from '@types/html'
const variantList = [
  'solid',
  'flat',
  'bordered',
  'ghost',
  'light',
  'shadow'
]
const isDisabled = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const loadingText = ref<string>('')
const startContent = ref<string | HTMLElement>('')
const endContent = ref<string | HTMLElement>()

onMounted(() => {

})

const changeIsDisabled = (e: Event) => isDisabled.value = (e.target as HTMLInputElement).checked;
const changeIsLoading = (e: Event) => isLoading.value = (e.target as HTMLInputElement).checked;
const changeLoadingText = (e: Event) => loadingText.value = (e.target as HTMLInputElement).value;
const changeStartContent = (e: Event) => startContent.value = (e.target as HTMLInputElement).value;
const changeEndContent = (e: Event) => endContent.value = (e.target as HTMLInputElement).value;
</script>
<style scoped class="scss">
.width400 {
  width: 400px;
  color: hsl(240 5% 65%);
  font-size: 12px;
  border: 1px solid #f1f1f1;
  padding: 12px;
  border-radius: 8px;
}
.flex {
  display: flex;
  align-items: center;
  margin: 4px 0;

  button {
    margin: 0 12px;
  }
}

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
