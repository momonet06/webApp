"use client";
import { SWRConfig } from "swr";
export const SWRProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: true,
        fetcher: (url: string) =>
          fetch(url)
            .then((res) => res.json())
            .then((data) => data.data),
      }}
    >
      {children}
    </SWRConfig>
  );
};
