import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { TFCheckbox } from "./tf-checkbox";
import { TFInput } from "./tf-input";
import { TFSelect } from "./tf-select";
import { TFTextarea } from "./tf-textarea";

const { formContext, useFormContext } = createFormHookContexts();
const { fieldContext, useFieldContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Input: TFInput,
    Select: TFSelect,
    Textarea: TFTextarea,
    Checkbox: TFCheckbox,
  },
  formComponents: {},
});

export { useAppForm, useFieldContext, useFormContext };
