import { Activity } from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import type { FormBaseProps } from "@/types/form";

export type RHFTextAreaProps<FormValues extends FieldValues> = FormBaseProps<FormValues> & {
  description?: string;
};

export const RHFTextArea = <FormValues extends FieldValues>({
  name,
  label,
  description,
  control,
}: RHFTextAreaProps<FormValues>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldContent>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Activity mode={description ? "visible" : "hidden"}>
              <FieldDescription>{description}</FieldDescription>
            </Activity>
          </FieldContent>
          <Textarea id={field.name} {...field} aria-invalid={fieldState.invalid} />
          <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
            <FieldError errors={[fieldState.error]} />
          </Activity>
        </Field>
      )}
    />
  );
};
