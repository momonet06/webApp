import { cache } from "react";

import { getStrapiURL } from "./helper-api";
export const preload = (path: string) => {
  void getStrapiData(path);
};

export const getStrapiData = cache(async (path: string) => {
  try {
    const response = await fetch(getStrapiURL(path));
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const getPage = async(path:string) =>{
  try {
    const page = await getStrapiData('/api/pages?filters[path]='+path)
    if(!page) return null
      return page
  } catch (error) {
    console.error(error)
  }
}