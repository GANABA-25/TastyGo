import { QueryKey, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

type UseFetchProps<TData> = {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  staleTime?: number;
  errorMessage?: string;
};

export const useFetch = <TData>({
  queryKey,
  queryFn,
  staleTime = 5000,
  errorMessage = "Something went wrong.",
}: UseFetchProps<TData>) => {
  const query = useQuery<TData, Error>({
    queryKey,
    queryFn,
    staleTime,
  });

  useEffect(() => {
    if (!query.isError) return;

    let message = errorMessage;

    if (axios.isAxiosError(query.error)) {
      message =
        query.error.response?.data?.message ??
        query.error.message ??
        errorMessage;
    } else if (query.error instanceof Error) {
      message = query.error.message || errorMessage;
    }

    Toast.show({
      type: "error",
      text1: message,
    });
  }, [query.isError, query.error, errorMessage]);

  return query;
};
