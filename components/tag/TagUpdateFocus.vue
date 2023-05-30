<script setup lang="ts">
import {
  useGetContent,
  useGetNotes,
  useUpdateTagName,
} from "~/lib/hooks/useGetNotes.vue";

type PropsType = {
  tag: {
    name: string;
    id: number;
  };
  noteId: string | number;
};
const props = defineProps<PropsType>();
const updateTagId = useState("updateTagId");
const newTagName = ref(props.tag.name);
const route = useRoute();
const id = ref(props.noteId.toString());
const tagList = useState<string[]>("tagList");
const onChange = () => {
  updateTagId.value = null;
};

onMounted(() => {
  console.log(props.tag.name);
  document.getElementById(props.tag.name)?.focus();
});

const handleUnload = async () => {
  if (newTagName.value === "") return;
  if (newTagName.value === props.tag.name) return;
  const data = useUpdateTagName(props.tag, newTagName.value);
  await useGetContent(id);
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
      @click="onChange"
    ></div>
  </div>
  <div class="relative">
    <input
      :id="id + tag.name"
      v-model="newTagName"
      type="text"
      autofocus="true"
      class="absolute z-30 w-20"
    />
  </div>
</template>
