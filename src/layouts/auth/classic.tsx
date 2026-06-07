import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { endpoints } from 'src/utils/axios';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 520,
        px: { xs: 2, md: 8 },
        backgroundColor: 'transparent',
        // pt: { xs: 15, md: 20 },
        // pb: { xs: 15, md: 0 },
      }}
    >
      <Box sx={{
        backgroundColor: alpha(theme.palette.background.default, 0.1),
        backdropFilter: 'blur(14px)',
        border: `1px solid ${alpha(theme.palette.grey[200], 0.2)}`,
        // outline: '1px solid white',
        borderRadius: 2,
        p: 4,
      }}>
        {children}
      </Box>
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={6}
      alignItems="center"
      justifyContent="center"
      sx={{
      }}
    >
      <Typography variant="h3" sx={{ maxWidth: 480, textAlign: 'center' }}>
        {title || 'Hi, Welcome back'}
      </Typography>

      <Box
        component="img"
        alt="auth"
        src={image || '/assets/images/project/02.png'}
        sx={{
          maxWidth: {
            xs: 480,
            lg: 560,
            xl: 720,
          },
        }}
      />
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
        ...bgGradient({
          color: 'transparent',
          // imgUrl: '/assets/background/overlay-1.png',
        }),
      }}
    >

      <video autoPlay loop muted playsInline style={{
        zIndex: -1,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}>
        <source src={endpoints.video('background.mp4')} type="video/mp4" />
        <track kind="captions" src="captions.vtt" srcLang="en" label="English" />
        Your browser does not support the video tag.
      </video>

      {renderLogo}

      {mdUp && renderSection}

      {renderContent}
    </Stack>
  );
}
