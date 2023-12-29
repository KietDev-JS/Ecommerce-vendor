import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export const getStockCount = async (userId: string) => {
  const stockCount = await prismadb.product.count({
    where: {
      userId,
      isArchived: false,
    },
  });

  return stockCount;
};
