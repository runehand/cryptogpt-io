import { Area, XAxis, YAxis, Tooltip, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';

import { Box, Stack, Select, BoxProps, MenuItem, TextField, Typography, ButtonBase, InputLabel, FormControl } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { useStrategy } from "src/store/strategy/useStrategy";

import Image from 'src/components/image';

import StrategyCoinSelector from '../strategy-coin-selector';

interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}

interface StrategyStep1BetaProps extends BoxProps {

};

export default function StrategyStep1Beta({ sx, ...other }: StrategyStep1BetaProps) {
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);
    const isHover = useBoolean(false);

    const handleSwapCoin = () => {
        const [temp1, temp2] = [coin1, coin2];
        setCoin1(temp2);
        setCoin2(temp1);
    }

    return <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Typography variant="h4" color="primary" sx={{ textAlign: "center", my: 2 }}>Choose the cryptocurrency pairs you want to trade.</Typography>
        <Stack direction='row' alignItems="center" spacing={2} sx={{ width: '90%', mb: 2 }}>
            <Typography variant="h4" sx={{
                whitespace: 'nowrap',
                mr: 11,
            }}>1. Start, Select Pair</Typography>
            <StrategyCoinSelector currency={coin1} handleChange={setCoin1} />
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <ButtonBase sx={{
                }} onClick={() => handleSwapCoin()}>
                    <Image src="/assets/images/ethereum-to-dollar-swap.png" alt="swap" sx={{
                        width: '96px',
                        height: '96px',
                    }} />
                </ButtonBase>
            </Box>

            <StrategyCoinSelector currency={coin2} handleChange={setCoin2} />
        </Stack>


        <Box sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Box
                sx={{
                    position: 'relative',
                    width: '320px',
                }}
                onMouseEnter={() => isHover.onTrue()}
                onMouseLeave={() => isHover.onFalse()}
            >
                <Select size="small" value="5m" sx={{
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                    position: 'absolute',
                    left: '5px',
                    top: '5px',
                    zIndex: '1000',
                }}>
                    <MenuItem value="5m">5m</MenuItem>
                    <MenuItem value="10m">10m</MenuItem>
                    <MenuItem value="15m">15m</MenuItem>
                    <MenuItem value="30m">30m</MenuItem>
                    <MenuItem value="1h">1h</MenuItem>
                    <MenuItem value="4h">4h</MenuItem>
                </Select>

                <Box sx={{
                    width: '100%',
                    height: '220px',
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

            <Box sx={{
                width: '320px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mt: 1,
            }}>
                <Box sx={{
                    height: '38px',
                    position: 'relative',
                    flex: 1,
                    backgroundImage: 'linear-gradient(to right, #0063ff,#08ff10,#ffb300)',
                }}>
                    <Box sx={{
                        position: 'absolute',
                        left: '50%',
                        bottom: '38px',
                        width: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Box component="span" sx={{
                            display: 'inline-block',
                            height: '32px',
                            color: '#ffffff',
                            lineHeight: '32px',
                            textAlign: 'center',
                            fontWeight: '700',
                            whiteSpace: 'nowrap',
                            borderRadius: 0.5,
                            backgroundColor: 'success.darker',
                        }}>
                            <Typography component="span" sx={{
                                color: "white",
                                fontWeight: '700',
                                p: 0.25,
                                mx: 0.5,
                            }}>$67.230,23</Typography>
                            <Typography component="span" sx={{
                                color: "success.main",
                            }}>(+7%)</Typography>
                        </Box>
                        <Box sx={{
                            width: '5px',
                            height: '10px',
                            backgroundColor: '#ffffff',
                        }} />
                    </Box>
                </Box>
            </Box>

            <Box sx={{
                width: "320px",
                height: '40px',
                position: 'relative',
                flex: 1,
                mt: 0.5,
            }}>
                <Box sx={{
                    position: 'absolute',
                    left: '0px',
                    width: '100%',
                    height: '8px',
                    top: '16px',
                    background: 'linear-gradient(to right, #0063ff 0%, #0063ff 25%, transparent 25%, transparent 75%, #ffb300 75%, #ffb300 100%)',
                }} />

                <Box sx={{
                    position: 'absolute',
                    left: '0px',
                    width: '100%',
                    height: '24px',
                    top: '8px',
                    background: 'linear-gradient(to right, transparent 0%, transparent 25%, #08ff10 25%, #08ff10 75%, transparent 75%, transparent 100%)',
                }} />
                <Box sx={{
                    position: 'absolute',
                    left: '0px',
                    width: '100%',
                    height: '40px',
                    top: '0px',
                    background: 'linear-gradient(to right, transparent 0%, transparent 85%, #fff 85%, #fff 87%, transparent 85.5%, transparent 100%)',
                }} />
            </Box>
        </Box>

        <Stack direction='row' alignItems="center" spacing={2} sx={{ width: '90%', mb: 2 }}>
            <Typography variant="h4" sx={{
                whitespace: 'nowrap',
            }}>2. Strategy:</Typography>

            <TextField sx={{
                width: '300px',
            }} />

            <FormControl sx={{
                width: '200px',
                '.MuiInputBase-root': {
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                },
            }}>
                <InputLabel htmlFor="time-frame-label">Time frame</InputLabel>
                <Select labelId="time-frame-label" id="time-frame" label="Time frame" value="5m" sx={{
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                }}>
                    <MenuItem value="5m">5m</MenuItem>
                    <MenuItem value="10m">10m</MenuItem>
                    <MenuItem value="15m">15m</MenuItem>
                    <MenuItem value="30m">30m</MenuItem>
                    <MenuItem value="1h">1h</MenuItem>
                    <MenuItem value="4h">4h</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{
                width: '200px',
                '.MuiInputBase-root': {
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                },
            }}>
                <InputLabel htmlFor="time-frame-label">Your Strategies</InputLabel>
                <Select labelId="time-frame-label" id="time-frame" label="Time frame" value="5m" sx={{
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                }}>
                    <MenuItem value="5m">5m</MenuItem>
                    <MenuItem value="10m">10m</MenuItem>
                    <MenuItem value="15m">15m</MenuItem>
                </Select>
            </FormControl>
        </Stack>
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