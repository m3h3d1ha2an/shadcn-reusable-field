"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Activity } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { createProject } from "@/actions/project";
import { projectSchema, projectStatusEnum } from "@/schemas/project";
import { Button } from "./ui/button";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";

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
    },
    resolver: zodResolver(projectSchema),
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
    <div className="max-w-7xl mx-auto mt-8 p-8 shadow-lg rounded-lg border min-h-96 w-full">
      <h4 className="text-center text-xl font-medium ">Project</h4>
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
              <FieldLegend>Notifications</FieldLegend>
              <FieldDescription>Receive notifications for project updates.</FieldDescription>
            </FieldContent>
            <FieldGroup data-slot="checkbox-group">
              <Controller
                control={form.control}
                name="notifications.email"
                render={({ field: { value, onChange, ...field }, fieldState }) => (
                  <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                    <Checkbox id={field.name} checked={value} onCheckedChange={onChange} {...field} aria-invalid={fieldState.invalid} />
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
                    <Checkbox id={field.name} checked={value} onCheckedChange={onChange} {...field} aria-invalid={fieldState.invalid} />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>SMS</FieldLabel>
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
                    <Checkbox id={field.name} checked={value} onCheckedChange={onChange} {...field} aria-invalid={fieldState.invalid} />
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Push</FieldLabel>
                      <Activity mode={fieldState.invalid ? "visible" : "hidden"}>
                        <FieldError errors={[fieldState.error]} />
                      </Activity>
                    </FieldContent>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>

          <Button type="submit">Create</Button>
        </FieldGroup>
      </form>
    </div>
  );
};
