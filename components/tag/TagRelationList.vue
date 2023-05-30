<script setup lang="ts">
type Tag = {
  id: number;
  name: string;
};
type PropsType = {
  note: {
    id: number;
    tags: Tag[];
  };
};

const updateTagId = useState("updateTagId");
const props = defineProps<PropsType>();
</script>

<template>
  <div class="w-[200px] flex gap-x-2 flex-wrap">
    <div
      v-for="tag in props.note.tags"
      :key="tag.id"
      class="bg-red-300 px-1 rounded-md cursor-pointer select-none"
    >
      <ToolTip v-if="updateTagId !== props.note.id + tag.name">
        <template #tooltip>
          <TagUpdate :tag="tag" :note-id="props.note.id"></TagUpdate>
        </template>
        <div>{{ tag.name }}</div>
        <!-- <div>{{ updateTagId }}</div> -->
      </ToolTip>
      <div v-if="updateTagId === props.note.id + tag.name">
        <TagUpdateFocus :tag="tag" :note-id="props.note.id"></TagUpdateFocus>
      </div>
    </div>
    <ToolTip>
      <template #tooltip>
        <TagAddList
          :id="note.id.toString()"
          :relation-tag="props.note.tags"
        ></TagAddList>
      </template>
      <div class="bg-slate-600 rounded-md px-1">
        <p>追加</p>
      </div>
    </ToolTip>
  </div>
</template>
