"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const applySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  discordTag: z.string().min(2, "Discord tag is required"),
  ign: z.string().min(2, "In-game name is required"),
  age: z.number({ invalid_type_error: "Age is required" }).min(16, "Must be 16+"),
  experience: z.string().min(10, "Add a short summary"),
  why: z.string().min(20, "Tell us why you should be whitelisted"),
  attachments: z.any().optional()
});

export type ApplyFormData = z.infer<typeof applySchema>;

export default function ApplyForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ApplyFormData>({ resolver: zodResolver(applySchema), mode: "onBlur" });

  const onSubmit = async (data: ApplyFormData) => {
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-labelledby="apply-heading">
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Full name" error={errors.fullName?.message}>
          <input
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
            className="w-full rounded-md bg-white/5 border border-white/15 px-4 py-3 focus-ring"
            placeholder="Jane Doe"
          />
        </Field>
        <Field label="Discord tag" error={errors.discordTag?.message}>
          <input
            aria-invalid={!!errors.discordTag}
            {...register("discordTag")}
            className="w-full rounded-md bg-white/5 border border-white/15 px-4 py-3 focus-ring"
            placeholder="username"
          />
        </Field>
        <Field label="In-game name" error={errors.ign?.message}>
          <input
            aria-invalid={!!errors.ign}
            {...register("ign")}
            className="w-full rounded-md bg-white/5 border border-white/15 px-4 py-3 focus-ring"
            placeholder="Character Name"
          />
        </Field>
        <Field label="Age" error={errors.age?.message}>
          <input
            type="number"
            inputMode="numeric"
            aria-invalid={!!errors.age}
            {...register("age", { valueAsNumber: true })}
            className="w-full rounded-md bg-white/5 border border-white/15 px-4 py-3 focus-ring"
            placeholder="18"
            min={0}
          />
        </Field>
      </div>

      <Field label="Roleplay experience (short)" error={errors.experience?.message}>
        <input
          aria-invalid={!!errors.experience}
          {...register("experience")}
          className="w-full rounded-md bg-white/5 border border-white/15 px-4 py-3 focus-ring"
          placeholder="Servers played, roles, etc."
        />
      </Field>

      <Field label="Why you should be whitelisted" error={errors.why?.message}>
        <textarea
          aria-invalid={!!errors.why}
          {...register("why")}
          rows={6}
          className="w-full rounded-md bg-white/5 border border-white/15 px-4 py-3 focus-ring"
          placeholder="Tell us about your character and intent."
        />
      </Field>

      <div>
        <label className="block text-sm text-white/80">Attachments (optional)</label>
        <input type="file" multiple className="mt-2 block w-full text-sm" {...register("attachments")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 rounded-pill bg-brand-orange text-black font-semibold hover:scale-105 hover:shadow-glow transition disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Submit application"}
      </button>

      {status === "success" && <p role="status" className="text-green-400">Application submitted successfully.</p>}
      {status === "error" && <p role="alert" className="text-red-400">Submission failed. Try again.</p>}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-white/80">{label}</label>
      <div className="mt-2">{children}</div>
      {error && (
        <p role="alert" className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}


