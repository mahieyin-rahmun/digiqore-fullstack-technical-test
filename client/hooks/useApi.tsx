import axios from "axios";
import { useCallback } from "react";
import { useMemo, useState } from "react";

/**
 * A hook to make request to APIs
 * @param {string} endpoint The api endpoint
 * @param {string} method  one of "GET" | "POST" | "PUT" | "DELETE". default = "GET"
 * @param {any} requestPayload The request payload in case of POST, PUT
 * @returns {Object} an object consisting of the following keys:
 * {
 *  data - the data or undefined,
 *  error - the error message or undefined,
 *  loading - boolean indicating if the request is in progress,
 *  fetch - the fetch function to make request to the api endpoint
 * }
 */
export default function useApi<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  requestPayload: any = undefined,
) {
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:3001/api/v1",
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return instance;
  }, []);

  // state managers
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const resetState = () => {
    setLoading(false);
    setData(undefined);
    setError(undefined);
  };

  // the fetch function, can be used to retrigger fetches
  const fetch = useCallback(() => {
    resetState();
    setLoading(true);

    axiosInstance
      .request({
        method,
        url: endpoint,
        data: requestPayload,
      })
      .then((response) => {
        const data = response.data;
        setData(data);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(
            error.response.data?.data ||
              error.response.data?.message ||
              error.message,
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          setError("Something went wrong, please try again later.");
        }
      })
      .finally(() => setLoading(false));
  }, [endpoint, axiosInstance, method, requestPayload]);

  return {
    data,
    error,
    loading,
    fetch,
  };
}
