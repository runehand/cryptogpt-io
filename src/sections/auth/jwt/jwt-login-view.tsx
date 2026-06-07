'use client';

import Image from 'next/image';
import { useState } from 'react';
// import { cookies } from 'next/headers'
import { MuiOtpInput } from 'mui-one-time-password-input';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Link,
  Alert,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useMetaMask } from 'src/hooks/use-metamask';

import { isEmail, isPhoneNumber } from 'src/utils/validators';

import { supabase } from 'src/lib/supabase';
import { useAuthContext } from 'src/auth/hooks';
import { BINANCE_OAUTH_CREDENTIALS } from 'src/config-global';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const {
    loginWithEmailAndPassword,
    loginWithCodeSend,
    loginWithCodeVerify,
    loginWithMetamask,
    loginAsDemoUser,
  } = useAuthContext();
  const metaMask = useMetaMask();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');

  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const isShowPassword = useBoolean(false);
  const isSubmitting = useBoolean(false);
  const isShowLoginOptions = useBoolean(false);
  const [valueState, setValueState] = useState<null | 'email' | 'phone'>(null);
  const isEmailWithPasswordCase = useBoolean(false);
  const isEmailWithCodeCase = useBoolean(false);
  const isPhoneWithCodeCase = useBoolean(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEmail(e.target.value)) {
      setValueState('email');
    } else if (isPhoneNumber(e.target.value)) {
      setValueState('phone');
    } else {
      setValueState(null);
    }
    setEmail(e.target.value);
  };

  const handleContinue = async (type: 'password' | 'code' | undefined) => {
    setErrorMsg('');
    if (type === 'password') {
      isEmailWithPasswordCase.onTrue();
      isEmailWithCodeCase.onFalse();
      isPhoneWithCodeCase.onFalse();
    } else if (type === 'code') {
      const succcess = await handleLoginWithCodeSend(email, '');
      if (succcess) {
        isEmailWithCodeCase.onTrue();
        isEmailWithPasswordCase.onFalse();
        isPhoneWithCodeCase.onFalse();
      }
    } else {
      const succcess = await handleLoginWithCodeSend('', email);
      if (succcess) {
        isPhoneWithCodeCase.onTrue();
        isEmailWithPasswordCase.onFalse();
        isEmailWithCodeCase.onFalse();
      }
    }
  };

  const handleTryAgain = () => {
    setErrorMsg('');
    isEmailWithPasswordCase.onFalse();
    isEmailWithCodeCase.onFalse();
    isPhoneWithCodeCase.onFalse();
  };

  const handleLoginWIthEmailAndPassword = async () => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      await loginWithEmailAndPassword(email, password);
      enqueueSnackbar('Login successful', { variant: 'success' });
      isSubmitting.onFalse();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
      isSubmitting.onFalse();
    }
  };

  const handleDemoLogin = async () => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      await loginAsDemoUser();
      enqueueSnackbar('Demo user loaded', { variant: 'success' });
      router.replace(returnTo || paths.dashboard.root);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
      enqueueSnackbar('Failed to load demo user', { variant: 'error' });
    } finally {
      isSubmitting.onFalse();
    }
  };

  const handleLoginWithCodeSend = async (_email: string, _phone: string) => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      await loginWithCodeSend(_email, _phone);
      enqueueSnackbar('6-digital Code sent successful', { variant: 'success' });
      isSubmitting.onFalse();
      return true;
    } catch (error) {
      console.error(error);

      let errorMessage = 'An unknown error occurred';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.error) {
        errorMessage = error.error;
      }

      setErrorMsg(errorMessage);
      enqueueSnackbar(errorMessage, { variant: 'error' });
      isSubmitting.onFalse();
      return false;
    }
  };

  const handleLoginWithCodeVerify = async (_email: string, _phone: string, _code: string) => {
    setErrorMsg('');
    isSubmitting.onTrue();
    try {
      await loginWithCodeVerify(_email, _phone, _code);
      enqueueSnackbar('Login successful', { variant: 'success' });
      isSubmitting.onFalse();
    } catch (error) {
      console.error(error);
      setCode('');

      let errorMessage = 'An unknown error occurred';
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.error) {
        errorMessage = error.error;
      }

      setErrorMsg(errorMessage);
      enqueueSnackbar(errorMessage, { variant: 'error' });
    } finally {
      isSubmitting.onFalse();
    }
  };

  const handleCodeComplete = (value: string) => {
    if (isEmailWithCodeCase.value) {
      handleLoginWithCodeVerify(email, '', value);
    } else if (isPhoneWithCodeCase.value) {
      handleLoginWithCodeVerify('', email, value);
    }
  };

  const handleLoginWithMetamask = async () => {
    setErrorMsg('');
    isSubmitting.onTrue();

    const account = await metaMask.connect();

    try {
      await loginWithMetamask(account, metaMask.provider);
      enqueueSnackbar('Login successful', { variant: 'success' });
      isSubmitting.onFalse();
    } catch (ex) {
      console.warn('[MetaMask] Cannot login to MetaMask', ex);
      isSubmitting.onFalse();
      enqueueSnackbar('Something wrong while logging in to MetaMask!', { variant: 'error' });
    }
  };

  const handleLoginWithBinance = async () => {
    // Redirect to Binance
    const uriParams = `response_type=code&client_id=${encodeURIComponent(BINANCE_OAUTH_CREDENTIALS.clientId)}&redirect_uri=${encodeURIComponent(BINANCE_OAUTH_CREDENTIALS.redirectUri)}&scope=user:openId`;

    console.log(`${BINANCE_OAUTH_CREDENTIALS.loginUri}${uriParams}`);

    window.location.href = `${BINANCE_OAUTH_CREDENTIALS.loginUri}${uriParams}`;
  };

  const handleLoginWithGoogle = async () => {
    console.log('Login with Google');
    // const {statusText, data} = await axios.post(endpoints.auth.loginWithGoogle);
    // if (statusText === "OK" && data.url) {
    //   window.location.href = data.url;
    // } else {
    //   throw new Error(data.error || 'Failed to initiate OAuth login');
    // }
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/jwt/supabase-oauth-callback1?`,
      },
    });
  };

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to CryptoGPT</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack>
      <Stack spacing={2}>
        {!isEmailWithPasswordCase.value &&
          !isEmailWithCodeCase.value &&
          !isPhoneWithCodeCase.value && (
            <Stack spacing={2}>
              <TextField
                fullWidth
                type="text"
                label="Email or phone"
                placeholder="Enter phonenumber or email"
                value={email}
                onChange={handleEmailChange}
              />
              {valueState === 'email' && (
                <Stack direction="row" spacing={2}>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={() => handleContinue('password')}
                    startIcon={<Iconify icon="material-symbols:password" />}
                  >
                    Password
                  </Button>
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    onClick={() => handleContinue('code')}
                    startIcon={<Iconify icon="tabler:square-rounded-number-6" />}
                  >
                    Code
                  </Button>
                </Stack>
              )}
              {valueState !== 'email' && (
                <LoadingButton
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="button"
                  loading={isSubmitting.value}
                  disabled={valueState === null}
                  onClick={() => handleContinue(undefined)}
                >
                  Continue
                </LoadingButton>
              )}
            </Stack>
          )}

        {isEmailWithPasswordCase.value && (
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle2" sx={{
                color: 'primary.main',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {email || 'Email'}
              </Typography>
              <IconButton onClick={isEmailWithPasswordCase.onToggle}>
                <Iconify icon="clarity:edit-line" color="primary" />
              </IconButton>
            </Stack>
            <TextField
              name="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={isShowPassword.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={isShowPassword.onToggle} edge="end">
                      <Iconify
                        icon={isShowPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Link
              component={RouterLink}
              href={paths.auth.jwt.forgotPassword}
              variant="subtitle2"
              sx={{
                alignItems: 'center',
                display: 'inline-flex',
              }}
            >
              Forgot your password?
            </Link>
            <LoadingButton
              fullWidth
              variant="contained"
              color="primary"
              loading={isSubmitting.value}
              onClick={() => handleLoginWIthEmailAndPassword()}
            >
              Sign in
            </LoadingButton>
          </Stack>
        )}

        {(isEmailWithCodeCase.value || isPhoneWithCodeCase.value) && (
          <Stack spacing={2}>
            <MuiOtpInput
              autoFocus
              gap={1}
              length={6}
              TextFieldsProps={{
                placeholder: '-',
              }}
              value={code}
              onChange={(value) => setCode(value)}
              onComplete={(value) => handleCodeComplete(value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '48px',
                },
                '& input': {
                  textAlign: 'center',
                },
              }}
            />

            <LoadingButton
              fullWidth
              loading={isSubmitting.value}
              color="primary"
              variant="contained"
              onClick={handleTryAgain}
            >
              Try again
            </LoadingButton>
          </Stack>
        )}

        <Divider />

        <LoadingButton
          fullWidth
          variant="outlined"
          color="primary"
          loading={isSubmitting.value}
          onClick={handleDemoLogin}
        >
          Continue as Demo User
        </LoadingButton>

        <Button
          fullWidth
          endIcon={
            <Iconify
              icon="mingcute:down-line"
              sx={{
                transition: 'transform 0.3s',
                transform: isShowLoginOptions.value ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          }
          onClick={isShowLoginOptions.onToggle}
          sx={{
            mb: 2,
          }}
        >
          More options
        </Button>
      </Stack>

      <Stack
        spacing={2}
        sx={{
          transition: 'height 0.3s',
          height: isShowLoginOptions.value ? '232px' : 0,
          overflow: 'hidden',
        }}
      >
        {/* <LoadingButton
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={
            <Iconify
              icon="teenyicons:face-id-outline"
              width={24}
              height={24}
            />
          }
          loading={isSubmitting.value}
          // onClick={() => handleLoginWithFaceId()}
          sx={{
            mt: 2,
          }}
        >
          Continue with Face Id
        </LoadingButton> */}
        <LoadingButton
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={
            <Image
              src="/assets/icons/project/logo-metamask.png"
              alt="metamask"
              width={24}
              height={24}
            />
          }
          loading={isSubmitting.value}
          onClick={() => handleLoginWithMetamask()}
        >
          Continue with MetaMask
        </LoadingButton>
        <LoadingButton
          fullWidth
          variant="outlined"
          color="primary"
          startIcon={
            <Image
              src="/assets/icons/project/logo-binance.svg"
              alt="binance"
              width={24}
              height={24}
            />
          }
          loading={isSubmitting.value}
          onClick={() => handleLoginWithBinance()}
        >
          Continue with Binance
        </LoadingButton>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
              onClick={() => handleLoginWithGoogle()}
            >
              <Image
                src="/assets/icons/project/logo-google.png"
                alt="google"
                width={36}
                height={36}
              />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Iconify icon="logos:facebook" />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Iconify icon="logos:apple" />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Image src="/assets/icons/project/logo-okex.svg" alt="okex" width={36} height={36} />
            </LoadingButton>
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={2}>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Iconify icon="logos:twitter" />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Image
                src="/assets/icons/project/logo-slack.svg"
                alt="slack"
                width={36}
                height={36}
              />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Image
                src="/assets/icons/project/logo-telegram.svg"
                alt="telegram"
                width={36}
                height={36}
              />
            </LoadingButton>
            <LoadingButton
              fullWidth
              variant="outlined"
              loading={isSubmitting.value}
              sx={{
                width: '48px',
                minWidth: '48px',
                height: '48px',
              }}
            >
              <Iconify icon="mdi:github" />
            </LoadingButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      {renderForm}
    </>
  );
}
