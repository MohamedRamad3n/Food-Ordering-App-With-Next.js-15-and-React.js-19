"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { formatCurrency } from "@/lib/formatters";
import { Checkbox } from "../ui/checkbox";
import { ProductWithRelations } from "../../types/product";
import { Extra, ProductSize, Size } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addToCart,
  removeCartItem,
  selectItemCart,
} from "@/redux/features/cart";
import { getQuantityItem } from "@/lib/cart";
const AddToCardButton = ({ item }: { item: ProductWithRelations }) => {
  const cart = useAppSelector(selectItemCart);
  const quantity = getQuantityItem(item.id, cart);
  const dispatch = useAppDispatch();
  const defaultSize =
    cart.find((element) => element.id === item.id)?.sizes ||
    item.sizes.find((size) => size.name === ProductSize.SMALL);
  const defaultExtras =
    cart.find((element) => element.id === item.id)?.extras || [];
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);
  let totalPrice = item.basePrice;
  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        basePrice: item.basePrice,
        id: item.id,
        image: item.image,
        name: item.name,
        sizes: selectedSize,
        extras: selectedExtras,
      })
    );
  };
  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            size="lg"
            className="mt-4 text-white rounded-full !px-8 "
          >
            <span>Add To Cart</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex flex-col items-center gap-4">
            <Image src={item.image} width={200} height={200} alt="Image" />
            <DialogTitle>{item.name}</DialogTitle>
            <DialogDescription>{item.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-10">
            <div className="space-y-4 text-center">
              <Label htmlFor="pick-size">Pick Your Size</Label>
              <RadioGroupComponent
                selectSize={selectedSize}
                setSize={setSelectedSize}
                sizes={item.sizes}
                item={item}
              />
            </div>
          </div>
          <div className="space-y-4 text-center">
            <Label htmlFor="pick-extras">Pick Your Extras</Label>
            <ExtraComponent
              extras={item.extras}
              item={item}
              selectedExtras={selectedExtras}
              setSelectedExtras={setSelectedExtras}
            />
          </div>
          <DialogFooter>
            {quantity === 0 ? (
              <Button
                onClick={handleAddToCart}
                type="submit"
                size="lg"
                className="text-white w-full m-auto  rounded-full !px-8"
              >
                <span>Add To Cart {formatCurrency(totalPrice)} </span>
              </Button>
            ) : (
              <ChooseQuantity
                quantity={quantity}
                item={item}
                selectedSize={selectedSize}
                selectedExtras={selectedExtras}
              />
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddToCardButton;

const RadioGroupComponent = ({
  sizes,
  item,
  selectSize,
  setSize,
}: {
  sizes: Size[];
  item: ProductWithRelations;
  selectSize: Size;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
}) => {
  return (
    <RadioGroup defaultValue="option-one">
      {sizes?.map((size) => (
        <div
          key={size.id}
          className="flex space-x-2 items-center border border-gray-100 rounded-md p-2"
        >
          <RadioGroupItem
            onClick={() => setSize(size)}
            key={size.id}
            value={selectSize?.name}
            checked={selectSize?.id === size.id}
          >
            <div className="">
              <span>{size.name}</span>
              <span>{size.price}</span>
            </div>
          </RadioGroupItem>
          <Label htmlFor={size.name}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

const ExtraComponent = ({
  extras,
  selectedExtras,
  setSelectedExtras,
}: {
  extras: Extra[];
  item: ProductWithRelations;
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) => {
  const handleExtra = (extra: Extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      const filteredSelectedExtras = selectedExtras.filter(
        (item) => item.id !== extra.id
      );
      setSelectedExtras(filteredSelectedExtras);
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };
  return (
    <div className="flex flex-col space-y-2">
      {extras?.map((extra) => (
        <div
          key={extra.id}
          className="flex space-x-2 items-center border border-gray-100 rounded-md p-2"
        >
          <Checkbox
            id={extra.name}
            name={extra.name}
            onClick={() => handleExtra(extra)}
            checked={Boolean(selectedExtras.find((e) => e.id === extra.id))}
          />
          <Label htmlFor={extra.name}>
            {extra.name} {formatCurrency(extra.price)}
          </Label>
        </div>
      ))}
    </div>
  );
};

const ChooseQuantity = ({
  quantity,
  item,
  selectedSize,
  selectedExtras,
}: {
  quantity: number;
  item: ProductWithRelations;
  selectedSize: Size;
  selectedExtras: Extra[];
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>
        <div>
          <span className="text-black">{quantity} in cart</span>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            dispatch(
              addToCart({
                basePrice: item.basePrice,
                id: item.id,
                image: item.image,
                name: item.name,
                extras: selectedExtras,
                sizes: selectedSize,
              })
            )
          }
        >
          +
        </Button>
      </div>
      <Button
        size="sm"
        onClick={() => dispatch(removeCartItem({ id: item.id }))}
      >
        Remove
      </Button>
    </div>
  );
};
