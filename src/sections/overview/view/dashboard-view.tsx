'use client';

import { Box, Grid } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { getUserProfileData } from 'src/auth/context/jwt/utils';

import Transactions from '../transactions';
import OverviewCredit from '../overview-credit';
import OverviewMyAgents from '../overview-my-agents';
import OverviewMyModels from '../overview-my-models';
import OverviewPlanUsage from '../overview-plan-usage';
import OverviewMediaStorage from '../overview-media-storage';
import OverviewFilesStats from '../overview-chart-files-stats';
import OverviewInterfaceStats from '../overview-chart-interface-stats';

export default function DashboardView() {
    const smUp = useResponsive("up", "sm")
    const user_profile = getUserProfileData();
    const is_admin = user_profile?.is_admin || false;

    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: smUp ? "row" : "column",
            justifyContent: 'start',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <OverviewPlanUsage />
                </Grid>
                <Grid item xs={12} md={6}>
                    <OverviewMediaStorage />
                </Grid>
                <Grid item xs={12} md={6}>
                    <OverviewMyAgents />
                </Grid>
                <Grid item xs={12} md={6}>
                    <OverviewMyModels />
                </Grid>
                <Grid item xs={12}>
                    <OverviewCredit />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {is_admin && <Grid item xs={12} md={12}>
                    <Transactions />
                </Grid>}
                <Grid item xs={12} md={12}>
                    <OverviewFilesStats />
                </Grid>
                <Grid item xs={12} md={12}>
                    <OverviewInterfaceStats />
                </Grid>
            </Grid>
        </Box>
    );
}
