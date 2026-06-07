'use client';


import { Box, Card, Link, Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Iconify from 'src/components/iconify';

import StrategyContent from '../strategy-content';

export default function StrategyCreateView() {
    const isShowSummary = useStrategy((state) => state.isShowSummary);
    const setIsShowSummary = useStrategy((state) => state.setIsShowSummary);
    const smUp = useResponsive("up", 'sm');

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 2,
                pb: 2,
            }}
        >
            <Card
                sx={{
                    p: 1,
                    flex: 1,
                    borderRadius: 1,
                    boxShadow: 2,
                    height: '100%',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    width: '100%',
                    overflowY: 'hidden',
                    overflowX: 'auto',
                }}>
                    <Link href={paths.dashboard.strategy.beta} component={RouterLink}>
                        <Button variant="outlined" sx={{
                            whiteSpace: 'nowrap',
                            width: '200px',
                        }}>
                            Try in 3d? (Beta)
                        </Button>
                    </Link>

                    <Box sx={{
                        flex: 1,
                    }} />
                    <Button variant="outlined" onClick={() => setIsShowSummary(!isShowSummary)}
                        startIcon={<Iconify icon={!isShowSummary ? "mdi:eye-outline" : "mdi:eye-off-outline"} />}
                        sx={{
                            whiteSpace: 'nowrap',
                            minWidth: '140px',
                        }}>
                        Summary
                    </Button>
                    <Button variant="outlined" sx={{
                        whiteSpace: 'nowrap',
                        minWidth: '160px',
                        display: 'none',
                    }}>
                        Save Strategy
                    </Button>
                    <Button variant="outlined" sx={{
                        whiteSpace: 'nowrap',
                        minWidth: '140px',
                    }}>
                        Mint NFT
                    </Button>
                </Box>

                <StrategyContent sx={{
                    flex: 1,
                    height: 0,
                }} />
            </Card>
        </Box>
    );
}
