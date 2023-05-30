import { prisma } from "~/lib/prisma";
type Tag = {
  id: number;
  name: string;
};
export default defineEventHandler(async (event) => {
  const body: Tag = await readBody(event);
  console.log(
    "🚀 ~ file: updateTagName.ts:8 ~ defineEventHandler ~ body:",
    body
  );
  const tags = await prisma.tag.update({
    where: { id: body.id },
    data: {
      name: body.name,
    },
  });
  return tags;
});
