"use client"

import React from 'react';

import { supabase } from 'src/utils/supabaseClient';

import { GuestGuard } from 'src/auth/guard';
import { setUserInfo, setAccessToken, setRefreshToken, getUserProfileData } from 'src/auth/context/jwt/utils';

export default function OAuthPage() {
  // React.useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.hash.substring(1));
  //   const accessToken = searchParams.get('access_token');
  //   const refreshToken = searchParams.get('refresh_token');
  //   if (accessToken && refreshToken) {
  //     setAccessToken(accessToken);
  //     setRefreshToken(refreshToken);
  //     window.location.href = `${window.location.origin}/dashboard`;
  //   }
  // }, []);
  React.useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const searchParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = searchParams.get('access_token');
        const refreshToken = searchParams.get('refresh_token');

        const { error } = await supabase.auth.setSession({
          access_token: accessToken || '',
          refresh_token: refreshToken || '',
        });

        if (error) throw error;

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          console.log('User authenticated:', user);
          await setAccessToken(accessToken);
          setUserInfo(user);
          if (refreshToken) setRefreshToken(refreshToken);
          const user_profile = getUserProfileData();
          console.log('user_profile-oauth', user_profile)
          if (user_profile?.terms) {
            window.location.href = `${window.location.origin}/dashboard`;
          } else {
            window.location.href = `${window.location.origin}/dashboard/user/profile-setup`;
          }
        } else {
          throw new Error('User is null after authentication');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
      }
    };

    handleAuthCallback();
  }, []);
  return <GuestGuard><h1>Authenticating...</h1></GuestGuard>;
}
