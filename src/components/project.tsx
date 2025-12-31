"use client";

import { X } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import { Activity } from "react";
import { toast } from "sonner";
import type z from "zod";
import { createProject } from "@/actions/project";
import { projectStatusEnum, projectTanstackSchema } from "@/schemas/project";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

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
      <h4 className="text-center text-xl font-medium ">Project</h4>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    aria-invalid={isInvalid}
                  />
                  <Activity mode={isInvalid ? "visible" : "hidden"}>
                    <FieldError errors={field.state.meta.errors} />
                  </Activity>
                </Field>
              );
            }}
          />
          <form.Field
            name="status"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.state.value}
                    onValueChange={(value) => value && field.handleChange(value)}
                  >
                    <SelectTrigger id={field.name} onBlur={field.handleBlur} aria-invalid={isInvalid}>
                      <SelectValue className="capitalize" />
                    </SelectTrigger>
                    <SelectContent className="p-2">
                      {projectStatusEnum.map((status) => (
                        <SelectItem key={status} value={status} className="capitalize">
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Activity mode={isInvalid ? "visible" : "hidden"}>
                    <FieldError errors={field.state.meta.errors} />
                  </Activity>
                </Field>
              );
            }}
          />
          <form.Field
            name="description"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <FieldDescription>Be specific and concise as possible.</FieldDescription>
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
            }}
          />

          <FieldSet>
            <FieldContent>
              <FieldLegend variant="label">Notifications</FieldLegend>
              <FieldDescription>Receive notifications for project updates.</FieldDescription>
            </FieldContent>
            <FieldGroup data-slot="checkbox-group">
              <form.Field
                name="notifications.email"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field orientation="horizontal" data-invalid={isInvalid}>
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        checked={field.state.value}
                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                        aria-invalid={isInvalid}
                      />
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Activity mode={isInvalid ? "visible" : "hidden"}>
                          <FieldError errors={field.state.meta.errors} />
                        </Activity>
                      </FieldContent>
                    </Field>
                  );
                }}
              />
              <form.Field
                name="notifications.sms"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field orientation="horizontal" data-invalid={isInvalid}>
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        checked={field.state.value}
                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                        aria-invalid={isInvalid}
                      />
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>Text</FieldLabel>
                        <Activity mode={isInvalid ? "visible" : "hidden"}>
                          <FieldError errors={field.state.meta.errors} />
                        </Activity>
                      </FieldContent>
                    </Field>
                  );
                }}
              />
              <form.Field
                name="notifications.push"
                children={(field) => {
                  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field orientation="horizontal" data-invalid={isInvalid}>
                      <Checkbox
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        checked={field.state.value}
                        onCheckedChange={(checked) => field.handleChange(checked === true)}
                        aria-invalid={isInvalid}
                      />
                      <FieldContent>
                        <FieldLabel htmlFor={field.name}>In App</FieldLabel>
                        <Activity mode={isInvalid ? "visible" : "hidden"}>
                          <FieldError errors={field.state.meta.errors} />
                        </Activity>
                      </FieldContent>
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSeparator />

          <form.Field
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
                    <Button variant="outline" size="sm" onClick={() => field.pushValue({ email: "" })}>
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
                                      variant="destructive"
                                      size="icon-xs"
                                      onClick={() => field.removeValue(index)}
                                      aria-label={`Remove User ${index + 1}`}
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
