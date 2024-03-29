<template>
  <h2>Input - 输入框</h2>

    <div class="prop">
      <div class="title">variant</div>
      <div class="column">
        <div class="columnTitle">flat（默认）</div>
        <div class="singleInput"><Input :label="label" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
        <div class="singleInput"><Input :label="label" :placeholder="'something'" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
        <div class="singleInput"><Input :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
      </div>

      <div class="column">
        <div class="columnTitle">bordered</div>
        <div class="singleInput"><Input :label="label" variant="bordered" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
        <div class="singleInput"><Input :label="label" variant="bordered" :placeholder="'something'" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
        <div class="singleInput"><Input variant="bordered" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
      </div>

      <div class="column">
        <div class="columnTitle">faded</div>
        <div class="singleInput"><Input :label="label" variant="faded" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
        <div class="singleInput"><Input :label="label" variant="faded" :placeholder="'something'" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
        <div class="singleInput"><Input variant="faded" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
      </div>

      <div class="column">
        <div class="columnTitle">underlined</div>
        <div class="singleInput"><Input :label="label" variant="underlined" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
        <div class="singleInput"><Input :label="label" variant="underlined" :placeholder="'something'" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
        <div class="singleInput"><Input variant="underlined" :is-disable="isDisable" :is-clearable="isClearable" :description="description" /></div>
      </div>
    </div>







  <div class="prop">
    <div class="title">
      isDisable
      <div class="desc">是否禁用按钮</div>
    </div>
    <div class="flex">
      <input type="checkbox" :value="isDisable" @input="changeDisable" />
    </div>
  </div>

  <div class="prop">
    <div class="title">
      isDisable
      <div class="desc">是否可清除内容</div>
    </div>
    <div class="flex">
      <input type="checkbox" :value="isClearable" @input="changeClearable" />
    </div>
  </div>

  <div class="prop">
    <div class="title">
      description
      <div class="desc">描述</div>
    </div>
    <div class="flex">
      <input type="text" :value="description" @input="changeDescription" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Input from "../components/Input.vue";

const label = ref<string>('name')
const description = ref<string>('')
const isDisable = ref<boolean>(false)
const isClearable = ref<boolean>(false)

const changeDisable = (e: Event) => {
  isDisable.value = (e.target as HTMLInputElement).checked
}
const changeClearable = (e: Event) => {
  isClearable.value = (e.target as HTMLInputElement).checked
}
const changeDescription = (e: Event) => {
  description.value = (e.target as HTMLInputElement).value
}
</script>
<style scoped>
.singleInput {
  margin-bottom: 20px;
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

.column {
  margin: 0 20px 20px 0;

  .columnTitle {
    font-size: 12px;
    margin-bottom: 40px;
    margin-left: 4px;
  }
}
</style>
