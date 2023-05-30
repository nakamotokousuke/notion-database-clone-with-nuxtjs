import { prisma } from "~/lib/prisma";
type Note = {
  title: string;
  content: string;
};
export default defineEventHandler(async (event) => {
  const params = getQuery(event);
  const body: Note = await readBody(event);
  const tags = await prisma.note.update({
    where: { id: Number(params["0"]) },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return tags;
});
