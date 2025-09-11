"use client";

import { useLinkStatus } from "next/dist/client/link";

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();
  return pending ? (
    <div
      role="status"
      aria-label="Loading"
      aria-busy="true"
      className="spinner"
    />
  ) : null;
}
