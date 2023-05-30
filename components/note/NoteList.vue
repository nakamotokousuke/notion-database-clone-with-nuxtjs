<script setup lang="ts">
import { useDeleteNote, useGetNotes } from "~/lib/hooks/useGetNotes.vue";

type Tag = {
  id: number;
  name: string;
};
type PropsType = {
  note: {
    id: number;
    title: string;
    lastUpdated: string;
    tags: Tag[];
  };
};

const tagList = useState<string[]>("tagList", () => []);
const router = useRouter();
const props = defineProps<PropsType>();
const deleteNote = async (id: number) => {
  await useDeleteNote(id);
  await useGetNotes(tagList);
};
</script>
<template>
  <div class="flex">
    <div
      class="cursor-pointer w-[200px]"
      @click="router.push(`note/${props.note.id}`)"
    >
      {{ props.note.title }}
    </div>
  </div>
  <div>
    <TagRelationList :note="props.note"></TagRelationList>
  </div>
  <div class="whitespace-nowrap overflow-hidden">
    {{ props.note.lastUpdated }}
  </div>
  <div
    class="text-red-700 whitespace-nowrap cursor-pointer"
    @click="deleteNote(props.note.id)"
  >
    削除
  </div>
</template>
