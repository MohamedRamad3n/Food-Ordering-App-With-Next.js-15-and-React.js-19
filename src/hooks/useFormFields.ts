/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pages } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";

interface Props extends IFormFieldsVariables {
  translations: any;
}
const useFormFields = ({ slug }: Props) => {
  const loginFields = (): IFormField[] => [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
      autoFocus: true,
    },
    {
      label: "Password",
      name: "password",
      placeholder: "Enter Your Password",
      type: "password",
    },
  ];

  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      default:
        return [];
    }
  };
  return {
    getFormFields,
  };
};

export default useFormFields;
