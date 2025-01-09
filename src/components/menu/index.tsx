import React from "react";
import MenuCard from "./MenuCard";
import { ProductWithRelations } from "../../types/product";

const Menu = ({ items }: { items: ProductWithRelations[] }) => { 
  console.log(items);
  
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item: ProductWithRelations) => {
        return <MenuCard key={item.id} item={item} />;
      })}
    </ul>
  );
};

export default Menu;
