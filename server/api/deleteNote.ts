import { prisma } from "~/lib/prisma";
type BodyType = {
  id: number;
};
export default defineEventHandler(async (event) => {
  const body: BodyType = await readBody(event);
  const note = await prisma.note.delete({
    where: {
      id: body.id,
    },
  });
  return note;
});
