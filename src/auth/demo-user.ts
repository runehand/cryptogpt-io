export const DEMO_SESSION_KEY = 'demo_session';
export const DEMO_ACCESS_TOKEN = 'demo-user-token';
export const DEMO_REFRESH_TOKEN = 'demo-refresh-token';

export const DEMO_USER = {
  id: 'demo-user-id',
  displayName: 'Jaydon Frankie',
  email: 'demo@cryptogpt.app',
  password: 'demo1234',
  photoURL: '/logo/logo_single.png',
  phoneNumber: '+40 777666555',
  country: 'United States',
  address: '90210 Broadway Blvd',
  state: 'California',
  city: 'San Francisco',
  zipCode: '94116',
  about:
    'Demo user seeded for UI review. This account is pre-authenticated so reviewers can inspect the dashboard without backend setup.',
  role: 'admin',
  isPublic: true,
};

export const DEMO_USER_PROFILE = {
  user_name: 'Jaydon Frankie',
  avatar: '/logo/logo_single.png',
  terms: true,
  is_admin: true,
  languages: [{ code: 'en', name: 'English' }],
  status: 'online',
};

export const isDemoSessionEnabled = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(DEMO_SESSION_KEY) === 'true';
};

export const setDemoSession = () => {
  localStorage.setItem(DEMO_SESSION_KEY, 'true');
  localStorage.setItem('access_token', DEMO_ACCESS_TOKEN);
  localStorage.setItem('refresh_token', DEMO_REFRESH_TOKEN);
  localStorage.setItem('user', JSON.stringify(DEMO_USER));
  localStorage.setItem('userProfile', JSON.stringify(DEMO_USER_PROFILE));
};

export const clearDemoSession = () => {
  localStorage.removeItem(DEMO_SESSION_KEY);
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  localStorage.removeItem('userProfile');
};
