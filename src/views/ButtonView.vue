<template>
  <div>
    <div>
      <div>variant</div>
      <div class="flex">
        <Button>solid</Button>
        <Button variant="flat">flat 按钮</Button>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">

import Button from "../components/Button.vue";
</script>
<style scoped class="scss">
.flex {
  display: flex;
  align-items: center;

  button {
    margin: 0 12px;
  }
}
</style>
