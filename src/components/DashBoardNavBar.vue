<script setup lang="ts">
interface Item {
  label: string
  icon?: string
  to?: string
  items?: Item[]
}
</script>

<template>
  <div>
    <Menubar :model="[]">
      <template #start>
        <i class="pi pi-angle-left" />
      </template>
      <template #end>
        <div flex gap-2>
          <div>
            <Button class="p-button-sm p-button-text">预览</Button>
          </div>
          <div>
            <Button class="p-button-sm p-button-secondary p-button-raised"
              >导出图片</Button
            >
          </div>
          <div>
            <Button class="p-button-sm p-button-raised">保存</Button>
          </div>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<style scoped></style>
