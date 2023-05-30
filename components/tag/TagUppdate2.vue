<script setup lang="ts">
import {
  useDeleteTag,
  useGetNotes,
  useGetTags,
} from "~/lib/hooks/useGetNotes.vue";

type PropsType = {
  tag: {
    name: string;
    id: number;
  };
};
const props = defineProps<PropsType>();
const updateTagId2 = useState<null | string>("updateTagId2");
const route = useRoute();
const tagList = useState<string[]>("tagList");
const focusedInputTag = () => {
  updateTagId2.value = props.tag.name;

  document.getElementById(updateTagId2.value)?.focus();
};
const deleteTag = async () => {
  await useDeleteTag(props.tag.id);
  useGetTags();
  if (!route.params.id) {
    useGetNotes(tagList);
  }
};
</script>

<template>
  <div class="bg-slate-500 text-white min-w-max cursor-pointer p-1 rounded-md">
    <div @click="deleteTag">delete</div>
    <div @click="focusedInputTag">name update</div>
  </div>
</template>
