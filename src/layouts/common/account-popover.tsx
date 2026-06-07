import { m } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';
import { useUserProfile } from 'src/store/user/userProfile';

import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { StyledDialog } from 'src/components/styled-component';
import UserStatus from 'src/components/user-status/user-status';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import UserStatusButton from 'src/components/user-status/user-status-button';
import UserStatusItem, { UserStatusType } from 'src/components/user-status/user-status-item';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Profile',
    linkTo: paths.dashboard.user.profile,
  },
  {
    label: 'Setting',
    linkTo: paths.dashboard.user.account,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { logout, user } = useAuthContext();
  const popover = usePopover();
  const userStatusDialogVisible = useBoolean(false);

  const StatusData = useUserProfile(state => state.statusData);
  const setStatusData = useUserProfile((state) => state.setStatusData);
  const status = useUserProfile((state) => state.status);
  const setStatus = useUserProfile((state) => state.setStatus);
  const userProfileInfo = useUserProfile((state) => state.userProfileInfo);
  const [defaultStatus, setDefaultStatus] = useState<string[]>([]);

  const renderedUserStatusData = useMemo(() => StatusData.reduce((acc, _status) => {
    if (!acc[_status.type]) {
      acc[_status.type] = [];
    }
    acc[_status.type].push({
      ..._status,
    });
    setDefaultStatus(Object.keys(acc).map(key => (acc[key].find(item => item.is_default)?.id || acc[key][0].id)));
    return acc;
  }, {}), [StatusData]);


  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const response = await axios.get(endpoints.profile.status);
        if (response.data.length > 0) {
          setStatusData(response.data.map((item) => ({
            ...item,
            id: item.value,
          })));
        } else {
          setStatusData([]);
        }
      } catch (error) {
        // console.error(error);
      }
    }
    fetchStatusData();
  }, [setStatusData])


  useEffect(() => {
    if (userProfileInfo.status) {
      setStatus(userProfileInfo.status.split(','));
    } else {
      setStatus(defaultStatus);
    }
  }, [defaultStatus, userProfileInfo, setStatus])

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace(paths.auth.jwt.login);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  const handleChangeUserStatus = (_status: UserStatusType) => {
    const needReplaceStatus = status.map((item) => StatusData.find(_item => _item.id === item)).findIndex(item => item?.type === _status.type);
    const currentStatusString = status.join(',');
    let newStatusString = "";
    if (needReplaceStatus !== -1) {
      const newStatus = [...status];
      newStatus[needReplaceStatus] = _status.id;
      setStatus([...newStatus]);
      newStatusString = newStatus.join(',');
    } else {
      setStatus([...status, _status.id]);
      newStatusString = [...status, _status.id].join(',');
    }
    try {
      if (newStatusString !== currentStatusString) {
        axios.put(endpoints.profile.status, { status: newStatusString })
          .then((response) => {
            // console.log("response", response);
          })
          .catch((error) => {
            console.error(error);
          })
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Box sx={{
        position: 'relative',
      }}>

        <IconButton
          component={m.button}
          whileTap="tap"
          whileHover="hover"
          variants={varHover(1.05)}
          onClick={popover.onOpen}
          sx={{
            width: 40,
            height: 40,
          }}
        >
          <Avatar
            alt={userProfileInfo?.user_name || ""}
            src={userProfileInfo?.avatar || ''}
            sx={{
              mx: 'auto',
              width: 36,
              height: 36,
              fontSize: 18,
              backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
              color: 'primary.main',
              border: theme => `solid 1px ${theme.palette.primary.main}`,
            }}
          >
            {userProfileInfo?.user_name?.charAt(0).toUpperCase() || 'J'}
          </Avatar>
        </IconButton>

        <Box sx={{
          position: 'absolute',
          bottom: -32,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          p: 1,
          backgroundColor: theme => alpha(theme.palette.background.default, 0.8),
          borderRadius: 2,
        }}>
          <UserStatusItem data={StatusData.find(item => item.id === status[0]) || StatusData[0]} sx={{
            width: '16px',
            height: '16px',
          }} />
          <UserStatusItem data={StatusData.find(item => item.id === status[1]) || StatusData[0]} sx={{
            width: '16px',
            height: '16px',
          }} />
          <UserStatusItem data={StatusData.find(item => item.id === status[2]) || StatusData[0]} sx={{
            width: '16px',
            height: '16px',
          }} />
        </Box>
      </Box>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 200, p: 0 }}>
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userProfileInfo?.user_name}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          sx={{
            px: 2,
            py: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
          onClick={() => userStatusDialogVisible.onTrue()}
        >
          <UserStatusItem data={StatusData.find(item => item.id === status[0]) || StatusData[0]} sx={{
            width: '16px',
            height: '16px',
          }} onClick={() => userStatusDialogVisible.onTrue()} />
          <Typography variant="body2" sx={{
            flex: 1,
            textAlign: 'left',
          }}>
            {(StatusData.find(item => item.id === status[0]) || StatusData[0]).label}
          </Typography>

          <IconButton size="small">
            <Iconify icon="mingcute:right-line" sx={{ mr: '0 !important' }} />
          </IconButton>
        </MenuItem>

        <StyledDialog open={userStatusDialogVisible.value} onClose={() => userStatusDialogVisible.onFalse()}>
          <Stack direction='column' alignItem="center" spacing={2} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 2,
            position: 'relative',
          }}>
            <IconButton sx={{
              position: 'absolute',
              top: 2,
              right: 2,
            }}>
              <Iconify icon="eva:close-outline" sx={{
                color: 'primary.main',
              }} onClick={() => userStatusDialogVisible.onFalse()} />
            </IconButton>

            <Box sx={{
              position: 'relative',
            }}>
              <Avatar
                alt={userProfileInfo?.user_name || ""}
                src={userProfileInfo?.avatar || ''}
                sx={{
                  mx: 'auto',
                  width: { xs: 64, md: 96 },
                  height: { xs: 64, md: 96 },
                  fontSize: { xs: 32, md: 48 },
                  backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
                  color: 'primary.main',
                  border: theme => `solid 2px ${theme.palette.primary.main}`,
                }}
              >
                {userProfileInfo?.user_name?.charAt(0).toUpperCase() || 'J'}
              </Avatar>

              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
              }}>
                <UserStatus data={StatusData.find(item => item.id === status[0]) || StatusData[0]} sx={{
                }} />
                <UserStatus data={StatusData.find(item => item.id === status[1]) || StatusData[0]} sx={{
                }} />
                <UserStatus data={StatusData.find(item => item.id === status[2]) || StatusData[0]} sx={{
                }} />
              </Box>

            </Box>

            {
              Object.keys(renderedUserStatusData).map((_statusArray, _g_index) => (
                <Stack key={`status-group-${_g_index}`} direction='column' alignItem="center" spacing={2} sx={{
                  p: 2,
                }}>
                  <Typography variant="subtitle1" sx={{
                    textAlign: 'center',
                  }}>
                    {_statusArray.charAt(0).toUpperCase() + _statusArray.slice(1)}
                  </Typography>
                  <Stack direction='row' alignItem="center" spacing={2} sx={{
                    flexWrap: 'wrap',
                    width: '400px',
                  }}>
                    {
                      renderedUserStatusData[_statusArray].map((_status) => (
                        <UserStatusButton key={`user-status-button-${_g_index}-${_status.id}`}
                          data={_status}
                          isSelected={status.includes(_status.id)}
                          onClick={() => handleChangeUserStatus(_status)}
                          sx={{
                            width: 'calc(50% - 8px)',
                          }}
                        />
                      ))
                    }
                  </Stack>
                </Stack>
              ))
            }
          </Stack>
        </StyledDialog>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Logout
        </MenuItem>
      </CustomPopover>
    </>
  );
}
