import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { FullPageLoader } from '~/components/FullPageLoader/FullPageLoader';
import { useCheckAuthQuery } from '~/query/services/auth-api';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('accessToken');
    const skip = !!token;
    const { isLoading, isError } = useCheckAuthQuery(undefined, { skip });
    const navigate = useNavigate();

    useEffect(() => {
        if (!token || isError) {
            navigate('/auth', { replace: true });
        }
    }, [token, isError, navigate]);

    if (!token) return null;
    if (isLoading) return <FullPageLoader />;

    return <>{children}</>;
}
