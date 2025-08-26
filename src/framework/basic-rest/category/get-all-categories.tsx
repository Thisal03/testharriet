import {
  CategoriesQueryOptionsType,
  Category,
} from "@/framework/basic-rest/types";
import http from "@/framework/basic-rest/utils/http";
import { API_ENDPOINTS } from "@/framework/basic-rest/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchCategories = async () => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.CATEGORIES);
  return {
    categories: {
      data: data as Category[],
    },
  };
};

const fetchAncientCategories = async () => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.CATEGORIES_ANCIENT);
  return {
    categories: {
      data: data as Category[],
    },
  };
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  const queryFn =
    options.demoVariant === "ancient"
      ? fetchAncientCategories
      : fetchCategories;

  return useQuery<{ categories: { data: Category[] } }, Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn,
  });
};
