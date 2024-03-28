<template>
  <div :class="['nameTag', `people-${people}`]"
       :style="{ color: peopleColor }"
       :data-color="peopleColor"
       @mouseenter="showOther"
       @mouseleave="hideOther"
  >
    <slot />
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref, useSlots} from "vue";
import RandomColor from 'randomcolor';
import { hex2Rgba } from '../utils.ts'

const peopleColor = ref('');
const people: string = useSlots().default?.()[0].children?.toString() || ''; // 当前人物，默认 slot
const otherSame = ref<HTMLDivElement[]>([])

const showOther = () => {
  otherSame.value = document.getElementsByClassName(`people-${people}`) as unknown as HTMLDivElement[];
  for (let i = 0; i < otherSame.value.length; i += 1) {
    otherSame.value[i].style.backgroundColor = hex2Rgba(peopleColor.value, 10)
  }
}

const hideOther = () => {
  for (let i = 0; i < otherSame.value.length; i += 1) {
    otherSame.value[i].style.backgroundColor = 'transparent'
  }
}

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
