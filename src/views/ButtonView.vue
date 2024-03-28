<template>
  <div>
    <h2>Button - 按钮</h2>

    <div class="prop">
      <div class="title">
        variant
        <div class="desc">预设样式</div>
      </div>

      <div class="flex">
        <Button
            v-for="(variant, index) of variantList"
            :key="index"
            :variant="variant"
            :is-disable="isDisabled"
            :is-loading="isLoading"
            :loading-text="loadingText"
        >
          <template #startContent>
            {{ startContent }}
          </template>
          {{ variant }}
          <template #endContent>
            {{ endContent }}
          </template>
        </Button>
      </div>
    </div>

    <div class="prop">
      <div class="title">
        isDisable
        <div class="desc">是否禁用按钮</div>
      </div>
      <div class="flex">
        <input type="checkbox" :value="isDisabled" @input="changeIsDisabled" />
        {{isDisabled}}
      </div>
    </div>

    <div class="prop">
      <div class="title">
        isLoading

      </div>
      <div class="flex">
        <input type="checkbox" :value="isLoading" @input="changeIsLoading" />
        {{isLoading}}
      </div>
      <div class="desc">是否正在加载</div>

    </div>

    <div class="prop">
      <div class="title">
        isLoading
        <div class="desc">是否正在加载</div>
      </div>
      <div class="flex">
        <input type="text" :value="loadingText" placeholder="加载中时的文本" @input="changeLoadingText">
      </div>
    </div>

    <div class="prop">
      <div class="title">
        startContent
        <div class="desc">前缀，可以是文本，也可以是 slot </div>
      </div>
      <div class="flex">
        <input type="text" :value="loadingText" placeholder="前缀" @input="changeStartContent">

        <div>放一个div</div>
        <div>放一个图片</div>
      </div>
    </div>

    <div class="prop">
      <div class="title">
        endContent
        <div class="desc">前缀，可以是文本，也可以是 slot </div>
      </div>
      <div class="flex">
        <input type="text" :value="loadingText" placeholder="后缀" @input="changeEndContent">
        <div>放一个div</div>
        <div>放一个图片</div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import Button from "../components/Button.vue";
import {ref} from "vue";
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

const changeIsDisabled = (e: Event) => isDisabled.value = (e.target as HTMLInputElement).checked;
const changeIsLoading = (e: Event) => isLoading.value = (e.target as HTMLInputElement).checked;
const changeLoadingText = (e: Event) => loadingText.value = (e.target as HTMLInputElement).value;
const changeStartContent = (e: Event) => startContent.value = (e.target as HTMLInputElement).value;
const changeEndContent = (e: Event) => endContent.value = (e.target as HTMLInputElement).value;
</script>
<style scoped class="scss">
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
