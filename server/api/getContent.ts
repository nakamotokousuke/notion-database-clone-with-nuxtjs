import { prisma } from "~/lib/prisma";
export default defineEventHandler(async (event) => {
  const params = getQuery(event);
  console.log(
    "🚀 ~ file: getContent.ts:4 ~ defineEventHandler ~ params:",
    params
  );

  const note = await prisma.note.findFirst({
    where: {
      id: Number(params["0"]),
    },
    include: {
      tags: true,
    },
  });
  return note;
});
