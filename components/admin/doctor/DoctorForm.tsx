"use client";

import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { doctorFormSchema } from "@/lib/validators";

export type DoctorFormValues = z.infer<typeof doctorFormSchema>;

interface DoctorFormProps {
  defaultValues?: Partial<DoctorFormValues>;
  submitLabel?: string;
  onSubmit?: (values: DoctorFormValues) => Promise<void> | void;
}

const FALLBACK_VALUES: DoctorFormValues = {
  name: "",
  email: "",
  npi: "",
  specialty: "",
  city: "",
  status: "active",
};

export function DoctorForm({
  defaultValues,
  submitLabel = "Save Doctor",
  onSubmit,
}: DoctorFormProps) {
  const resolvedDefaults = useMemo(
    () => ({ ...FALLBACK_VALUES, ...defaultValues }),
    [defaultValues]
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: resolvedDefaults,
  });

  const onFormSubmit = async (values: DoctorFormValues) => {
    try {
      await onSubmit?.(values);
    } catch (error) {
      console.error("Failed to save doctor", error);
    }
  };

  return (
    <form
      className="space-y-6 rounded-lg border bg-background p-6"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-3">
          <Input label="Doctor Name" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Input
            label="Email Address"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Input label="NPI" {...register("npi")} />
          {errors.npi && (
            <p className="text-xs text-red-500">{errors.npi.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Input label="Specialty" {...register("specialty")} />
          {errors.specialty && (
            <p className="text-xs text-red-500">
              {errors.specialty.message}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Input label="City" {...register("city")} />
          {errors.city && (
            <p className="text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.status && (
            <p className="text-xs text-red-500">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
