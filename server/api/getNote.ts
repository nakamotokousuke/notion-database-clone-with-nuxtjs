import { prisma } from "~/lib/prisma";
export default defineEventHandler(async (event) => {
  //   const query = getQuery(event);
  const body: string[] = await readBody(event);

  if (body.length === 0) {
    const notes = await prisma.note.findMany({
      include: {
        tags: true,
      },
    });
    return notes;
  } else {
    const notes = await prisma.note.findMany({
      where: {
        AND: body.map((tag) => ({
          tags: {
            some: {
              name: tag,
            },
          },
        })),
      },
      include: {
        tags: true,
      },
    });
    return notes;
  }
});
// const notes = await prisma.note.findMany({
//   where: {
//     tags: {
//       every: {
//         name: {
//           in: body,
//         },
//       },
//     },
//   },
// });
