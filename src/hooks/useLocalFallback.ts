import { useEffect, useState } from 'react';

export const useLocalFallback = <T>(
    key: string,
    isError: boolean,
    primaryData: T | null | undefined,
): T | null => {
    const [fallback, setFallback] = useState<T | null>(null);

    useEffect(() => {
        if (isError && !primaryData) {
            const cached = localStorage.getItem(key);
            if (cached) {
                try {
                    const parsed = JSON.parse(cached) as T;
                    setFallback(parsed);
                } catch (e) {
                    console.error(`Ошибка при парсинге localStorage по ключу "${key}":`, e);
                }
            }
        }
    }, [isError, primaryData, key]);

    return fallback;
};
