// Desc: This file contains the content of the strategy dashboard.

import { Box, alpha, BoxProps, MenuItem, TextField, ButtonBase, Typography } from '@mui/material';

import { CoinType } from "src/store/strategy/useStrategy";

import Image from 'src/components/image/image';
import Iconify from 'src/components/iconify/iconify';
import { usePopover } from 'src/components/custom-popover';
import StyledPopover from 'src/components/styled-component/styled-popover';

const coinsData: CoinType[] = [
    {
        name: "Bitcoin",
        symbol: "Bitcon",
        icon: 'assets/images/bitcoin.png',
    },
    {
        name: "ETH",
        symbol: "ETH",
        icon: 'assets/images/bitcoin.png',
    },
    {
        name: "BNB",
        symbol: "BNB",
        icon: 'assets/images/bitcoin.png',
    },
    {
        name: "USDT",
        symbol: "Tether",
        icon: 'assets/images/bitcoin.png',
    },
    {
        name: "USDC",
        symbol: "USD_Coin",
        icon: 'assets/images/bitcoin.png',
    },
    {
        name: "Polkadot",
        symbol: "Polkadot",
        icon: 'assets/images/bitcoin.png',
    },
    {
        name: "Solan",
        symbol: "Solan",
        icon: 'assets/images/bitcoin.png',
    },
    {
        name: "XRP",
        symbol: "XRP",
        icon: 'assets/images/bitcoin.png',
    },
    {
        name: "Dogecoin",
        symbol: "Dogecoin",
        icon: 'assets/images/bitcoin.png',
    },
]

interface StrategyCoinSelectorProps extends BoxProps {
    currency: CoinType,
    handleChange?: (v: CoinType) => void,
    size?: "small" | "medium",
}

export default function StrategyCoinSelector({
    currency = { name: "BNB", symbol: "BNB" },
    handleChange,
    size = "medium",
    sx,
    ...other }: StrategyCoinSelectorProps) {
    const coinListPopover = usePopover();

    const handleChangeCurrency = (v: CoinType) => {
        if (handleChange) {
            handleChange(v);
        }
        coinListPopover.onClose();
    }

    return <Box sx={{
        ...sx
    }} {...other}>
        <ButtonBase sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: size === "medium" ? 2 : 1,
            gap: 1,
            borderRadius: 1,
            border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
        }} onClick={coinListPopover.onOpen}>
            <Typography sx={{ width: '64px' }}>{currency.name}</Typography>
            <Iconify icon="mingcute:down-fill" />
        </ButtonBase>

        <StyledPopover
            open={!!coinListPopover.open}
            anchorEl={coinListPopover.open}
            onClose={coinListPopover.onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: 2,
                // border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                borderRadius: 1,
                p: 1,
            }}>
                <TextField />
                <Box sx={{
                    width: '100%',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    maxHeight: '200px',
                }}>
                    {
                        coinsData.map((item: CoinType, index: number) =>
                            <MenuItem key={`coin-${index}`} sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                transition: 'all 0.2s',
                                backgroundColor: 'transparent',
                                ...(item.symbol === currency.symbol && {
                                    backgroundColor: (theme: any) => alpha(theme.palette.primary.main, 0.2),
                                })
                            }} onClick={() => handleChangeCurrency(item)}>
                                <Typography>{item.name}</Typography>
                                <Image src="/assets/images/bitcoin.png" alt="coin" sx={{
                                    width: '24px',
                                    height: '24px',
                                }} />
                            </MenuItem>
                        )
                    }
                </Box>
            </Box>
        </StyledPopover>
    </Box>
}