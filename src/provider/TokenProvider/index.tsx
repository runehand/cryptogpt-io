'use client';

import React, { useEffect } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

import LoadingCubeScreen from 'src/components/loading-screen/loading-cube-screen';

export const TokenSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { logout, setUser } = useAuthContext();
    const [visible, setVisible] = React.useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        // console.log('tokenParam', tokenParam);
        async function verifyToken() {
            if (tokenParam) {
                try {

                    const { data }: { success: boolean, data: any } = await axios.post(endpoints.auth.token,
                        {
                            "token": tokenParam
                        }
                    );
                    if (data?.success) {
                        const { access_token, user } = data.data;
                        // console.log(access_token, user)
                        await setUser(user, access_token);
                        setVisible(true);
                    } else {
                        await logout();
                        router.replace(paths.auth.jwt.login);
                    }
                } catch (error) {
                    await logout();
                    router.replace(paths.auth.jwt.login);
                }
            } else {
                setVisible(true);
            }
        }
        verifyToken();
    }, [searchParams, setVisible, router, logout, setUser]);
    if (visible) {
        return children;
    }

    return <LoadingCubeScreen />;
};
