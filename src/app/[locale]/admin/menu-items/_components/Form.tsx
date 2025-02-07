"use client";

import FormFields from "@/components/form-fields/form-fields";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { Translations } from "@/types/translations";
import { Category, Extra, Size } from "@prisma/client";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SelectCategory } from "./SelectCategory";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ItemOptions, { ItemOptionsKeys } from "./ItemOptions";
import { ProductWithRelations } from "@/types/product";
function Form({
  translations,
  categories,
  product
}: {
  translations: Translations;
  categories: Category[];
  product:ProductWithRelations[];
}) {
  const [selectedImage, setSelectedImage] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [sizes, setSizes] = useState<Partial<Size>[]>(
    product && product.length > 0 ? product[0].sizes : []
  );
  const [extras, setExtras] = useState<Partial<Extra>[]>(
      product && product.length > 0 ? product[0].extras : []
    );
  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    translations,
  });
  return (
    <form className="flex flex-col md:flex-row gap-10">
      <div>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      </div>
      <div className="flex-1">
        {getFormFields().map((field: IFormField) => {
          return (
            <div key={field.name} className="mb-3">
              <FormFields {...field} error={{}} />
            </div>
          );
        })}
        <SelectCategory
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          translations={translations}
        />
        <AddSize 
        translations={translations}
        sizes={sizes}
        setSizes={setSizes}
        />
        <AddExtra
        translations={translations}
        extras={extras}
        setExtras={setExtras}
        />
        <FormActions translations={translations} />
      </div>
    </form>
  );
}

export default Form;

const UploadImage = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <div className="group mx-auto md:mx-0 relative w-[200px] h-[200px] overflow-hidden rounded-full">
      {selectedImage && (
        <Image
          src={selectedImage}
          alt="Add Product Image"
          width={200}
          height={200}
          className="rounded-full object-cover"
        />
      )}
      <div
        className={`${selectedImage
            ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
            : ""
          } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleImageChange}
          name="image"
        />
        <label
          htmlFor="image-upload"
          className="border rounded-full w-[200px] h-[200px] element-center cursor-pointer"
        >
          <CameraIcon className="!w-8 !h-8 text-accent" />
        </label>
      </div>
    </div>
  );
};

const FormActions = ({ translations }: { translations: Translations }) => {
  return (
    <Button className="w-full " type="submit">
      {translations.create}
    </Button>
  );
};

const AddSize = ({ sizes, setSizes, translations }:
  {
    sizes: Partial<Size>[];
    setSizes: React.Dispatch<React.SetStateAction<Partial<Size>[]>>;
    translations: Translations
  }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-gray-100 rounded-md px-4 w-80 mb-4 "
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-black text-base font-medium hover:no-underline">
          {translations.sizes}
        </AccordionTrigger>
        <AccordionContent>
          <ItemOptions
            optionKey={ItemOptionsKeys.SIZES}
            state={sizes}
            setState={setSizes}
            translations={translations}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};


const AddExtra = ({ extras, setExtras, translations }:
  {
    extras: Partial<Extra>[];
    setExtras: React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
    translations: Translations
  }) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-gray-100 rounded-md px-4 w-80 mb-4 "
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-black text-base font-medium hover:no-underline">
          {translations.extrasIngredients}
        </AccordionTrigger>
        <AccordionContent>
          <ItemOptions
            optionKey={ItemOptionsKeys.EXTRAS}
            state={extras}
            setState={setExtras}
            translations={translations}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
