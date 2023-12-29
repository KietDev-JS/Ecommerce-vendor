import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { OrderColumn } from "./components/columns";
import { OrderClient } from "./components/client";
import { auth } from "@clerk/nextjs";
export const storeId = "2104";
const OrdersPage = async () => {
  const { userId } = await auth();
  if (!userId) return;
  const orders = await prismadb.order.findMany({
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
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedOrders: OrderColumn[] = orders
    .filter((item) =>
      item.orderItems.some((orderItem) => orderItem.product.userId === userId)
    )
    .map((item) => ({
      id: item.id,
      phone: item.phone,
      address: item.address,
      products: item.orderItems
        .filter((orderItem) => orderItem.product.userId === userId)
        .map((orderItem) => orderItem.product.name)
        .join(", "),
      totalPrice: formatter.format(
        item.orderItems.reduce((total, orderItem) => {
          return (
            total +
            (orderItem.product.userId === userId
              ? Number(orderItem.product.price)
              : 0)
          );
        }, 0)
      ),
      isPaid: item.isPaid,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
