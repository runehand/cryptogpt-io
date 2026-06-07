
import { useMemo, useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Select, MenuItem, TextField, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { useUserProfile } from 'src/store/user/userProfile';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';


// ----------------------------------------------------------------------

export default function AccountSocialLinks() {
  const { enqueueSnackbar } = useSnackbar();

  const socialLinksData = useUserProfile((state) => state.socialLinksData);
  const setSocialLinksData = useUserProfile((state) => state.setSocialLinksData);

  const setSocialLinks = useUserProfile((state) => state.setSocialLinks);
  const socialLinks = useUserProfile((state) => state.socialLinks);

  const isAddingPartVisible = useBoolean();
  const [newSocialSite, setNewSocialSite] = useState<string>('');
  const [newSocialLink, setNewSocialLink] = useState<string>('');
  const restSocialLinks = useMemo(() => {
    const updatedRestSocialLinks = socialLinksData.filter((social) => !socialLinks.find((_link) => _link.name === social.name));
    setNewSocialSite(updatedRestSocialLinks[0]?.name || '');
    return updatedRestSocialLinks;
  }, [socialLinksData, socialLinks]);
  const isSaveLoading = useBoolean();

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await axios.get(endpoints.profile.social);
        if (response.data) {
          setSocialLinksData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSocialLinks();
  }, [setSocialLinksData]);

  const handleSaveNewSocialLink = () => {
    setSocialLinks([...socialLinks, {
      name: newSocialSite,
      value: newSocialLink,
    }]);
    setNewSocialSite('');
    setNewSocialLink('');
    isAddingPartVisible.onFalse();
  }

  const handleDeleteSocialLink = (name: string) => {
    setSocialLinks(socialLinks.filter((link) => link.name !== name));
  }

  const handleChangeSocialLink = (name: string, value: string) => {
    setSocialLinks(socialLinks.map((link) => link.name === name ? { ...link, value } : link));
  }

  const handleCancelNewSocialLink = () => {
    setNewSocialSite('');
    isAddingPartVisible.onFalse();
  }

  const handleSubmit = async () => {
    try {
      isSaveLoading.onTrue();
      const response = await axios.put(endpoints.profile.social, {
        social_links: socialLinks
      });
      if (response.data) {
        enqueueSnackbar('Social links updated successfully', { variant: 'success' });
      }
      isSaveLoading.onFalse();
    } catch (error) {
      console.error(error);
      isSaveLoading.onFalse();
    }
  }

  return (
    <Stack component={Card} spacing={3} sx={{
      p: 3,
      backdropFilter: 'none',
    }}>
      {socialLinksData.map((social) => {
        const link = socialLinks.find((_link) => _link.name === social.name);
        if (!link) {
          return null;
        }
        return <TextField
          key={social.name}
          name={social.name}
          value={link.value}
          onChange={(e) => handleChangeSocialLink(social.name, e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  width={24}
                  icon={
                    social.logo || ''
                  }
                  color={
                    social.color || ''
                  }
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleDeleteSocialLink(social.name)}>
                  <Iconify icon="ph:trash" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      })}

      {
        isAddingPartVisible.value &&
        <TextField
          name="New Social Link"
          value={newSocialLink}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Select
                  size="small"
                  disableUnderline
                  value={newSocialSite}
                  onChange={(e) => {
                    setNewSocialSite(e.target.value);
                  }}
                  sx={{
                    '& .MuiSelect-select': {
                      p: 0,
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                  }}
                >
                  {
                    restSocialLinks.map((social) => <MenuItem key={social.name} value={social.name}>
                      <Iconify icon={social.logo} width={24} color={social.color} />
                    </MenuItem>
                    )}
                </Select>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleSaveNewSocialLink()}>
                  <Iconify icon="material-symbols:check" />
                </IconButton>
                <IconButton onClick={() => handleCancelNewSocialLink()}>
                  <Iconify icon="material-symbols:close" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            setNewSocialLink(e.target.value);
          }}
        />
      }

      <Stack direction="row" justifyContent="flex-end" spacing={2}>

        {
          socialLinks.length !== socialLinksData.length && !isAddingPartVisible.value && (
            <LoadingButton type="submit" variant="contained" onClick={isAddingPartVisible.onTrue}>
              Add
            </LoadingButton>
          )
        }

        <LoadingButton type="submit" variant="contained" onClick={handleSubmit} loading={isSaveLoading.value}>
          Save Changes
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
