import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export const useTabIndex = (subCategories?: { category: string }[]) => {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop();
    const [tabIndex, setTabIndex] = useState(0);

    useEffect(() => {
        const index = subCategories?.findIndex((cat) => cat.category === currentPath);
        setTabIndex(index === -1 ? 0 : index || 0);
    }, [currentPath, subCategories]);

    return { tabIndex, setTabIndex };
};
