<template>
  <div class="nameTag" :style="{ color: peopleColor }">
    {{peopleColor}}
    <slot />
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref, useSlots} from "vue";
import RandomColor from 'randomcolor';

const peopleColor = ref('');
const people: string = useSlots()?.default()[0].children?.toString() || '';

onMounted(() => {
  const colorArr: { name: string, color: string }[] = JSON.parse(localStorage.getItem('nameTagArr') || '[]') || [];
  const currentPeople = colorArr.find(a => a.name === people)
  if (currentPeople) {
    peopleColor.value = currentPeople.color;
  } else {
    const color: string = RandomColor({ luminosity: 'dark' });
    localStorage.setItem('nameTagArr', JSON.stringify([...colorArr, { name: people, color }]))
    peopleColor.value = color
  }
})
</script>
<style scoped lang="scss">
.nameTag {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 1px 6px;
  border-radius: 4px;
  margin: 0 4px;
  transition: background-color .3s;
}
</style>
