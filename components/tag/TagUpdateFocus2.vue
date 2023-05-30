<script setup lang="ts">
import { useGetNotes, useUpdateTagName } from "~/lib/hooks/useGetNotes.vue";

type PropsType = {
  tag: {
    name: string;
    id: number;
  };
};
const props = defineProps<PropsType>();
const updateTagId2 = useState("updateTagId2");
const newTagName = ref(props.tag.name);
const route = useRoute();
const tagList = useState<string[]>("tagList");
const tagValueReset = () => {
  updateTagId2.value = null;
};

onMounted(() => {
  console.log(props.tag.name);
  document.getElementById(props.tag.name)?.focus();
});

const handleUnload = () => {
  tagValueReset();
  if (newTagName.value === "") return;
  if (newTagName.value === props.tag.name) return;
  const data = useUpdateTagName(props.tag, newTagName.value);
  //   await useGetContent(id);
  console.log(data);
  if (!route.params.id) {
    useGetNotes(tagList);
  }
};

onUnmounted(() => {
  handleUnload();
  if (typeof window !== "undefined") {
    window.removeEventListener("beforeunload", handleUnload);
  }
});

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", handleUnload);
}
</script>

<template>
  <div>
    <div
      class="absolute h-full w-full left-0 top-0 z-0"
      @click="tagValueReset"
    ></div>
  </div>
  <div class="text-black">
    <input :id="tag.name" v-model="newTagName" type="text" autofocus="true" />
  </div>
</template>
