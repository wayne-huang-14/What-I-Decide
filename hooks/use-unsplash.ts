import { createApi } from 'unsplash-js';
import { useState, useCallback } from 'react';

export const useUnsplashApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(async (params = {}, headers = {}) => {
    setIsLoading(true);

    const unsplash = createApi({
      accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
    });
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const result = await unsplash.photos.get(params, { headers, signal });

      if (result.errors) {
        throw new Error(result.errors[0]);
      }

      setIsLoading(false);
      return result.response;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);

      // Components using the hook will handle the error
      throw err;
    }
  }, []);

  const clearError = () => {
    setError(null);
  };
  return { isLoading, error, sendRequest, clearError };
};
