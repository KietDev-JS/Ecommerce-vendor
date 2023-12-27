import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export const getStockCount = async (storeId: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const stockCount = await prismadb.product.count({
    where: {
      userId,
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};
