import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  auth: {
    me: '/api/auth/me',
    register: '/api/auth/signup/',
    logout: '/api/auth/signout/',
    loginWithEmailAndPassword: '/api/auth/signin-email-password/',
    apiPasswordResetRequest: '/api/auth/reset-password-request/',
    passwordResetConfirm: '/api/auth/reset-password-confirm/',
    loginWithCodeSend: '/api/auth/signin-send-token/',
    loginWithCodeVerify: '/api/auth/signin-verify-token/',

    loginWithGoogle: '/api/auth/signin-google/',

    loginWithMetamaskNonce: '/api/auth/signin-metamask/nonce/',
    loginWithMetamaskSignin: '/api/auth/signin-metamask/signin/',
    loginWithMetamask: '/api/auth/signin-metamask/sign/',

    loginWithBinance: '/api/auth/signin-binance/',

    token: '/api/auth/token/',

    confirmEmail: '/auth/confirm_email/',
    resendEmail: '/auth/resend_email_token/',
    confirmPhone: '/auth/confirm_phone/',
    passwordResetRequest: '/auth/password_reset/',
    passwordResetValidate: '/auth/password_reset/validate_token/',
    passwordUpdate: '/auth/update_password/',

    profileUpdate: '/auth/user/profile/update/',

    registerFaceId: '/api/webauthn-register/',
  },
  membership: {
    plans: '/api/membership/plans/',
    userPlans: '/api/membership/user_plans/',
    createPaymentIntent: '/api/membership/user_plans/payment_intent/create/',
    confirmPaymentIntent: '/api/membership/user_plans/payment_intent/confirm/',
    cancelUserPlan: '/api/membership/user_plans/cancel/',
    ugradeUserPlan: '/api/membership/user_plans/update/',
  },
  credits: {
    credits: '/api/credits/',
    createPaymentIntent: '/api/credits/payment_intent/create/',
    confirmPaymentIntent: '/api/credits/payment_intent/confirm/',
  },
  binance: "/api/binance",

  kanban: '/api/kanban',
  calendar: '/api/calendar',
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  dashboard: {
    'plan_usage': '/api/overview/plan_usage',
    'media_storage': '/api/overview/media_storage',
    'agents': '/api/overview/agents',
    'models': '/api/overview/models',
    'hugging_face': '/api/overview/hugging_face',
    'stats': '/api/overview/stats',
    'price_charts': '/api/overview/priceCharts',
  },
  profile: {
    index: '/api/profile',
    setPassword: '/api/profile/set-password',
    models: '/api/profile/image/models',
    generateImage: '/api/profile/image/generate',
    updateAvatar: '/api/profile/image',
    exchange: '/api/exchanges',
    exchange_keys: '/api/exchanges/key',
    status: '/api/profile/status',
    social: '/api/profile/social',
  },
  history: {
    crgptToken: '/api/history/crgpt-token',
    confirmPaymentIntent: '/api/history/crgpt-token/confirm',
    balance: '/api/history/crgpt-token/balance',
    approve: '/api/history/crgpt-token/withdraw',
    price: '/api/history/crgpt-token/price',
    updateAddress: '/api/history/crgpt-token/update-address',
  },
  exchange: {
    index: '/api/exchanges',
    key: '/api/exchanges/key',
  },
  strategy: {
    index: '/api/strategies',
    initial_prompt: '/api/strategies/initial-prompt',
  },
  video: (url: string) => `/api/video-stream?url=${url}`,
};

