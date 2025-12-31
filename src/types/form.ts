import type { Control, FieldValues, Path } from "react-hook-form";

export type FormBaseProps<FormValues extends FieldValues> = {
  name: Path<FormValues>;
  label: string;
  control: Control<FormValues>;
};
