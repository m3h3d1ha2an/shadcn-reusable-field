import { Activity } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import type { FormBaseProps } from "@/types/form";

type RHFCheckboxProps<FormValues extends FieldValues> = FormBaseProps<FormValues>;

export const RHFCheckbox = <FormValues extends FieldValues>({ name, label, control }: RHFCheckboxProps<FormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...field }, fieldState }) => (
        <Field orientation="horizontal" data-invalid={fieldState.invalid}>
          <Checkbox
            id={field.name}
            checked={value}
            onCheckedChange={onChange}
            {...field}
            aria-invalid={fieldState.invalid}
          />
          <FieldContent>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
              <FieldError errors={[fieldState.error]} />
            </Activity>
          </FieldContent>
        </Field>
      )}
    />
  );
};
