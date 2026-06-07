import React from 'react';

import { Box, Stack, alpha, BoxProps, IconButton, Typography, ButtonBase } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';


interface TradingTradeProps extends BoxProps {
    onBlockResize?: () => void;
}

export default function TradingTradeHome({
    onBlockResize,
    sx,
    ...other
}: TradingTradeProps) {
    const smUp = useResponsive('up', 'sm');

    const handleBlockResize = () => {
        if (onBlockResize) {
            onBlockResize();
        }
    }

    return <Box sx={{
        p: smUp ? 2 : 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 1,
        position: 'relative',
        overflow: 'hidden',
        ...sx,
    }} {...other}>
        <Stack direction="row" alignItems='center' justifyContent='space-between' sx={{
            width: '100%',
        }}>
            <Typography variant="h6">Trade</Typography>

            <IconButton onClick={() => handleBlockResize()}>
                <Iconify icon="lucide:maximize" sx={{
                    color: theme => theme.palette.text.primary,
                }} />
            </IconButton>
        </Stack>

        <Stack direction="row" alignItems="center" gap={1}>
            <Image src="/logo/crgpt-icon-full.png" alt="Trade" sx={{
                width: '52px',
                height: '52px',
                borderRadius: 1,
            }} />
            <Stack direction="column" gap={0.5}>
                <Typography variant="body1" sx={{ color: 'primary.main' }}>CRGPT/USDT</Typography>
                <Stack direction="row" gap={1}>
                    <ButtonBase sx={{
                        backgroundColor: theme => theme.palette.primary.main,
                        fontSize: '12px',
                        borderRadius: 0.5,
                        p: '2px 8px',
                    }}>Buy</ButtonBase>
                    <ButtonBase sx={{
                        border: theme => `1px solid ${theme.palette.primary.main}`,
                        fontSize: '12px',
                        borderRadius: 0.5,
                        p: '2px 8px',
                    }}>Sell</ButtonBase>
                </Stack>
            </Stack>
        </Stack>

        <Box sx={{
            flex: 1,
        }}>
            <Typography variant="body1" sx={{ color: 'text.primary', my: 1 }}>Fast, friendly and reliable!</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>You can earn the money by trading with our AI model</Typography>
        </Box>


        <Stack direction='row' alignItems="center" gap={1}>
            {
                [1, 2, 3, 4, 5].map((v, i) => <ButtonBase key={`trade-star-key-${i}`} sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: theme => alpha(theme.palette.background.opposite, 0.05)
                }}>
                    <Iconify icon="ph:star-fill" sx={{
                        color: "primary.main",
                        fontSize: '20px',
                    }} />
                </ButtonBase>)
            }

            <Typography variant="caption" sx={{
                color: 'text.secondary',
                ml: 1,
            }}>Aug 15, 2021</Typography>
        </Stack>


        <Image src="/logo/crgpt-icon-full.png" alt="Trade" sx={{
            width: '182px',
            height: '182px',
            borderRadius: 1,
            position: 'absolute',
            right: '-24px',
            bottom: '-24px',
            opacity: 0.3,
            zIndex: -1,
        }} />
    </Box>;
}