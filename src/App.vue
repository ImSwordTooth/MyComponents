<template>
  <div class="container">
    <div class="componentList">
      <RouterLink to="/button" class="link">按钮</RouterLink>
      <RouterLink to="/nameTag" class="link">多彩标签</RouterLink>
      <RouterLink to="/input" class="link">输入框</RouterLink>
      <RouterLink to="/slider" class="link">滑动输入框</RouterLink>
      <RouterLink to="/checkbox" class="link">复选框</RouterLink>
      <RouterLink to="/popover" class="link">Popover</RouterLink>
      <RouterLink to="/switch" class="link">切换</RouterLink>
      <RouterLink to="/select" class="link">选择器</RouterLink>
    </div>
    <div class="rightPart">
      <RouterView />
    </div>
  </div>

</template>
<script setup lang="ts">
import {reactive, ref} from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import EditableTable from "./components/EditableTable.vue";

const editTableTableData = ref({
  columnList: [
    { title: '剧名', value: 'name' },
    { title: '导演', value: 'directory' },
    { title: '演员', value: 'stars' },
    { title: '备注', value: 'mark' }
  ],
  dataList: [
    {
      name: '西游记',
      directory: '杨洁',
      stars: '六小龄童、徐少华、迟重瑞、汪粤、马德华、闫怀礼',
      mark: '经典'
    },
    {
      name: '红楼梦',
      directory: '王扶林',
      stars: '陈晓旭、欧阳奋、张莉、邓婕、高宏亮、郭霄',
      mark: '经典'
    },
    {
      name: '甄嬛传',
      directory: '郑晓龙',
      stars: '孙俪、陈建斌、蔡少芬、李东学'
    }
  ]
})
</script>
<style scoped lang="scss">
.container {
  display: flex;

  .componentList {
    width: 300px;
    flex-shrink: 0;
    padding-top: 100px;
    list-style: none;

    .link {
      display: block;
      padding: 6px 20px;
      color: #4d4d4d;

      &:hover {
        background-color: #f8f8f8;
      }

      &::before {
        content: '•';
        color: #808080;
        margin-right: 8px;
      }
    }
  }

  .rightPart {
    flex: 1;
  }
}
</style>
