import { paths } from 'src/routes/paths';

import axios, { endpoints } from 'src/utils/axios';

import {
  DEMO_USER,
  setDemoSession,
  DEMO_ACCESS_TOKEN,
  DEMO_USER_PROFILE,
  isDemoSessionEnabled,
} from 'src/auth/demo-user';

// ----------------------------------------------------------------------

function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );

  return JSON.parse(jsonPayload);
}

// ----------------------------------------------------------------------

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }

  if (accessToken === DEMO_ACCESS_TOKEN) {
    return true;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const tokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer;

  const currentTime = Date.now();

  // Test token expires after 10s
  // const timeLeft = currentTime + 10000 - currentTime; // ~10s
  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    localStorage.removeItem('accessToken');

    window.location.href = paths.auth.jwt.login;
  }, timeLeft);
};

// ----------------------------------------------------------------------

export const loadUserProfileData = async (flag: boolean = true) => {
  if (isDemoSessionEnabled()) {
    localStorage.setItem('userProfile', JSON.stringify(DEMO_USER_PROFILE));
    return DEMO_USER_PROFILE;
  }

  if (flag) {
    try {
      const response = await axios.get(endpoints.profile.index);
      if (response.data) {
        localStorage.setItem('userProfile', JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      localStorage.setItem('userProfile', JSON.stringify({}));
      return {};
    }
  }
  localStorage.setItem('userProfile', JSON.stringify({}));
  return {};
};

export const loadUserData = async (accessToken) => {
  if (accessToken === DEMO_ACCESS_TOKEN || isDemoSessionEnabled()) {
    localStorage.setItem('user', JSON.stringify(DEMO_USER));
    return DEMO_USER;
  }

  try {
    const response = await axios.get(`${endpoints.auth.me}?token=${accessToken}`);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
    return response.data.data.user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    localStorage.setItem('user', JSON.stringify({}));
    return {};
  }
};

export const getUserProfileData = () => {
  const userProfileInfoByString = localStorage.getItem('userProfile');
  if (userProfileInfoByString) return JSON.parse(userProfileInfoByString);
  return {};
}

export const setAccessToken = async (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('access_token', accessToken);

    if (accessToken === DEMO_ACCESS_TOKEN || isDemoSessionEnabled()) {
      setDemoSession();
      delete axios.defaults.headers.common.Authorization;
      return { userInfo: DEMO_USER, userProfileInfo: DEMO_USER_PROFILE };
    }

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axios.defaults.headers.common['Content-Type'] = `application/json`;

    const userProfileInfo = await loadUserProfileData();
    const userInfo = await loadUserData(accessToken);

    // This function below will handle when token is expired
    const { exp } = jwtDecode(accessToken); // ~3 days by minimals server
    tokenExpired(exp);

    return { userInfo, userProfileInfo };
  }

  localStorage.removeItem('access_token');
  delete axios.defaults.headers.common.Authorization;
  return { userInfo: {}, userProfileInfo: {} };
};

export const getAccessToken = () => localStorage.getItem('access_token');

export const getRefreshToken = () => localStorage.getItem('refresh_token');


export const setRefreshToken = (refreshToken: string | null) => {
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  } else {
    localStorage.removeItem('refresh_token');
  }
}

export const setUserInfo = (user: any) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}

export const getUserInfo = () => {
  const userInfoByString = localStorage.getItem('user');
  if (userInfoByString) return JSON.parse(userInfoByString);
  return {};
}
