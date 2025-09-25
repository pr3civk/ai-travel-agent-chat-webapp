'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isServer } from '@/utils/env';

type Props = {
  chatId: string;
  defaultPlaceholder?: string;
};

export function useChatInput({ chatId, defaultPlaceholder }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState('');

  const cachedLocalStorageKey = useMemo(() => {
    const CACHE_KEY_PREFIX = 'cached-chat-input-';

    if (!chatId) {
      return undefined;
    }
    return `${CACHE_KEY_PREFIX}${chatId}`;
  }, [chatId]);

  useEffect(() => {
    if (!chatId || isServer || !cachedLocalStorageKey) {
      return;
    }

    const timeout = setTimeout(() => {
      localStorage.setItem(cachedLocalStorageKey, inputValue);
    }, 600);

    return () => clearTimeout(timeout);
  }, [chatId, inputValue, cachedLocalStorageKey]);

  useEffect(() => {
    if (!chatId || isServer || !cachedLocalStorageKey) {
      return;
    }

    const cachedInputValue = localStorage.getItem(cachedLocalStorageKey);
    if (!cachedInputValue) {
      return;
    }

    setInputValue(cachedInputValue);
  }, [chatId, cachedLocalStorageKey]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.preventDefault();

      const value = e.target.value;
      setInputValue(value);
    },
    [],
  );

  const resetInputValue = useCallback(() => {
    if (!chatId || isServer || !cachedLocalStorageKey) {
      return;
    }

    setInputValue('');
    localStorage.removeItem(cachedLocalStorageKey);
  }, [chatId, cachedLocalStorageKey]);

  const handleInputInput = useCallback(
    (e: React.InputEvent<HTMLTextAreaElement>) => {
      e.preventDefault();

      const target = e.target as HTMLTextAreaElement;
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    },
    [],
  );

  const options = useMemo(
    () => ({
      ref: inputRef,
      value: inputValue,
      placeholder: defaultPlaceholder,
      onChange: handleInputChange,
      onInput: handleInputInput,
    }),
    [inputValue, defaultPlaceholder, handleInputChange, handleInputInput],
  );

  return {
    options,
    inputRef,
    inputValue,
    resetInputValue,
    handleInputInput,
    handleInputChange,
    setInputValue,
  };
}
