'use client';

import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';
import { supabase } from "src/utils/supabaseClient";

import { useUserProfile } from 'src/store/user/userProfile';
import {
  DEMO_USER,
  setDemoSession,
  clearDemoSession,
  DEMO_ACCESS_TOKEN,
  DEMO_USER_PROFILE,
  isDemoSessionEnabled,
} from 'src/auth/demo-user';

import { AuthContext } from './auth-context';
import { AuthUserType, ActionMapType, AuthStateType } from '../../types';
import {
  isValidToken,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  loadUserProfileData,
} from './utils';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

// const STORAGE_KEY = 'access_token';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setUserInfo = useUserProfile((_state) => _state.setUserInfo);
  const setUserProfileInfo = useUserProfile((_state) => _state.setUserProfileInfo);

  const initialize = useCallback(async () => {
    try {
      const demoModeEnabled = process.env.NEXT_PUBLIC_ENABLE_DEMO_USER === 'true';
      const demoSessionEnabled = demoModeEnabled || isDemoSessionEnabled();

      if (demoSessionEnabled) {
        setDemoSession();
        setUserInfo(DEMO_USER);
        setUserProfileInfo(DEMO_USER_PROFILE);

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...DEMO_USER,
              access_token: DEMO_ACCESS_TOKEN,
              refresh_token: DEMO_ACCESS_TOKEN,
            },
          },
        });

        return;
      }

      const accessToken = getAccessToken();

      if (accessToken !== 'undefined' && accessToken && isValidToken(accessToken)) {
        const { userInfo, userProfileInfo } = await setAccessToken(accessToken);
        // const user = getUserInfo();
        setUserInfo(userInfo);
        setUserProfileInfo(userProfileInfo);

        dispatch({
          type: Types.INITIAL,
          payload: {
            user: {
              ...userInfo,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, [setUserInfo, setUserProfileInfo]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN WITH EMAIL AND PASSWORD
  const loginWithEmailAndPassword = useCallback(async (email: string, password: string) => {
    const playloadData = {
      email,
      password,
    };

    const res = await axios.post(endpoints.auth.loginWithEmailAndPassword, playloadData);
    const { data, error } = res.data;

    if (!data || error) {
      const { message } = error;
      throw new Error(message || 'Login failed');
    }

    const { user, session } = data;
    const { access_token, refresh_token } = session;

    if (session) {
      await setAccessToken(access_token);
      setRefreshToken(refresh_token);
    }

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          access_token,
          refresh_token,
        },
      },
    });
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    const playloadData = {
      email,
    };

    await axios.post(endpoints.auth.apiPasswordResetRequest, playloadData);
  }, []);

  // LOGIN WITH CODE SEND - EMAIL OR PHONE
  const loginWithCodeSend = useCallback(async (email: string, phone: string) => {
    const playloadData = {
      ...(email && { email }),
      ...(phone && { phone }),
    };

    const res = await axios.post(endpoints.auth.loginWithCodeSend, playloadData);
    const { data, error } = res.data;

    if (!data || error) {
      const { message } = error;
      throw new Error(message || 'Send code failed');
    }
  }, []);

  // LOGIN WITH CODE VERIFY - EMAIL OR PHONE
  const loginWithCodeVerify = useCallback(async (email: string, phone: string, code: string) => {
    const playloadData = {
      ...(email && { email }),
      ...(phone && { phone }),
      token: code,
      type: email ? 'email' : 'sms',
    };

    const res = await axios.post(endpoints.auth.loginWithCodeVerify, playloadData);
    const { data, error } = res.data;

    if (!data || error) {
      const { message } = error;
      throw new Error(message || 'Login failed');
    }

    const { user, session } = data;
    const { access_token, refresh_token } = session;

    if (session) {
      await setAccessToken(access_token);
      setRefreshToken(refresh_token);
    }

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          access_token,
          refresh_token,
        },
      },
    });
  }, []);

  const loginWithMetamask = useCallback(async (account: string, provider: any) => {
    const result = await axios.post(endpoints.auth.loginWithMetamaskNonce, {
      address: account,
    });

    if (result.status !== 200) {
      return;
    }

    if (result.data == null) {
      return;
    }

    const metamaskUser = result.data.user[0];

    if (provider == null) {
      return;
    }

    const signature = await provider.request({
      method: 'personal_sign',
      params: [metamaskUser.metamask_nonce, metamaskUser.metamask_address],
    });

    const response = await axios.post(endpoints.auth.loginWithMetamaskSignin, {
      address: metamaskUser.metamask_address,
      signedMessage: signature,
      nonce: metamaskUser.metamask_nonce,
    });

    const { token, user, error } = response.data;

    if (error) {
      throw new Error(error);
    } else {
      if (token) {
        await supabase.auth.setSession({
          access_token: token,
          refresh_token: token,
        });
        await setAccessToken(token);
      }

      dispatch({
        type: Types.LOGIN,
        payload: {
          user: {
            ...user,
            access_token: token,
          },
        },
      });
    }
  }, []);

  const loginWithBinance = useCallback(async (userId: string) => {
    const response = await axios.post(endpoints.auth.loginWithBinance, {
      userId,
    });
    const responseData = response.data;
    if (responseData.error) {
      throw new Error(responseData.error);
    } else {
      const { user, token } = responseData.data;
      if (token) {
        await setAccessToken(token);
      }

      dispatch({
        type: Types.LOGIN,
        payload: {
          user: {
            ...user,
            access_token: token,
          },
        },
      });
    }
  }, []);

  // REGISTER
  const register = useCallback(async (email: string, password: string) => {
    const payloadData = {
      email,
      password,
    };

    const res = await axios.post(endpoints.auth.register, payloadData);
    const { data, error } = res.data;

    if (!data || error) {
      const { message } = error;
      throw new Error(message || 'Rigister failed');
    }

    const { user } = data;

    if (!user) {
      throw new Error("Can't register user");
    }
  }, []);

  const setUser = useCallback(async (user: any, access_token: string) => {
    await setAccessToken(access_token);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...user,
          access_token,
        },
      },
    });
  }, []);

  const loginAsDemoUser = useCallback(async () => {
    setDemoSession();
    setUserInfo(DEMO_USER);
    setUserProfileInfo(DEMO_USER_PROFILE);

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: {
          ...DEMO_USER,
          access_token: DEMO_ACCESS_TOKEN,
          refresh_token: DEMO_ACCESS_TOKEN,
        },
      },
    });
  }, [setUserInfo, setUserProfileInfo]);

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      await axios.post(endpoints.auth.logout, {});
      setAccessToken(null);
      setRefreshToken(null);
      setUserInfo(null);
      setUserProfileInfo(null);
      loadUserProfileData(false);
      clearDemoSession();
    } catch (error) {
      setAccessToken(null);
      setRefreshToken(null);
      setUserInfo(null);
      setUserProfileInfo(null);
      loadUserProfileData(false);
      clearDemoSession();
    }
    dispatch({
      type: Types.LOGOUT,
    });
  }, [setUserInfo, setUserProfileInfo]);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      loginWithEmailAndPassword,
      forgotPassword,
      loginWithCodeSend,
      loginWithCodeVerify,
      loginWithMetamask,
      loginWithBinance,
      register,
      setUser,
      loginAsDemoUser,
      logout,
    }),
    [
      loginWithEmailAndPassword,
      forgotPassword,
      loginWithCodeSend,
      loginWithCodeVerify,
      loginWithMetamask,
      loginWithBinance,
      logout,
      loginAsDemoUser,
      setUser,
      register,
      state.user,
      status,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
