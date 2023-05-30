import { prisma } from "~/lib/prisma";
type BodyType = {
  id: number;
};
export default defineEventHandler(async (event) => {
  const body: BodyType = await readBody(event);
  const tag = await prisma.tag.delete({
    where: {
      id: body.id,
    },
  });
  return tag;
});
