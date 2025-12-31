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

export const ProjectRHFRaw = () => {
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
      <h4 className="text-center text-xl font-medium ">Raw</h4>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input id={field.name} {...field} aria-invalid={fieldState.invalid} />
                <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                  <FieldError errors={[fieldState.error]} />
                </Activity>
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="status"
            render={({ field: { onChange, onBlur, ...field }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select {...field} onValueChange={onChange}>
                  <SelectTrigger id={field.name} onBlur={onBlur} aria-invalid={fieldState.invalid}>
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
                <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                  <FieldError errors={[fieldState.error]} />
                </Activity>
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <FieldDescription>Be specific and concise as possible.</FieldDescription>
                </FieldContent>
                <Textarea id={field.name} {...field} aria-invalid={fieldState.invalid} />
                <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                  <FieldError errors={[fieldState.error]} />
                </Activity>
              </Field>
            )}
          />

          <FieldSet>
            <FieldContent>
              <FieldLegend variant="label">Notifications</FieldLegend>
              <FieldDescription>Receive notifications for project updates.</FieldDescription>
            </FieldContent>
            <FieldGroup data-slot="checkbox-group">
              <Controller
                control={form.control}
                name="notifications.email"
                render={({ field: { value, onChange, ...field }, fieldState }) => (
                  <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                    <Checkbox
                      {...field}
                      id={field.name}
                      checked={value}
                      onCheckedChange={onChange}
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                        <FieldError errors={[fieldState.error]} />
                      </Activity>
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="notifications.sms"
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
                      <FieldLabel htmlFor={field.name}>Text</FieldLabel>
                      <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                        <FieldError errors={[fieldState.error]} />
                      </Activity>
                    </FieldContent>
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="notifications.push"
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
                      <FieldLabel htmlFor={field.name}>In App</FieldLabel>
                      <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                        <FieldError errors={[fieldState.error]} />
                      </Activity>
                    </FieldContent>
                  </Field>
                )}
              />
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
