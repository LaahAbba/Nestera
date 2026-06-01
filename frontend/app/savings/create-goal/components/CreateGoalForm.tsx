"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ChevronDown, X } from "lucide-react";

// Create validation schema
const createGoalSchema = z.object({
  goalName: z.string().min(3, "Goal name must be at least 3 characters").max(50, "Goal name must not exceed 50 characters"),
  category: z.string().min(1, "Please select a category"),
  targetAmount: z.string().refine(val => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Target amount must be a positive number"),
  startingAmount: z.string().refine(val => {
    if (val === "") return true; // Optional field
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, "Starting amount must be a non-negative number"),
  targetDate: z.string().refine(val => {
    if (val === "") return false;
    const date = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, "Target date must be today or in the future"),
  frequency: z.string().min(1, "Please select a frequency"),
  description: z.string().optional(),
  autoSave: z.boolean(),
  routeToYield: z.boolean(),
});

type CreateGoalFormValues = z.infer<typeof createGoalSchema>;

export default function CreateGoalForm() {
  const t = useTranslations("goals");
  const formsT = useTranslations("forms");

  // Create validation schema
  const createGoalSchema = z.object({
    goalName: z.string().min(3, formsT("minLength")).max(50, formsT("maxLength")),
    category: z.string().min(1, formsT("required")),
    targetAmount: z.string().refine(val => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, formsT("minValue")),
    startingAmount: z.string().refine(val => {
      if (val === "") return true; // Optional field
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, formsT("minValue")),
    targetDate: z.string().refine(val => {
      if (val === "") return false;
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }, t("targetDate") + " " + formsT("required")),
    frequency: z.string().min(1, formsT("required")),
    description: z.string().optional(),
    autoSave: z.boolean(),
    routeToYield: z.boolean(),
  });

  type CreateGoalFormValues = z.infer<typeof createGoalSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSuccess },
  } = useForm<CreateGoalFormValues>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      goalName: "",
      category: "",
      targetAmount: "",
      startingAmount: "",
      targetDate: "",
      frequency: "",
      description: "",
      autoSave: false,
      routeToYield: false,
    },
  });

  const onSubmit = (data: CreateGoalFormValues) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your backend
    // For now, we'll just log it
  };
