"use client";

import { useState } from "react";
import { FiArrowRight, FiCheckCircle, FiLoader } from "react-icons/fi";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  revenue: "",
  platform: "",
  goal: "",
};

export default function DemoForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!form.firstName || !form.lastName || !form.email || !form.website) {
      setError("Please fill in your first name, last name, work email, and website URL.");
      return;
    }

    setStatus("loading");

    const message = [
      "DTC mobile app free preview request",
      `Website: ${form.website}`,
      "Requested step: Free app preview",
    ].join("\n");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          phone: form.phone || "Not provided",
          email: form.email,
          company: form.company,
          message,
          source: "DTC Mobile Apps Free Preview Page",
        }),
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (submitError) {
      setStatus("idle");
      setError("Something went wrong while submitting the form. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-[#00a86b]/25 bg-white p-6 shadow-xl md:p-8">
        <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-[#e8f8f1] text-[#00a86b]">
          <FiCheckCircle size={30} />
        </div>
        <h2 className="text-2xl font-black text-slate-950">Your preview request is in.</h2>
        <p className="mt-3 leading-7 text-slate-600">
          We have your store details. Pick a time now and we will come prepared to walk through your app preview direction, sync plan, push opportunities, and launch path.
        </p>
        <a
          href="https://calendly.com/ecarts-agency-biz/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#00a86b] px-7 py-4 font-black text-white transition hover:bg-[#038257]"
        >
          Schedule the Preview Walkthrough
          <FiArrowRight />
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-xl md:p-8">
      <div className="mb-6">
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#00a86b]">Step 1 of 2</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">Claim your free app preview</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Tell us about your site and we will do the rest. Takes 30 seconds.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
          First Name
          <input
            required
            value={form.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            placeholder="Jane"
            className="rounded-lg border border-slate-200 px-4 py-3 font-medium outline-none transition focus:border-[#00a86b]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
          Last Name
          <input
            required
            value={form.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            placeholder="Smith"
            className="rounded-lg border border-slate-200 px-4 py-3 font-medium outline-none transition focus:border-[#00a86b]"
          />
        </label>
      </div>

      <label className="mt-5 flex flex-col gap-2 text-sm font-bold text-slate-700">
        Work Email
        <input
          type="email"
          required
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="jane@brand.com"
          className="rounded-lg border border-slate-200 px-4 py-3 font-medium outline-none transition focus:border-[#00a86b]"
        />
      </label>

      <label className="mt-5 flex flex-col gap-2 text-sm font-bold text-slate-700">
        Website URL
        <input
          required
          value={form.website}
          onChange={(event) => updateField("website", event.target.value)}
          placeholder="https://yourbrand.com"
          className="rounded-lg border border-slate-200 px-4 py-3 font-medium outline-none transition focus:border-[#00a86b]"
        />
      </label>

      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#00a86b] px-7 py-4 font-black text-white transition hover:bg-[#038257] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <FiLoader className="animate-spin" />
            Submitting
          </>
        ) : (
          <>
            Continue
            <FiArrowRight />
          </>
        )}
      </button>
      <p className="mt-4 text-xs leading-5 text-slate-500">
        By submitting this form, you agree to be contacted by Ecarts about your app preview and launch plan.
      </p>
    </form>
  );
}
