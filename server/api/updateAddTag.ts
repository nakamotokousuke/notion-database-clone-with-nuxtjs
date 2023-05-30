import { prisma } from "~/lib/prisma";
type BodyType = {
  id: number;
  noteId: number;
};
export default defineEventHandler(async (event) => {
  const body: BodyType = await readBody(event);

  const note = await prisma.tag.update({
    where: {
      id: body.id,
    },
    data: {
      notes: {
        connect: {
          id: Number(body.noteId),
        },
      },
    },
  });
  return note;
});
