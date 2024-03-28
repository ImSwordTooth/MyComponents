<template>
  <h2>Input - 输入框</h2>
  <div class="singleInput"><Input :label="label" /></div>
  <div class="singleInput"><Input :label="label" :placeholder="'something'" /></div>
  <div class="singleInput"><Input /></div>




  <div class="prop">
    <div class="title">
      isDisable
      <div class="desc">是否禁用按钮</div>
    </div>
    <div class="flex">
      <input type="text" :value="label" @input="changeLabel" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Input from "../components/Input.vue";

const label = ref('name')

const changeLabel = (e) => {
  label.value = e.target.value
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
</style>
