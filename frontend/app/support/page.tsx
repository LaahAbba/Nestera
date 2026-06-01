import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Create validation schema
const supportFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

export default function SupportPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSuccess },
  } = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: SupportFormValues) => {
    console.log("Support form submitted:", data);
    // Here you would typically send the data to your backend
  };

  return (
    <main className="min-h-screen bg-[#041c1e]">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Contact Support
        </h1>
        
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#0A1A1A] rounded-2xl border border-white/10 p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#8C9BAB] font-semibold mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className={`w-full px-4 py-3 rounded-lg bg-[#0F2D2D] border border-white/10 text-[#8C9BAB] placeholder-[#6a8a93] focus:border-[#00D9C0] focus:outline-none transition-colors ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Your name"
                required
                aria-invalid={!!errors.name ? "true" : "false"}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1" id="name-error">
                  {errors.name.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-[#8C9BAB] font-semibold mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-lg bg-[#0F2D2D] border border-white/10 text-[#8C9BAB] placeholder-[#6a8a93] focus:border-[#00D9C0] focus:outline-none transition-colors ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="your.email@example.com"
                required
                aria-invalid={!!errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1" id="email-error">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-[#8C9BAB] font-semibold mb-2 text-sm">
              Subject
            </label>
            <input
              type="text"
              {...register("subject")}
              className={`w-full px-4 py-3 rounded-lg bg-[#0F2D2D] border border-white/10 text-[#8C9BAB] placeholder-[#6a8a93] focus:border-[#00D9C0] focus:outline-none transition-colors ${
                errors.subject ? "border-red-500" : ""
              }`}
              placeholder="How can we help?"
              required
              aria-invalid={!!errors.subject ? "true" : "false"}
              aria-describedby={errors.subject ? "subject-error" : undefined}
            />
            {errors.subject && (
              <p className="text-xs text-red-500 mt-1" id="subject-error">
                {errors.subject.message}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-[#8C9BAB] font-semibold mb-2 text-sm">
              Message
            </label>
            <textarea
              {...register("message")}
              rows={5}
              className={`w-full px-4 py-3 rounded-lg bg-[#0F2D2D] border border-white/10 text-[#8C9BAB] placeholder-[#6a8a93] focus:border-[#00D9C0] focus:outline-none transition-colors ${
                errors.message ? "border-red-500" : ""
              }`}
              placeholder="Please describe your issue or question..."
              required
              aria-invalid={!!errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1" id="message-error">
                {errors.message.message}
              </p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#00d1c1] text-[#020c0c] border-none rounded-md text-sm font-semibold cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
          
          {isSuccess && (
            <div className="mt-4 p-4 bg-[#063d3d] border border-[#00d1c1] rounded-lg">
              <p className="text-xs text-green-500 text-center">
                Thank you for your message! We'll get back to you soon.
              </p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}