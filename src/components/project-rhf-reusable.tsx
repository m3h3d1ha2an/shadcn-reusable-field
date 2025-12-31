"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Delete } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Activity } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { createProject } from "@/actions/project";
import { projectSchema, projectStatusEnum } from "@/schemas/project";
import { FormCheckbox } from "./form/rhf/form-checkbox";
import { FormInput } from "./form/rhf/form-input";
import { FormSelect } from "./form/rhf/form-select";
import { FormTextArea } from "./form/rhf/form-textarea";
import { Button } from "./ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group";
import { SelectItem } from "./ui/select";

export const Project = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      status: "inactive",
      description: "",
      notifications: {
        email: false,
        sms: false,
        push: false,
      },
      users: [{ email: "" }],
    },
    resolver: zodResolver(projectSchema),
  });

  const {
    fields: users,
    append: addUser,
    remove: removeUser,
  } = useFieldArray({
    control: form.control,
    name: "users",
  });

  const onSubmit = async (data: z.infer<typeof projectSchema>) => {
    const result = await createProject(data);
    if (result.success) {
      form.reset();
      toast.success("Project created successfully", {
        description: JSON.stringify(data, null, 2),
        className: "whitespace-pre-wrap font-mono",
      });
    } else {
      toast.error("Failed to create project");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 shadow-lg rounded-lg border-2 w-full">
      <h4 className="text-center text-xl font-medium ">Project</h4>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FormInput control={form.control} name="name" label="Name" />

          <FormSelect control={form.control} name="status" label="Status">
            {projectStatusEnum.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </FormSelect>

          <FormTextArea control={form.control} name="description" label="Description" />

          <FieldSet>
            <FieldContent>
              <FieldLegend variant="label">Notifications</FieldLegend>
              <FieldDescription>Receive notifications for project updates.</FieldDescription>
            </FieldContent>
            <FieldGroup data-slot="checkbox-group">
              <FormCheckbox name="notifications.email" label="Email" control={form.control} />
              <FormCheckbox name="notifications.sms" label="Text" control={form.control} />
              <FormCheckbox name="notifications.push" label="In App" control={form.control} />
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <div className="flex gap-2 items-center justify-between">
              <FieldContent>
                <FieldLegend variant="label" className="mb-0">
                  User Email Address
                </FieldLegend>
                <FieldDescription>Assign up to 5 users to this project (including yourself).</FieldDescription>
                <Activity mode={form.formState.errors.users?.root ? "visible" : "hidden"}>
                  <FieldError errors={[form.formState.errors.users?.root]} />
                </Activity>
              </FieldContent>
              <Button variant="outline" size="sm" onClick={() => addUser({ email: "" })}>
                Add User
              </Button>
            </div>
            <FieldGroup>
              {users.map((user, index) => (
                <Controller
                  key={user.id}
                  control={form.control}
                  name={`users.${index}.email`}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <InputGroup>
                        <InputGroupInput
                          type="email"
                          id={field.name}
                          {...field}
                          aria-label={`User ${index + 1} Email`}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            variant="destructive"
                            size="icon-xs"
                            onClick={() => removeUser(index)}
                            aria-label={`Remove User ${index + 1}`}
                          >
                            <HugeiconsIcon icon={Delete} />
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                        <FieldError errors={[fieldState.error]} />
                      </Activity>
                    </Field>
                  )}
                />
              ))}
            </FieldGroup>
          </FieldSet>

          <Button type="submit" className="hover:bg-green-800">
            Create
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};
