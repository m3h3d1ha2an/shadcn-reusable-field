"use client";

import { X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Activity } from "react";
import { toast } from "sonner";
import type z from "zod";
import { createProject } from "@/actions/project";
import { projectStatusEnum, projectTanstackSchema } from "@/schemas/project";
import { useAppForm } from "./form/tf/hook";
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
export const ProjectTFReusable = () => {
  const form = useAppForm({
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
    } satisfies z.infer<typeof projectTanstackSchema> as z.infer<typeof projectTanstackSchema>,
    validators: {
      onSubmit: projectTanstackSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await createProject(value);
      if (result.success) {
        form.reset();
        toast.success("Project created successfully", {
          description: (
            <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
              <code>{JSON.stringify(value, null, 2)}</code>
            </pre>
          ),
          position: "bottom-right",
          classNames: {
            content: "flex flex-col gap-2",
          },
          style: {
            "--border-radius": "calc(var(--radius)  + 4px)",
          } as React.CSSProperties,
        });
      } else {
        toast.error("Failed to create project");
      }
    },
  });

  return (
    <div className="max-w-xl mx-auto p-8 shadow-lg rounded-lg border-2 w-full">
      <h4 className="text-center text-xl font-medium ">Reusable</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.AppField name="name" children={(field) => <field.Input label="Name" />} />
          <form.AppField
            name="status"
            children={(field) => (
              <field.Select label="Status">
                {projectStatusEnum.map((status) => (
                  <SelectItem key={status} value={status} className="capitalize">
                    {status}
                  </SelectItem>
                ))}
              </field.Select>
            )}
          />
          <form.AppField
            name="description"
            children={(field) => (
              <field.Textarea label="Description" description="Be specific and concise as possible." />
            )}
          />

          <FieldSet>
            <FieldContent>
              <FieldLegend variant="label">Notifications</FieldLegend>
              <FieldDescription>Receive notifications for project updates.</FieldDescription>
            </FieldContent>
            <FieldGroup data-slot="checkbox-group">
              <form.AppField
                name="notifications.email"
                children={(field) => <field.Checkbox label="Email" horizontal />}
              />
              <form.AppField
                name="notifications.sms"
                children={(field) => <field.Checkbox label="Text" horizontal />}
              />
              <form.AppField
                name="notifications.push"
                children={(field) => <field.Checkbox label="In App" horizontal />}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <form.AppField
            name="users"
            mode="array"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <FieldSet>
                  <div className="flex gap-2 items-center justify-between">
                    <FieldContent>
                      <FieldLegend variant="label" className="mb-0">
                        User Email Address
                      </FieldLegend>
                      <FieldDescription>Assign up to 5 users to this project (including yourself).</FieldDescription>
                      <Activity mode={isInvalid ? "visible" : "hidden"}>
                        <FieldError errors={field.state.meta.errors} />
                      </Activity>
                    </FieldContent>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue({ email: "" })}
                      disabled={field.state.value.length >= 5}
                    >
                      Add User
                    </Button>
                  </div>
                  <FieldGroup>
                    {field.state.value.map((_, index) => (
                      <form.Field
                        key={index}
                        name={`users[${index}].email`}
                        children={(subField) => {
                          const isSubFieldInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid;
                          return (
                            <Field data-invalid={isSubFieldInvalid}>
                              <InputGroup>
                                <InputGroupInput
                                  type="email"
                                  id={field.name}
                                  name={subField.name}
                                  value={subField.state.value}
                                  onBlur={subField.handleBlur}
                                  onChange={(e) => subField.handleChange(e.target.value)}
                                  aria-label={`User ${index + 1} Email`}
                                  aria-invalid={isSubFieldInvalid}
                                />
                                <Activity mode={field.state.value.length > 1 ? "visible" : "hidden"}>
                                  <InputGroupAddon align="inline-end">
                                    <InputGroupButton
                                      type="button"
                                      variant="ghost"
                                      size="icon-xs"
                                      onClick={() => field.removeValue(index)}
                                      aria-label={`Remove User ${index + 1}`}
                                      className="hover:text-destructive"
                                    >
                                      <HugeiconsIcon icon={X} />
                                    </InputGroupButton>
                                  </InputGroupAddon>
                                </Activity>
                              </InputGroup>
                              <Activity mode={isSubFieldInvalid ? "visible" : "hidden"}>
                                <FieldError errors={subField.state.meta.errors} />
                              </Activity>
                            </Field>
                          );
                        }}
                      />
                    ))}
                  </FieldGroup>
                </FieldSet>
              );
            }}
          />

          <Button type="submit" className="hover:bg-green-800">
            Create
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};
