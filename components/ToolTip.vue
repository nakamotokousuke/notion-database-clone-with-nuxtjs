<script setup lang="ts">
const tag = ref(false);
const onChange = () => {
  tag.value = !tag.value;
};
</script>
<template>
  <div class="relative max-w-max">
    <div v-if="tag" class="z-30 absolute top-full transition-all">
      <slot name="tooltip"></slot>
    </div>
    <div class="cursor-pointer" @click="onChange">
      <slot></slot>
    </div>
  </div>
  <div v-if="tag">
    <div
      class="absolute h-full w-full left-0 top-0 z-10"
      @click="onChange"
    ></div>
  </div>
</template>
