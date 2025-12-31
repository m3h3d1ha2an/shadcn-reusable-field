import { Activity } from "react";
import { type Control, Controller, type FieldValues, type Path } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
};

export const FormInput = <T extends FieldValues>({ name, label, control }: FormInputProps<T>) => {
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

export type FormSelectProps<T extends FieldValues> = FormInputProps<T> & {
  children: React.ReactNode;
};

export const FormSelect = <T extends FieldValues>({ name, label, control, children }: FormSelectProps<T>) => {
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

export type FormTextAreaProps<T extends FieldValues> = FormInputProps<T> & {
  description?: string;
};

export const FormTextArea = <T extends FieldValues>({ name, label, description, control }: FormTextAreaProps<T>) => {
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

type FormCheckboxProps<T extends FieldValues> = FormInputProps<T>;

export const FormCheckbox = <T extends FieldValues>({ name, label, control }: FormCheckboxProps<T>) => {
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
