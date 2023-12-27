import prismadb from "@/lib/prismadb";

import { ProductForm } from "./components/product-form";
import { auth } from "@clerk/nextjs";
export const storeId = "2104";
const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const { userId } = await auth();
  if (!userId) return;
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId,
    },
  });

  const sizes = await prismadb.size.findMany({
    where: {
      storeId,
      userId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      userId,
      storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
