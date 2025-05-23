import { getStrapiURL } from "@/lib/helper-api";

export async function mutateData(method: string, path: string, payload?: any) {
  const baseUrl = getStrapiURL();
  const authToken = process.env.NEXT_PUBLIC_STRAPI_ACCESS_TOKEN;
  const url = new URL(path, baseUrl);

  if (!authToken) throw new Error("No auth token found");

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ ...payload }),
    });

    if (method === "DELETE") {
      return response.ok;
    }

    const data = await response?.json();
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
