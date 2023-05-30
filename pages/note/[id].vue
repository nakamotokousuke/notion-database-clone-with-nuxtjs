<script setup lang="ts">
import { useGetContent, useGetNotes } from "~/lib/hooks/useGetNotes.vue";

const route = useRoute();
const id = ref(route.params.id.toString());
const { data } = await useGetContent(id);
const content = ref(data.value?.content?.toString());
const title = ref(data.value?.title?.toString());
const updateTagId = useState<null | string>("updateTagId", () => null);
const handleUnload = async () => {
  if (
    data.value?.content === content.value &&
    data.value?.title === title.value
  )
    return;
  console.log("ページがリロードされました");
  // リロードが検知された後の処理をここに記述する
  const res = await useFetch("/api/updateNote", {
    body: { content, title },
    params: id,
    method: "POST",
  });
  console.log("🚀 ~ file: [id].vue:28 ~ handleUnload ~ res:", res);
};

onUnmounted(() => {
  handleUnload();
  useGetNotes(ref([]));
  if (typeof window !== "undefined") {
    window.removeEventListener("beforeunload", handleUnload);
  }
});

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", handleUnload);
}
</script>

<template>
  <div class="h-screen bg-slate-900 p-4">
    <div
      class="min-w-[650px] sm:max-w-[1200px] bg-slate-800 h-full m-auto rounded-md flex flex-col select-none"
    >
      <textarea
        v-model="title"
        class="w-full h-auto outline-none bg-red-300 text-5xl p-1"
        spellcheck="false"
      ></textarea>
      <div class="flex bg-gray-100 gap-2 p-1">
        <div
          v-for="tag in data?.tags"
          :key="tag.id"
          class="bg-gray-300 px-[3px] py-[1px] rounded-md cursor-pointer select-none"
        >
          <ToolTip v-if="updateTagId !== id + tag.name">
            <template #tooltip>
              <TagUpdate :tag="tag" :note-id="id"></TagUpdate>
            </template>
            <div>{{ tag.name }}</div>
          </ToolTip>
          <div v-if="updateTagId === id + tag.name">
            <TagUpdateFocus :tag="tag" :note-id="id"></TagUpdateFocus>
          </div>
        </div>
        <ToolTip>
          <template #tooltip>
            <TagAddList :id="id" :relation-tag="data?.tags"></TagAddList>
          </template>
          <div class="bg-slate-600 px-3 rounded-full">新規追加</div>
        </ToolTip>
      </div>
      <textarea
        v-model="content"
        class="w-full h-full outline-none p-3"
        spellcheck="false"
      ></textarea>
    </div>
  </div>
</template>
