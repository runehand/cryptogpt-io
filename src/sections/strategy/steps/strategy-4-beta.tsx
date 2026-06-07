
import { useState } from 'react';
import { Area, XAxis, YAxis, Tooltip, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Box, alpha, Stack, Button, BoxProps, MenuItem, Typography, InputLabel, FormControl } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { useStrategy } from "src/store/strategy/useStrategy";

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';

import StrategyTableWithDetail from '../strategy-table-with-detail';

interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}


interface StrategyStep4BetaProps extends BoxProps {

};

export default function StrategyStep4Beta({ sx, ...other }: StrategyStep4BetaProps) {
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
            }}>5. Strategy Summary</Typography>
        </Stack>

        <Box sx={{
            flex: 1,
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
        }}>
            <Box sx={{
                width: '100%',
                height: '100%',
                maxHeight: '450px',
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
                    <Button fullWidth variant="contained" color="warning" startIcon={<Iconify icon="ic:outline-edit" sx={{
                    }} />}>Edit</Button>
                    <Button fullWidth variant="contained" color="success" startIcon={<Iconify icon="et:strategy" sx={{
                    }} />}>Submit</Button>
                    <Button fullWidth variant="contained" color="info" startIcon={<Iconify icon="ic:outline-watch-later" sx={{
                    }} />}>Mint as NFT</Button>
                </Stack>

                <Box sx={{ width: '100%' }}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                        <Iconify icon="carbon:chart-multitype" sx={{
                            width: '28px',
                            height: '28px',
                            color: 'primary.main',
                        }} />
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>Backtesting Data</Typography>
                    </Stack>

                    <StrategyTableWithDetail />
                </Box>
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
                    height: '250px',
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffd70055" strokeWidth={4} />
                            <XAxis
                                dataKey="date"
                                stroke="#ddd"
                                tick={{ fill: '#ddd' }}
                            />
                            <YAxis
                                stroke="#ddd"
                                tick={{ fill: '#ddd' }}
                                domain={[0, 32000]}
                                ticks={[0, 7500, 15000, 22500, 30000]}
                            />
                            <Tooltip
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        const changePercent = data.change !== 0 ? (data.change / (data.price - data.change) * 100).toFixed(2) : 0;
                                        return (
                                            <Box sx={{
                                                p: 1,
                                                borderRadius: 1,
                                                backgroundColor: '#100e0d',
                                            }}>
                                                <Typography sx={{ color: 'primary.main' }}>{`Time: ${label}`}</Typography>
                                                <Typography sx={{ color: 'primary.main' }}>{`Price: ${data.price.toFixed(2)}`}</Typography>
                                                <Typography sx={{ color: data.change > 0 ? "success.main" : "error.main" }}>{`Change: ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${changePercent}%)`}</Typography>
                                                {
                                                    data.action &&
                                                    <Typography sx={{ color: data.action === 'Buy' ? "success.main" : "error.main" }}>{`Action: ${data.action}`}</Typography>
                                                }
                                            </Box>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <defs>
                                <linearGradient id="neonGradient-FFD700" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke="#ffd700"
                                strokeWidth={6}
                                fill="url(#neonGradient-FFD700)"
                                filter="url(#neonGlow)"
                                dot={(props) => {
                                    const { cx, cy, payload } = props;
                                    if (payload.action) {
                                        return (
                                            <g>
                                                <circle cx={cx} cy={cy} r={8} fill={payload.change > 0 ? '#006400' : '#8B0000'} />
                                                <rect
                                                    x={cx - 25}
                                                    y={cy - 24 - 14}
                                                    width="50"
                                                    height="24"
                                                    rx="5"
                                                    ry="5"
                                                    fill={payload.change > 0 ? '#006400' : '#8B0000'}
                                                />
                                                <text
                                                    x={cx}
                                                    y={cy - (payload.change > 0 ? 16 : 18)}
                                                    textAnchor="middle"
                                                    fill='white'
                                                    fontSize={16}
                                                >
                                                    {payload.action}
                                                </text>
                                            </g>
                                        );
                                    }
                                    return <circle cx={cx} cy={cy} r={8} fill="#ffd700" />;
                                }}
                            />

                            <defs>
                                <filter id="neonGlow" height="300%" width="300%" x="-75%" y="-75%">
                                    <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                                    <feMerge>
                                        <feMergeNode in="coloredBlur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {data.map((entry: DataPoint, index) => {
                                if (entry.change !== 0) {
                                    return (
                                        <ReferenceLine
                                            key={`referenceline - ${index}`}
                                            x={entry.date}
                                            stroke={entry.change > 0 ? "#006400" : "#8B0000"}
                                            strokeWidth={2}
                                            label={{
                                                value: entry.change > 0 ? '+' : '-',
                                                position: 'top',
                                                fill: entry.change > 0 ? "#006400" : "#8B0000",
                                                style: { textShadow: `0 0 8px ${entry.change > 0 ? "#006400" : "#8B0000"}` }
                                            }}
                                        />
                                    );
                                }
                                return null;
                            })}
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Box>
    </Box >
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