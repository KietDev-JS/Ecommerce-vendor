import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (userId: string) => {
  const paidOrders = await prismadb.order.findMany({
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
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
