"use client";
import useSWR from "swr";

export default function useUser({ id }: { id: number }) {
  const { data, isLoading, error, mutate } = useSWR(
    `/api/users/${id}?populate=avatar`
  );
  return {
    user: data,
    loading: isLoading,
    error,
    mutate,
  };
}
