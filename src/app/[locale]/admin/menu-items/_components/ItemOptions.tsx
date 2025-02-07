/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "@/constants/enums";
import { Translations } from "@/types/translations";
import { ExtraName, ProductSize, Size, Extra } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
export enum ItemOptionsKeys {
  SIZES,
  EXTRAS,
}

const sizesNames = [
  ProductSize.SMALL,
  ProductSize.MEDIUM,
  ProductSize.LARGE,
];
const extraNames = [
  ExtraName.CHEESE,
  ExtraName.BACON,
  ExtraName.ONIONS,
  ExtraName.PEPPERONI,
  ExtraName.TOMATO,
  ExtraName.GREEN_PEPPERS
]
function handleOptions(
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>
) {
  const addOption = () => {
    setState((prev: any) => {
      return [...prev, { name: "", price: 0 }]
    })
  }
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: string
  ) => {
    const newValue = e.target.value;
    setState((prev: any) => {
      const newSizes = [...prev];
      newSizes[index][fieldName] = newValue;
      return newSizes;
    });
  }
  const removeOption = (indexToRemove: number) => {
    setState((prev: any) => {
      return prev.filter((_: any, index: number) => index !== indexToRemove);
    });
  };
  return { addOption, onChange, removeOption };
}
function ItemOptions({
  state,
  setState,
  translations,
  optionKey
}: {
  state: Partial<Size>[] | Partial<Extra>[];
  setState:
  | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
  | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
  translations: Translations;
  optionKey: ItemOptionsKeys;
}) {
  const { addOption, onChange, removeOption } = handleOptions(setState);
  const isThereAvailableOptions = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES:
        return sizesNames.length > state.length;
      case ItemOptionsKeys.EXTRAS:
        return extraNames.length > state.length;
    }
  };
  return (
    <>
      {state.length > 0 && (
        <ul> 
          {state.map((item, index) => {
            return (
              <li key={index} className="flex gap-2 mb-2">
                <div className="space-y-1 basis-1/2">
                  <Label>Name</Label>
                  <SelectName
                    item={item}
                    onChange={onChange}
                    index={index}
                    currentState={state}
                    optionKey={optionKey}
                  />
                </div>
                <div className="space-y-1 basis-1/2">
                  <Label>Extra Price</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    min={0}
                    name="price"
                    value={item.price}
                    onChange={(e) => onChange(e, index, "price")}
                    className="bg-white focus:!ring-0"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
      {isThereAvailableOptions() && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={addOption}
        >
          <Plus />
          {optionKey === ItemOptionsKeys.SIZES
            ? translations.admin["menu-items"].addItemSize
            : translations.admin["menu-items"].addExtraItem}
        </Button>
      )}
    </>
  )
}

export default ItemOptions

const SelectName = ({
  onChange,
  index,
  item,
  currentState,
  optionKey
}: {
  index: number,
  item: Partial<Size> | Partial<Extra>;
  currentState: Partial<Size>[] | Partial<Extra>[];
  optionKey: ItemOptionsKeys;
  onChange: (e: any, index: any, fieldName: any) => void;
}) => {
  const { locale } = useParams();
  const getNames = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES:
        const filteredSizes = sizesNames.filter(
          (size) => !currentState.some((s) => s.name === size)
        );
        return filteredSizes;
      case ItemOptionsKeys.EXTRAS:
        const filteredExtras = extraNames.filter(
          (extra) => !currentState.some((e) => e.name === extra)
        );
        return filteredExtras;
    }
  };
  const names = getNames();
  console.log(names);

  return (
    <Select
      onValueChange={(value) => {
        onChange({ target: { value } }, index, "name");
      }}
      defaultValue={item.name ? item.name : "select..."}
    >
      <SelectTrigger
        className={` bg-white border-none mb-4 focus:ring-0 ${locale === Languages.ARABIC ? "flex-row-reverse" : "flex-row"
          }`}
      >
        <SelectValue>{item.name ? item.name : "select..."}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-transparent border-none z-50 bg-white">
        <SelectGroup className="bg-background text-accent z-50">
          {names.map((name, index) => (
            <SelectItem
              key={index}
              value={name}
              className="hover:!bg-primary hover:!text-white !text-accent !bg-transparent"
            >
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
