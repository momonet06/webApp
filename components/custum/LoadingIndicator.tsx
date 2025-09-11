"use client";

import { useLinkStatus } from "next/link";

//import { useLinkStatus } from "next/link";

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();
  return pending ? (
    <div role="status" aria-label="Loading" aria-busy="true" className="spinner" />
  ) : null;
}
