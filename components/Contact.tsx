"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
              Not sure which bundle
              <br />
              is right for you?
            </h2>
            <p className="text-gray-400 mt-4 text-lg">
              We&apos;ll help. Drop us a message or book a free 15-minute call —
              no sales pitch, just advice.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <svg
                    className="w-7 h-7 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#0F0F0F] mb-2">
                  Message sent!
                </h3>
                <p className="text-gray-400 text-sm">
                  We&apos;ll get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your name"
                      className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm text-[#0F0F0F] border border-transparent focus:outline-none focus:border-[#E8603C] transition-colors placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm text-[#0F0F0F] border border-transparent focus:outline-none focus:border-[#E8603C] transition-colors placeholder:text-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us about your situation — move-in date, room size, any questions..."
                    rows={5}
                    className="w-full bg-[#F5F5F5] rounded-xl px-4 py-3 text-sm text-[#0F0F0F] border border-transparent focus:outline-none focus:border-[#E8603C] transition-colors resize-none placeholder:text-gray-300"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="submit"
                    className="flex-1 bg-[#E8603C] text-white font-semibold py-4 rounded-xl hover:bg-[#D4542F] transition-colors text-sm"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    className="flex-1 border-2 border-[#0F0F0F] text-[#0F0F0F] font-semibold py-4 rounded-xl hover:bg-[#0F0F0F] hover:text-white transition-all text-sm"
                  >
                    Book a free call
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact info strip */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              hello@intermove.nl
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Amsterdam, Netherlands
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
