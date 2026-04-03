"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ textAlign: "center", padding: "0 24px" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F0F0F", marginBottom: 12 }}>
            Something went wrong
          </h2>
          <p style={{ color: "#9CA3AF", fontSize: 14, marginBottom: 32 }}>
            A critical error occurred. Please refresh the page.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#00A86B",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "12px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
