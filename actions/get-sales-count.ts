import prismadb from "@/lib/prismadb";

export const getSalesCount = async (userId: string) => {
  const salesCount = await prismadb.order.count({
    where: {
      isPaid: true,
      orderItems: {
        some: {
          product: {
            userId,
          },
        },
      },
    },
  });

  return salesCount;
};
