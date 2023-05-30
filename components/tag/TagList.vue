<script setup lang="ts">
import { tagDel } from "~/lib/function";
import { useGetTags } from "~/lib/hooks/useGetNotes.vue";

const tagList = useState<string[]>("tagList");
let array: string[] = tagList.value;
const search = ref("");
const updateTagId2 = useState("updateTagId2", (): null | string => null);

// const {
//   data: tags,
//   pending,
//   refresh,
// } = useFetch("/api/getTag", { immediate: false });

// onMounted(async () => {
//   await refresh();
// });

const tags = await useGetTags();

const onClickTag = (tag: string) => {
  // console.log(array);
  // 選択したタグが重複しないようにする関数
  array = tagList.value;
  array.push(tag);
  const depArray = [...new Set(array)];
  tagList.value = depArray;
  // console.log(depArray);
};
</script>

<template>
  <ul class="w-[300px] p-2 rounded-md text-white bg-black">
    <div class="flex flex-wrap bg-slate-300 text-black">
      <div
        v-for="(tag, index) in tagList"
        :key="tag"
        class="flex bg-slate-400 mr-1 px-1 rounded-md"
      >
        <div>{{ tag }}</div>
        <div
          class="bg-slate-500 rounded-full cursor-pointer ml-1"
          @click="tagDel(index, tagList)"
        >
          X
        </div>
      </div>
      <input
        v-model="search"
        type="text"
        class="bg-slate-300 outline-none w-[100px]"
      />
    </div>
    <div
      v-for="tag in tags?.filter((tag) => {
        return tag.name.match(search);
      })"
      :key="tag.id"
      class="flex"
    >
      <div
        v-if="updateTagId2 !== tag.name"
        class="flex-1 cursor-pointer"
        @click="onClickTag(tag.name)"
      >
        {{ tag.name }}
      </div>
      <TagUpdateFocus2
        v-if="updateTagId2 === tag.name"
        :tag="tag"
      ></TagUpdateFocus2>
      <div v-if="updateTagId2 !== tag.name">
        <ToolTip>
          <template #tooltip>
            <TagUppdate2 :tag="tag"></TagUppdate2>
          </template>
          <div class="select-none">a</div>
        </ToolTip>
      </div>
    </div>
  </ul>
</template>
