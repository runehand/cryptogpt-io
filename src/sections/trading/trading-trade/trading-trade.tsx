import React, { useState } from 'react';

import { Box, Tab, Tabs, alpha, Stack, BoxProps, Typography, IconButton } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

import { TradingTradeSpot } from './trading-trade-spot';
import { TradingTradeGrid } from './trading-trade-grid';
import { TradingTradeCross } from './trading-trade-cross';
import { TradingTradeIsolated } from './trading-trade-isolated';

interface TradingTradeProps extends BoxProps {
    onBlockResize?: () => void;
}

export default function TradingTrade({
    onBlockResize,
    sx,
    ...other
}: TradingTradeProps) {
    const [currentTypeTab, setCurrentTypeTab] = useState('spot');
    const smUp = useResponsive('up', 'sm');

    const handleChangeTypeTab = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTypeTab(newValue);
    }

    const handleBlockResize = () => {
        if (onBlockResize) {
            onBlockResize();
        }
    }

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    }} {...other}>
        <Stack direction="row" alignItems='center' justifyContent='space-between' sx={{
            width: '100%',
            mb: 1,
        }}>
            <Typography variant="h6">Trade</Typography>

            <IconButton onClick={() => handleBlockResize()}>
                <Iconify icon="fluent-mdl2:minimum-value" sx={{
                    color: theme => theme.palette.text.primary,
                }} />
            </IconButton>
        </Stack>

        <Tabs value={currentTypeTab} onChange={handleChangeTypeTab} sx={{
            borderRadius: '0px',
            '.MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                top: 0,
            },
            '.MuiTab-root': {
                py: 1,
                px: 2,
                mr: smUp ? 1 : 0,
                color: 'text.secondary',
                fontSize: '14px',
                '&.Mui-selected': {
                    color: 'text.primary',
                },
            },
            ".Mui-selected": {
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
            },
        }}>
            <Tab label="Spot" value="spot" />
            <Tab label="Cross 5x" value="cross" />
            <Tab label="Isolate" value="isolated" />
            <Tab label="Grid" value="grid" />
        </Tabs>

        <Box sx={{
            p: 1,
            flex: 1,
            backgroundImage: theme => `linear-gradient(to bottom, ${alpha(theme.palette.primary.main, 0.05)}, transparent)`,
        }}>
            {
                currentTypeTab === 'spot' && <TradingTradeSpot />
            }
            {
                currentTypeTab === 'cross' && <TradingTradeCross />
            }
            {
                currentTypeTab === 'isolated' && <TradingTradeIsolated />
            }
            {
                currentTypeTab === 'grid' && <TradingTradeGrid />
            }
        </Box>
    </Box>;
}