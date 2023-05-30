import { prisma } from "~/lib/prisma";
export default defineEventHandler(async () => {
  const tags = await prisma.tag.findMany();
  return tags;
});
