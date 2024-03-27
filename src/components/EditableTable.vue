<template>
  <table class="edittableTable">
    <thead>
      <tr>
        <th class="deleteCell"></th>
        <th v-for="(column, index) of columnList" :key="index">{{ column.title }}</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="(data, index) of dataList" :key="index">
      <td class="deleteCell">-</td>
      <td
          v-for="(column, idx) of columnList"
          :key="`${index}_${idx}`"
          @click="startEditing(`${index}_${idx}`)"
          :class="[editing === `${index}_${idx}` ? 'active' : '']"
      >
        <input v-if="editing === `${index}_${idx}`" :value="data[column.value]" />
        <div v-else>{{ data[column.value] }}</div>
      </td>
    </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import {defineProps, ref} from 'vue'

defineProps<{
  columnList: {
    title: string,
    value: string
  }[],
  dataList: {}[],
}>()

const editing = ref('')

const startEditing = (key: string) => {
  editing.value = key
}


</script>
<style scoped class="scss">
.edittableTable {
  border-collapse: collapse;
  //table-layout: fixed;
  width: 600px;
  border-radius: 20px;
  overflow: hidden;

  thead {
    background-color: #f3f3f4;
    color: #65656e;
    height: 30px;
    border-radius: 20px;
  }

  tr {
    border-bottom: 1px solid #f1f1f1;
    height: 30px;
  }

  th, td {
    font-size: 14px;
    text-align: left;
    padding: 2px 6px;
  }

  .deleteCell {
    width: 28px;
    text-align: center;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }

  td {
    &.active {
      background-color: #f8f8f8;
      //outline: 1px solid red;
    }

    input {
      //display: inline-block;
      background-color: transparent;
      width: 100%;
      //height: 100%;
      font-size: 14px;
      padding: 0;
      border: none;
      outline: none;
      box-shadow: none;
    }
  }
}
</style>
