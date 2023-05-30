<script setup lang="ts">
import {
  useGetContent,
  useGetNotes,
  useUpdateTag,
} from "~/lib/hooks/useGetNotes.vue";
type PropsType = {
  tag: {
    name: string;
    id: number;
  };
  noteId: string | number;
};
const props = defineProps<PropsType>();
const tagList = useState<string[]>("tagList");
const route = useRoute();
const id = ref(props.noteId.toString());
const updateTagId = useState<null | string>("updateTagId");
const tagUpdate = async (tag: { id: number; name: string }, crud: string) => {
  const data = await useUpdateTag(Number(props.noteId), tag, crud);
  console.log("🚀 ~ file: TagUpdate.vue:15 ~ tagUpdate ~ data:", data);
  await useGetContent(id);
  if (!route.params.id) {
    useGetNotes(tagList);
  }
};
const focusedInputTag = () => {
  updateTagId.value = id.value + props.tag.name;
  console.log(id.value);

  document.getElementById(updateTagId.value)?.focus();
};
</script>

<template>
  <div class="bg-slate-400 text-white min-w-max">
    <div class="text-red-500" @click="tagUpdate(props.tag, 'delete')">
      delete
    </div>
    <div @click="focusedInputTag">name update</div>
  </div>
</template>
