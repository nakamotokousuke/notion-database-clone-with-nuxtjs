import { prisma } from "~/lib/prisma";
type BodyType = {
  name: string;
  noteId: number;
};
export default defineEventHandler(async (event) => {
  const body: BodyType = await readBody(event);

  const note = await prisma.tag.create({
    data: {
      name: body.name,
      notes: {
        connect: { id: Number(body.noteId) },
      },
    },
  });
  return note;
});
