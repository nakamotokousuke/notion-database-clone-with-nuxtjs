import { prisma } from "~/lib/prisma";
type Note = {
  name: string;
  id: number;
  noteId: number;
  crud: string;
};
export default defineEventHandler(async (event) => {
  const body: Note = await readBody(event);
  console.log(
    "🚀 ~ file: updateNoteTag.ts:10 ~ defineEventHandler ~ body:",
    body
  );
  if (body.crud === "delete") {
    const tags = await prisma.note.update({
      where: { id: body.noteId },
      data: {
        tags: {
          disconnect: [{ id: body.id }],
        },
      },
    });
    return tags;
  } else {
    const tags = await prisma.note.update({
      where: { id: body.noteId },
      data: {
        tags: {
          connect: [{ id: body.id }],
        },
      },
    });
    return tags;
  }
});
