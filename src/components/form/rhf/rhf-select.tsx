import { Activity } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FormBaseProps } from "@/types/form";

export type RHFSelectProps<FormValues extends FieldValues> = FormBaseProps<FormValues> & {
  children: React.ReactNode;
};

export const RHFSelect = <FormValues extends FieldValues>({
  name,
  label,
  control,
  children,
}: RHFSelectProps<FormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Select {...field} onValueChange={onChange}>
            <SelectTrigger id={field.name} onBlur={onBlur} aria-invalid={fieldState.invalid}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>{children}</SelectContent>
          </Select>
          <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
            <FieldError errors={[fieldState.error]} />
          </Activity>
        </Field>
      )}
    />
  );
};
