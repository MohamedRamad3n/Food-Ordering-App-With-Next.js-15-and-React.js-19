import { cache } from "@/lib/cash";
import { db } from "@/lib/prisma";


export const getProductsByCategory = cache(
  () => {
    const products = db.category.findMany({
      include: {
        products: {
          include: {
            sizes: true,
            extras: true,
          },
        },
      },
    });
    return products;
  },
  ['products-by-category'],
  { revalidate: 3600 }
);

export const getBestSellers = cache(
  async (limit?: number | undefined) => {
    const bestSellers = await db.product.findMany({
      where: {
        orders: {
          some: {},
        },
      },
      orderBy: {
        orders: {
          _count: 'desc',
        },
      },
      include: {
        sizes: true,
        extras: true,
      },
      take: limit,
    });

    if (bestSellers.length === 0) {
      return await db.product.findMany({
        take: limit,
        include: {
          sizes: true,
          extras: true,
        },
      });
    }

    return bestSellers;
  },
  ['best-sellers'],
  { revalidate: 3600 }
);

export const getProducts = cache(
  () => {
    const products = db.product.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return products;
  },
  ["products"],
  { revalidate: 3600 }
);

export const getProduct = cache(
  (id: string) => {
    const product = db.product.findUnique({
      where: {
        id,
      },
      include: {
        sizes: true,
        extras: true,
      },
    });
    return product;
  },
  [`product-${crypto.randomUUID()}`],
  { revalidate: 3600 }
);