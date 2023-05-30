<script setup lang="ts">
import { tagDel } from "~/lib/function";
import { useGetNotes } from "~/lib/hooks/useGetNotes.vue";

// const router = useRouter();
const tagList = useState<string[]>("tagList", () => []);

let notes = await useGetNotes(tagList);
console.log("🚀 ~ file: index.vue:9 ~ notes:", notes);

const createNote = async () => {
  await useFetch("/api/createNote");
  useGetNotes(tagList);
};

watch(
  tagList,
  async () => {
    notes = await useGetNotes(tagList);
  },
  {
    deep: true,
  }
);
</script>

<template>
  <div class="h-screen bg-slate-900 p-4">
    <div class="max-w-max bg-slate-800 h-full m-auto rounded-md p-4">
      <div class="flex">
        <ToolTip>
          <template #tooltip>
            <TagList></TagList>
          </template>
          <div class="bg-slate-600 max-w-min px-3 rounded-full">tag</div>
        </ToolTip>
        <div
          v-for="(tag, index) in tagList"
          :key="tag"
          class="flex bg-slate-400"
        >
          <div>{{ tag }}</div>
          <div @click="tagDel(index, tagList)">X</div>
        </div>
      </div>
      <div class="cursor-pointer" @click="createNote">新規作成</div>
      <div class="p-3 bg-slate-400 rounded-md divide-y max-w-max">
        <div class="flex gap-x-2 min-w-[612px]">
          <div class="flex">
            <div class="cursor-pointer w-[200px]">title</div>
          </div>
          <div>
            <div class="w-[200px] flex">
              <div>tag</div>
            </div>
          </div>
          <div>last update time</div>
        </div>
        <div v-for="note in notes" :key="note.id" class="flex gap-x-2 py-1">
          <NoteList :note="note"></NoteList>
        </div>
      </div>
    </div>
  </div>
</template>
