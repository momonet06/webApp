import useSWR from "swr";
import { getStrapiURL } from "@/lib/helper-api";

interface Actuality {
  data: {
    documentId: string;
    title: string;
    description: string;
    category: string;
    view: number;
    image: [
      {
        documentId: string;
        id: number;
        name: string;
        url: string;
        alternativeText: string;
        caption: string;
      }
    ];
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    createdBy: {
      documentId: string;
      firstname: string;
      lastname: string;
      username: string;
    };
  };
}
const fetcher = (url: string) =>
  fetch(getStrapiURL(url), { cache: "no-cache" }).then((r) => r.json());
const useActuality = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<Actuality>(
    `/api/actualities/${id}`,
    fetcher,
    { revalidateIfStale: true, refreshInterval: 30000 }
  );
  return {
    actuality: data,
    loading: isLoading,
    error,
    mutate,
  };
};
export default useActuality;
