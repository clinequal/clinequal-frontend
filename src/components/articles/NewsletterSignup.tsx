"use client";

import { useState } from "react";
import { subscribeNewsletter, AlreadySubscribedError } from "@/lib/api/articles";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await subscribeNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch (err) {
      if (err instanceof AlreadySubscribedError) {
        setStatus("already");
      } else {
        setStatus("error");
      }
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800/80 rounded-xl p-6 border border-primary/20 dark:border-primary/30 shadow-lg shadow-primary/25">
      <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
        Stay Updated
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Get the latest insights on clinical trial equity delivered to your inbox.
      </p>

      {status === "success" || status === "already" ? (
        <p className="text-sm text-green-600 dark:text-green-400 font-medium">
          {status === "already"
            ? "You're already subscribed!"
            : "Thanks for subscribing!"}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-4 py-2 text-sm bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
