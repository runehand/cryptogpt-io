import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box, Link, Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo/logo';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { navConfig } from './config-navigation';
import { HEADER, SPACING } from '../config-layout';
import SettingsButton from '../common/settings-button';
import AccountPopover from '../common/account-popover';
import ContactsPopover from '../common/contacts-popover';
import LanguagePopover from '../common/language-popover';
import SearchBarGoldie from '../common/searchbar-goldie';
import NotificationsPopover from '../common/notifications-popover';

// ----------------------------------------------------------------------

type Props = {
    onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
    const theme = useTheme();
    const smUp = useResponsive('up', 'sm');
    const { authenticated: isAuthenticated } = useAuthContext();

    const renderContent = (
        <>
            <Logo />

            {!smUp && <NavMobile data={navConfig} />}

            <SearchBarGoldie sx={{
                mx: {
                    xs: 1,
                    sm: 1,
                    md: 2,
                },
            }} />

            <Box sx={{ flexGrow: 1 }} />

            {smUp && <NavDesktop data={navConfig} />}

            <Stack
                flexGrow={1}
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                spacing={{ xs: 0.5, sm: 1 }}
            >
                <LanguagePopover />
                {
                    isAuthenticated && <>
                        <NotificationsPopover />
                        <ContactsPopover />
                    </>
                }

                <SettingsButton />

                {
                    isAuthenticated ? <AccountPopover /> :
                        <Link href={paths.auth.jwt.login} component={RouterLink}>
                            <Button variant="soft" color="primary">Login</Button>
                        </Link>
                }
            </Stack>
        </>
    );

    return (
        <AppBar
            sx={{
                height: smUp ? HEADER.H_DESKTOP : HEADER.H_MOBILE,
                width: smUp ? `calc(100% - ${SPACING.md * 2}px)` : `calc(100% - ${SPACING.sm * 2}px)`,
                // zIndex: theme.zIndex.appBar + 1,
                zIndex: 998, // Duffel component is 999
                top: `${smUp ? SPACING.md : SPACING.sm}px !important`,
                right: smUp ? `${SPACING.md}px !important` : `${SPACING.sm}px !important`,
                backdropFilter: 'blur(20px)',
                backgroundColor: alpha(theme.palette.background.opposite, 0.1),
                borderRadius: theme.shape.borderRadius,
                border: `solid 1px ${alpha(theme.palette.background.opposite, 0.2)}`,
                transition: 'all 225ms cubic-bezier(0.4, 0, 0.6, 1)',
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                {renderContent}
            </Toolbar>
        </AppBar >
    );
}
