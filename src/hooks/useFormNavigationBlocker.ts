import { useCallback, useEffect, useMemo, useRef } from 'react';
import { UseFormWatch } from 'react-hook-form';
import { BlockerFunction, useBlocker } from 'react-router';

import { FormData } from '~/components/NewRecipe/NewRecipe';

type UseFormNavigationBlockerParams = {
    watch: UseFormWatch<FormData>;
    onOpen: () => void;
};

export const useFormNavigationBlocker = ({ watch, onOpen }: UseFormNavigationBlockerParams) => {
    const skipNextBlockRef = useRef(false);

    const watchValues = watch();
    const isFormTrulyDirty = useMemo(
        () =>
            watchValues.title !== '' ||
            watchValues.description !== null ||
            watchValues.image !== null ||
            watchValues.categoriesIds.length > 0 ||
            watchValues.ingredients.some((i) => i.title || i.count !== 100 || i.measureUnit) ||
            watchValues.steps.some((s) => s.description || s.image),
        [watchValues],
    );

    const shouldBlock = useCallback<BlockerFunction>(
        () => !skipNextBlockRef.current && isFormTrulyDirty,
        [isFormTrulyDirty],
    );

    const blocker = useBlocker(shouldBlock);

    useEffect(() => {
        if (blocker.state === 'blocked') {
            if (skipNextBlockRef.current) {
                skipNextBlockRef.current = false;
                blocker.proceed();
            } else {
                onOpen();
            }
        }
    }, [blocker, onOpen]);

    const allowNextNavigation = () => {
        skipNextBlockRef.current = true;
    };

    return { blocker, allowNextNavigation };
};
