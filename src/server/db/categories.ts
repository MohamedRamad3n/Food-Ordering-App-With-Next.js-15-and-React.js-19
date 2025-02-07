import { cache } from "@/lib/cash";
import { db } from "@/lib/prisma";

export const getCategories = cache(
  () => {
    const categories = db.category.findMany({
      orderBy: {
        order: "asc",
      },
    });
    return categories;
  },
  ["categories"],
  { revalidate: 3600 }
);
