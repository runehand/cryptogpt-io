'use client';

import { useState, useCallback } from 'react';

import { Box, Tab, Tabs, Stack, Button, BoxProps, Typography } from '@mui/material';

import { fNumberPrice } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';


interface TradingTopMoverProps extends BoxProps {
}

export function TradingTopMover({ sx, ...other }: TradingTopMoverProps) {

    const [currentTab, setCurrentTab] = useState('all');

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            height: '100%',
            ...sx,
        }} {...other}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
            }}>
                <Typography variant="h6">Top Movers</Typography>
            </Stack>
            <Tabs value={currentTab} onChange={handleChangeTab}>
                <Tab label="All" value="all" />
                <Tab label="Change" value="change" />
                <Tab label="Now High/Low" value="new-high/low" />
                <Tab label="Fluctuation" value="fluctuation" />
                <Tab label="Volume" value="volume" />
            </Tabs>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                height: '100%',
                overflowY: 'auto',
            }}>
                {dummyTopMoversData.map((data, index) => (
                    <Box key={index} sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 2,
                        py: 0.5,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <Typography variant="caption" sx={{
                                color: 'text.primary'
                            }}>{data.pair}</Typography>
                            <Typography variant="caption" sx={{
                                color: 'text.secondary'
                            }}>{data.datetime}</Typography>
                        </Box>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                            }}>
                                <Typography variant="caption" sx={{
                                    color: 'error.main',
                                }}>{fNumberPrice(data.change * 100, 2)}%</Typography>
                                <Typography variant="caption" sx={{
                                    color: 'text.secondary',
                                }}>{data.type}</Typography>
                            </Box>
                            <Button variant="contained" color="success" size='small' sx={{
                                minWidth: 0,
                                padding: "2px 4px",
                                height: '16px',
                                borderRadius: '3px',
                                width: '32px',
                            }}>
                                <Iconify icon="bx:bxs-up-arrow" sx={{
                                    width: 12,
                                    height: 12,
                                }} />
                            </Button>
                        </Stack>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

const dummyTopMoversData = [
    {
        pair: 'BTC/USDT',
        datetime: '2021-10-01 12:00:00',
        price: 50000,
        change: 0.1,
        volume: 100000,
        type: "New 24hr High",
    },
    {
        pair: 'ETH/USDT',
        datetime: '2021-10-01 12:00:00',
        price: 3000,
        change: 0.2,
        volume: 100000,
        type: "New 24hr High",
    },
    {
        pair: 'BNB/USDT',
        datetime: '2021-10-01 12:00:00',
        price: 500,
        change: 0.3,
        volume: 100000,
        type: "New 24hr High",
    },
    {
        pair: 'SOL/USDT',
        datetime: '2021-10-01 12:00:00',
        price: 200,
        change: 0.4,
        volume: 100000,
        type: "New 24hr High",
    },
    {
        pair: 'ADA/USDT',
        datetime: '2021-10-01 12:00:00',
        price: 2,
        change: 0.5,
        volume: 100000,
        type: "New 24hr High",
    },
    {
        pair: 'DOT/USDT',
        datetime: '2021-10-01 12:00:00',
        price: 50,
        change: 0.6,
        volume: 100000,
        type: "New 24hr High",
    },
    {
        pair: 'DOGE/USDT',
        datetime: '2021-10-01 12:00:00',
        price: 0.5,
        change: 0.7,
        volume: 100000,
        type: "New 24hr High",
    },
    {
        pair: 'LUNA/USDT',
        datetime: '2021-10-01 12:00:00',
        price: 40,
        change: 0.8,
        volume: 100000,
        type: "New 24hr High",
    },
    {
        pair: 'AVAX/USDT',
        datetime: '2021-10-01 12:00:00',
        price: 50,
        change: 0.9,
        volume: 100000,
        type: "New 24hr High",
    },
]