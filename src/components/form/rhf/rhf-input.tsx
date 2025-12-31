import { Activity } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { FormBaseProps } from "@/types/form";

type RHFInputProps<FormValues extends FieldValues> = FormBaseProps<FormValues>;

export const RHFInput = <FormValues extends FieldValues>({ name, label, control }: RHFInputProps<FormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <Input id={field.name} {...field} aria-invalid={fieldState.invalid} />
          <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
            <FieldError errors={[fieldState.error]} />
          </Activity>
        </Field>
      )}
    />
  );
};
