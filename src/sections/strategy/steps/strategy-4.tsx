
import { useState } from 'react';

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, alpha, Stack, Button, BoxProps, MenuItem, Typography, InputLabel, FormControl } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { useStrategy } from "src/store/strategy/useStrategy";

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';

import StrategyGraph1 from '../strategy-graph1';


interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}


interface StrategyStep1Props extends BoxProps {

};

export default function StrategyStep4({ sx, ...other }: StrategyStep1Props) {
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);
    const isCustom = useBoolean();
    const [period, setPeriod] = useState("5m");
    const handleChangePeriod = (event: SelectChangeEvent) => {
        setPeriod(event.target.value);
        if (event.target.value === 'Custom') {
            isCustom.onTrue();
        } else {
            isCustom.onFalse();
        }
    }

    return <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Typography variant="h4" color="primary" sx={{ textAlign: "center", my: 2 }}>Finalize Your Strategy</Typography>
        <Stack direction='row' alignItems="center" spacing={2} sx={{ width: '90%', mb: 2 }}>
            <Typography variant="h4" sx={{
                whitespace: 'nowrap',
            }}>3. Strategy Summary</Typography>
        </Stack>

        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            p: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
        }}>
            <Stack direction="row" alignItems='center' spacing={2} sx={{ width: '100%', mb: 2 }}>
                <Typography>Pair: </Typography>
                <Box sx={{
                    position: 'relative',
                    pr: 3,
                }}>
                    <Image src="/images/bnb-bnb-logo.png" alt="" sx={{
                        width: '32px',
                        hegiht: '32px',
                        borderRadius: '50%',
                        border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                        backdropFilter: 'blur(10px)',
                        p: 0.25,
                    }} />
                    <Image src="/images/tether-usdt-logo.png" alt="" sx={{
                        width: '32px',
                        hegiht: '32px',
                        borderRadius: '50%',
                        border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                        backdropFilter: 'blur(10px)',
                        p: 0.25,
                        position: 'absolute',
                        left: '20px',
                    }} />
                </Box>

                <Typography sx={{ ml: 2 }}>Trading Platform: </Typography>
                <FormControl sx={{
                    minWidth: '120px',
                    '.MuiInputBase-root': {
                        border: 'none',
                    },
                }}>
                    <InputLabel htmlFor="account-label">Account</InputLabel>
                    <Select labelId="account-label" id="account" label="Account" size="small" value={period}
                        onChange={handleChangePeriod}
                        sx={{
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                        }}>
                        <MenuItem value="Binance">Binance</MenuItem>
                        <MenuItem value="Mexc">Mexc</MenuItem>
                        <MenuItem value="Okx">Okx</MenuItem>
                    </Select>
                </FormControl>
            </Stack>

            <Stack direction="row" alignItems='center' spacing={1} sx={{ width: '100%', mb: 2 }}>
                <Button fullWidth variant="soft" color="warning" startIcon={<Iconify icon="ic:outline-edit" sx={{
                }} />}>Edit</Button>
                <Button fullWidth variant="soft" color="success" startIcon={<Iconify icon="et:strategy" sx={{
                }} />}>Submit</Button>
                <Button fullWidth variant="soft" color="info" startIcon={<Iconify icon="ic:outline-watch-later" sx={{
                }} />}>Mint as NFT</Button>
            </Stack>
        </Box>

        <Box sx={{
            width: '100%',
        }}>
            <Box sx={{ mb: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Iconify icon="mdi:trending-up" sx={{
                        width: '28px',
                        height: '28px',
                        color: 'primary.main',
                    }} />
                    <Typography variant="h6" sx={{ color: 'primary.main' }}>Performance Analytics</Typography>
                </Stack>

                <Stack direction="column" spacing={2}>
                    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                        <Box sx={{
                            width: '100%',
                            borderRadius: 1,
                            p: 1,
                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                        }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="end">
                                <Typography sx={{ color: 'text.secondary' }}>Total Return</Typography>
                                <Typography sx={{ color: 'primary.main' }}>%</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="end">
                                <Typography variant="h6" sx={{ color: 'text.primary' }}>35%</Typography>
                                <Iconify icon="mdi:trending-up" sx={{ color: 'success.main' }} />
                            </Stack>
                        </Box>
                        <Box sx={{
                            width: '100%',
                            borderRadius: 1,
                            p: 1,
                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                        }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="end">
                                <Typography sx={{ color: 'text.secondary' }}>Annualized Return</Typography>
                                <Iconify icon="mdi:trending-up" sx={{ color: 'primary.main' }} />
                            </Stack>
                            <Stack direction="row" alignItems="end">
                                <Typography variant="h6" sx={{ color: 'text.primary' }}>28%</Typography>
                                <Iconify icon="mdi:trending-up" sx={{ color: 'success.main' }} />
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
                        <Box sx={{
                            width: '100%',
                            borderRadius: 1,
                            p: 1,
                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                        }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="end">
                                <Typography sx={{ color: 'text.secondary' }}>Sharpe Ratio</Typography>
                                <Typography sx={{ color: 'primary.main' }}>$</Typography>
                            </Stack>
                            <Stack direction="row" alignItems="end">
                                <Typography variant="h6" sx={{ color: 'text.primary' }}>1.80</Typography>
                                {/* <Iconify icon="mdi:trending-up" sx={{ color: 'success.main' }} /> */}
                            </Stack>
                        </Box>
                        <Box sx={{
                            width: '100%',
                            borderRadius: 1,
                            p: 1,
                            backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                        }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="end">
                                <Typography sx={{ color: 'text.secondary' }}>Max Drawdown</Typography>
                                <Iconify icon="mdi:trending-down" sx={{ color: 'primary.main' }} />
                            </Stack>
                            <Stack direction="row" alignItems="end">
                                <Typography variant="h6" sx={{ color: 'text.primary' }}>12%</Typography>
                                <Iconify icon="mdi:trending-down" sx={{ color: 'error.main' }} />
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Box>

            <Box sx={{
                width: '100%',
                aspectRatio: '1 / 1',
            }}>
                <StrategyGraph1 />
                {/* <CryptoStrategyKnowledgeGraph /> */}
            </Box>
        </Box>
    </Box>
}

const data: DataPoint[] = [
    { date: '2023-01', price: 16500, change: 0 },
    { date: '2023-02', price: 21000, change: 0 },
    { date: '2023-03', price: 18500, change: -0.1, action: 'Sell' },
    { date: '2023-04', price: 15500, change: 0.1, action: 'Buy' },
    { date: '2023-05', price: 17500, change: 0.1 },
    { date: '2023-06', price: 11000, change: -0.1, action: 'Sell' },
    { date: '2023-07', price: 19500, change: 0.0 },
    { date: '2023-08', price: 16500, change: -0.1, action: 'Sell' },
];