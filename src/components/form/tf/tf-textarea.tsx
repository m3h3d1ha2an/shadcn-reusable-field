import { Activity } from "react";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "./hook";

export const TFTextarea = ({ label, description }: { label: string; description?: string }) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <Field data-invalid={isInvalid}>
      <FieldContent>
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        <Activity mode={description ? "visible" : "hidden"}>
          <FieldDescription>{description}</FieldDescription>
        </Activity>
      </FieldContent>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        aria-invalid={isInvalid}
        rows={6}
        className="min-h-24 resize-none"
      />
      <Activity mode={isInvalid ? "visible" : "hidden"}>
        <FieldError errors={field.state.meta.errors} />
      </Activity>
    </Field>
  );
};
