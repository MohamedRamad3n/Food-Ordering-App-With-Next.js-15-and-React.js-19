/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFormField } from "@/types/app";
import { Label } from "../ui/label";
import { Checkbox as ShadcnCheckbox } from "../ui/checkbox";

interface Props extends IFormField {
  error:any;
}

const Checkbox = ({ label, name, disabled }: Props) => {
  return (
    <div className="text-accent flex items-center gap-2">
      <ShadcnCheckbox
        type="button"
        id={name}
        name={name}
       disabled={disabled}
      />
      <Label htmlFor={name} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
};

export default Checkbox;
