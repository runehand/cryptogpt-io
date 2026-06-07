import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { useUserProfile } from 'src/store/user/userProfile';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const password = useBoolean();
  const userInfo = useUserProfile((state) => state.userInfo);
  const [usedAuthType, setUsedAuthType] = useState("");

  useEffect(() => {
    if (userInfo.app_metadata && userInfo.app_metadata.provider) {
      if (userInfo.app_metadata.provider === "email" && userInfo.user_metadata.address) {
        setUsedAuthType("metamask");
      }
      else {
        setUsedAuthType(userInfo.app_metadata.provider);
      }
    } else {
      setUsedAuthType("noexist");
    }
  }, [userInfo])

  const ChangePassWordSchema = Yup.object().shape({
    // oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters')
      .test(
        'no-match',
        'New password must be different than old password',
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const defaultValues = {
    // oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await axios.post(endpoints.profile.setPassword, {
        // old_password: data.oldPassword,
        password: data.newPassword,
        rpassword: data.confirmNewPassword,
      });
      const { status, message } = res.data;
      if (status === false) {
        enqueueSnackbar(message, { variant: 'error' });
        return;
      }
      enqueueSnackbar('Password is updated successfully!');
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {
        usedAuthType &&
        <Typography variant="h5" sx={{ mb: 2 }}>You login through {usedAuthType[0].toUpperCase() + usedAuthType.slice(1)}</Typography>
      }

      <Stack component={Card} spacing={3} sx={{
        p: 3,
        backdropFilter: 'none',
      }}>
        {/* {
          usedAuthType !== "metamask" &&
          <RHFTextField
            name="oldPassword"
            type={password.value ? 'text' : 'password'}
            label="Old Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        } */}

        <RHFTextField
          name="newPassword"
          label="New Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            <Stack component="span" direction="row" alignItems="center">
              <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be minimum
              6+
            </Stack>
          }
        />

        <RHFTextField
          name="confirmNewPassword"
          type={password.value ? 'text' : 'password'}
          label="Confirm New Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 'auto' }}>
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
