"use client";

import { useState, useRef } from "react";

type Condition = "" | "good" | "fair" | "poor";

interface FormState {
  name: string;
  email: string;
  description: string;
  condition: Condition;
}

export default function SellToUs() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    description: "",
    condition: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  return (
    <section id="sell" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#F5F5F5] text-gray-500 text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full mb-6">
              Circular Economy
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F0F0F] tracking-tight">
              Sell your furniture to us
            </h2>
            <p className="text-gray-400 mt-4 text-lg leading-relaxed">
              Got furniture you no longer need? We buy second-hand pieces to
              recirculate to the next generation of students. Good for you, good
              for the planet.
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-12 text-center">
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
                Submission received!
              </h3>
              <p className="text-gray-400 text-sm">
                We&apos;ll review your item and get back to you within 24 hours
                with a valuation.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#F5F5F5] rounded-2xl p-8 space-y-5"
            >
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
                    placeholder="Your full name"
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-[#0F0F0F] border border-gray-100 focus:outline-none focus:border-[#E8603C] transition-colors placeholder:text-gray-300"
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
                    className="w-full bg-white rounded-xl px-4 py-3 text-sm text-[#0F0F0F] border border-gray-100 focus:outline-none focus:border-[#E8603C] transition-colors placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">
                  Item description
                </label>
                <textarea
                  required
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  placeholder="What are you selling? Include type, dimensions, brand if known."
                  rows={4}
                  className="w-full bg-white rounded-xl px-4 py-3 text-sm text-[#0F0F0F] border border-gray-100 focus:outline-none focus:border-[#E8603C] transition-colors resize-none placeholder:text-gray-300"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">
                  Condition
                </label>
                <div className="relative">
                  <select
                    required
                    value={form.condition}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        condition: e.target.value as Condition,
                      }))
                    }
                    className="w-full appearance-none bg-white rounded-xl px-4 py-3 text-sm text-[#0F0F0F] border border-gray-100 focus:outline-none focus:border-[#E8603C] transition-colors"
                  >
                    <option value="">Select condition</option>
                    <option value="good">Good — minor signs of use</option>
                    <option value="fair">
                      Fair — visible wear, fully functional
                    </option>
                    <option value="poor">
                      Poor — significant wear or damage
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <svg
                      className="w-4 h-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">
                  Photo{" "}
                  <span className="normal-case font-normal text-gray-300">
                    (optional)
                  </span>
                </label>
                <div
                  className="w-full bg-white rounded-xl px-4 py-5 border-2 border-dashed border-gray-200 text-center cursor-pointer hover:border-[#E8603C] transition-colors group"
                  onClick={() => fileRef.current?.click()}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {fileName ? (
                    <p className="text-sm text-[#0F0F0F] font-medium">
                      {fileName}
                    </p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-400 group-hover:text-[#E8603C] transition-colors">
                        Click to upload a photo
                      </p>
                      <p className="text-xs text-gray-300 mt-1">
                        JPG or PNG, up to 10 MB
                      </p>
                    </>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#E8603C] text-white font-semibold py-4 rounded-xl hover:bg-[#D4542F] transition-colors text-sm"
              >
                Submit Item
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
