import { prisma } from "~/lib/prisma";

export default defineEventHandler(async () => {
  const note = await prisma.note.create({
    data: {
      title: "新しいNote",
      content: "",
    },
  });
  return note;
});
