"use client";
import { useState, useEffect } from 'react';

/**
 * React hook that allows you to use the store.
 *
 * @template T - The type of the store state.
 * @template F - The type of the data returned by the callback.
 * @param {(callback: (state: T) => unknown) => unknown} store - The store that will be used by the hook.
 * @param {(state: T) => F} callback - The callback that will be used to transform the store state.
 * @returns {F | undefined} - The data returned by the callback.
 */
export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
): F | undefined => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};
