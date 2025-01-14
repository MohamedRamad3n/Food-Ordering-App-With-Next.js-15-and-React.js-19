import React from "react";
import MenuCard from "./MenuCard";
import { ProductWithRelations } from "../../types/product";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/transilation";

const Menu = async ({ items }: { items: ProductWithRelations[] }) => {
  const locale = await getCurrentLocale();
  const { noProductsFound } = await getTrans(locale);

  return items.length > 0 ? (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item: ProductWithRelations) => {
        return <MenuCard key={item.id} item={item} />;
      })}
    </ul>
  ) : (
    <p className="text-accent text-center">{noProductsFound}</p>
  );
};

export default Menu;
