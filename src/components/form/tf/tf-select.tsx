import { Activity } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFieldContext } from "./hook";

export const TFSelect = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const field = useFieldContext();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Select name={field.name} value={field.state.value} onValueChange={(value) => value && field.handleChange(value)}>
        <SelectTrigger id={field.name} onBlur={field.handleBlur} aria-invalid={isInvalid}>
          <SelectValue className="capitalize" />
        </SelectTrigger>
        <SelectContent className="p-2">{children}</SelectContent>
      </Select>
      <Activity mode={isInvalid ? "visible" : "hidden"}>
        <FieldError errors={field.state.meta.errors} />
      </Activity>
    </Field>
  );
};
