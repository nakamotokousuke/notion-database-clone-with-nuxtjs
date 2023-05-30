<script lang="ts">
export async function useGetNotes(tagList: globalThis.Ref<string[]>) {
  const { data: notes } = await useFetch("/api/getNote", {
    method: "POST",
    body: tagList.value,
  });
  return notes;
}
export async function useGetTags() {
  const { data: tags } = await useFetch("/api/getTag", {
    method: "GET",
  });
  return tags;
}
export async function useGetContent(id: globalThis.Ref<string>) {
  const { data, refresh } = await useFetch("/api/getContent", {
    params: id,
  });
  return { data, refresh };
}

export async function useUpdateTag(
  noteId: number,
  tag: { name: string; id: number },
  crud: string
) {
  const { data } = await useFetch("/api/updateNoteTag", {
    body: { name: tag.name, id: tag.id, noteId, crud },
    method: "POST",
  });
  return data;
}

export async function useUpdateTagName(
  tag: { name: string; id: number },
  newTagName: string
) {
  const data = await useFetch("/api/updateTagName", {
    body: { name: newTagName, id: tag.id },
    method: "POST",
  });
  return data;
}

export async function useDeleteNote(noteId: number) {
  const data = await useFetch("/api/deleteNote", {
    body: { id: noteId },
    method: "POST",
  });
  return data;
}

export async function useDeleteTag(tagId: number) {
  const data = await useFetch("/api/deleteTag", {
    body: { id: tagId },
    method: "POST",
  });
  return data;
}
</script>
