'use client';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box, Card } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

import AccountCredit from '../account-credit';
import AccountGeneral from '../account-general';
import QRCodeGenerator from '../account-qr-code';
import AccountBuyCRGPT from '../account-buy-crgpt';
import AccountMembership from '../account-membership';
import AccountSubaccounts from '../account-subaccount';
import AccountSocialLinks from '../account-social-links';
import AccountNotifications from '../account-notifications';
import AccountChangePassword from '../account-change-password';

// ----------------------------------------------------------------------

const TABS = [
    {
        value: 'general',
        label: 'General',
        icon: <Iconify icon="solar:user-id-bold" width={24} />,
    },
    {
        value: 'membership',
        label: 'Membership',
        icon: <Iconify icon="solar:bill-list-bold" width={24} />,
    },
    {
        value: 'credit',
        label: 'Credit',
        icon: <Iconify icon="mdi:bank" width={24} />,
    },
    {
        value: 'crgpt',
        label: 'Buy CRGPT',
        icon: <Iconify icon="arcticons:crypto-prices" width={24} />,
    },
    {
        value: 'notifications',
        label: 'Notifications',
        icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
    },
    {
        value: 'social',
        label: 'Social links',
        icon: <Iconify icon="solar:share-bold" width={24} />,
    },
    {
        value: 'security',
        label: 'Security',
        icon: <Iconify icon="ic:round-vpn-key" width={24} />,
    },
    {
        value: 'network-api',
        label: 'Network APIs',
        icon: <Iconify icon="material-symbols:account-child-invert" width={24} />,
    },
    {
        value: 'qr_code',
        label: 'QR Code',
        icon: <Iconify icon="material-symbols:account-child-invert" width={24} />,
    },
];
// ---------------------------------------------------------------------

export default function UserAccountView() {
    const smUp = useResponsive('up', 'sm');

    const [currentTab, setCurrentTab] = useState('general');

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    return (
        <Box sx={{
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Card sx={{
                width: '100%',
                p: smUp ? 2 : 1,
                flex: 1,
                borderRadius: 1,
                boxShadow: 2,
                overflowX: "hidden",
                overflowY: 'auto',
            }}>
                <Tabs
                    value={currentTab}
                    onChange={handleChangeTab}
                    sx={{
                        mb: { xs: 3, md: 5 },
                    }}
                >
                    {TABS.map((tab) => (
                        <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
                    ))}
                </Tabs>

                {currentTab === 'general' && <AccountGeneral />}

                {currentTab === 'membership' && <AccountMembership />}

                {currentTab === 'credit' && <AccountCredit />}

                {currentTab === 'crgpt' && <AccountBuyCRGPT />}

                {currentTab === 'notifications' && <AccountNotifications />}

                {currentTab === 'social' && <AccountSocialLinks />}

                {currentTab === 'security' && <AccountChangePassword />}

                {currentTab === 'network-api' && <AccountSubaccounts />}

                {currentTab === 'qr_code' && <QRCodeGenerator />}
            </Card>
        </Box>
    );
}
