<script setup lang="ts">
import { useGetContent, useGetNotes } from "~/lib/hooks/useGetNotes.vue";

type Tag = {
  name: string;
  id: number;
};
type PropsType = {
  relationTag: Tag[] | undefined;
  id: string;
};
const props = defineProps<PropsType>();
const route = useRoute();
// const id = ref(route.params.id.toString());
const id = ref(props.id);
const search = ref<string>("");
const { data: tags, refresh } = useFetch("/api/getTag", { immediate: false });
const tagList = useState<string[]>("tagList");
const onAddTag = (tag: Tag) => {
  search.value = tag.name;
};

const addNewTag = async () => {
  const data = props.relationTag?.find((tag: { name: string }) => {
    return tag.name === search.value;
  });
  if (data !== undefined) return;

  const check = tags.value?.find((tag: { id: number; name: string }) => {
    return tag.name === search.value;
  });
  if (check === undefined) {
    console.log("タグを作ってから追加");
    await useFetch("/api/createAndAddTag", {
      body: { name: search.value, noteId: id },
      method: "POST",
    });
    useGetContent(id);
  } else {
    console.log("タグを追加", check.id);
    await useFetch("/api/updateAddTag", {
      body: { id: check.id, noteId: id },
      method: "POST",
    });
    useGetContent(id);
  }
  if (!route.params.id) {
    useGetNotes(tagList);
  }
};

onMounted(() => {
  refresh();
});
</script>

<template>
  <ul class="w-[200px] p-2 rounded-md text-white bg-black">
    <div class="flex flex-wrap bg-slate-300 text-black">
      <input
        v-model="search"
        type="text"
        class="bg-slate-300 outline-none w-[100px] flex-1 select-none"
        spellcheck="false"
      />
      <button @click="addNewTag">追加</button>
    </div>
    <div>
      <div
        v-for="tag in tags?.filter((tag) => {
          return tag.name.match(search);
        })"
        :key="tag.id"
        @click="onAddTag(tag)"
      >
        {{ tag.name }}
      </div>
    </div>
  </ul>
</template>
