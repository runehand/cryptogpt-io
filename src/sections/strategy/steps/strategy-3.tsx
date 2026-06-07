
import { useState } from 'react';
import { Area, XAxis, YAxis, Tooltip, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';

import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { Box, Stack, Table, alpha, BoxProps, TableRow, TextField, TableHead, TableCell, TableBody, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { fNumberPrice } from 'src/utils/format-number';

import { useStrategy } from "src/store/strategy/useStrategy";

import Iconify from 'src/components/iconify';

interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}


interface StrategyStep3Props extends BoxProps {

};

export default function StrategyStep3({ sx, ...other }: StrategyStep3Props) {
    const coin1 = useStrategy((state) => state.coin1);
    const coin2 = useStrategy((state) => state.coin2);
    const smUp = useResponsive("up", 'sm');

    const [filterStartDate, setFilterStartDate] = useState<Date | null>(
        new Date('2018-01-01T00:00:00.000Z')
    );
    const [filterEndDate, setFilterEndDate] = useState<Date | null>(
        new Date()
    );

    return <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Typography variant="h4" color="primary" sx={{ textAlign: "center", my: 2 }}>Review and Adjust Strategy</Typography>
        <Stack direction='row' alignItems="center" spacing={2} sx={{ width: '90%', mb: 2 }}>
            <Typography variant="h4" sx={{
                whitespace: 'nowrap',
            }}>2. Backtesting for {coin1.name}/{coin2.name}</Typography>
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

            <Box sx={{ width: '100%' }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                    <Iconify icon="carbon:chart-multitype" sx={{
                        width: '28px',
                        height: '28px',
                        color: 'primary.main',
                    }} />
                    <Typography variant="h6" sx={{ color: 'primary.main' }}>Backtesting Data</Typography>
                </Stack>

                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: smUp ? 'row' : 'column',
                        gap: 1,
                    }}>
                        <TextField
                            label="Search"
                            type="text"
                            sx={{
                                width: '100%',
                            }}
                        />
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                            width: smUp ? 'auto' : '100%',
                        }}>
                            <MobileDateTimePicker
                                value={filterStartDate}
                                label="Start Date"
                                onChange={(newValue) => {
                                    setFilterStartDate(newValue);
                                }}
                                slotProps={{
                                    textField: {
                                        margin: 'none',
                                    },
                                }}
                                sx={{
                                    minWidth: '190px',
                                    width: smUp ? 'auto' : '100%',
                                }}
                            />

                            <MobileDateTimePicker
                                value={filterEndDate}
                                label="End Date"
                                onChange={(newValue) => {
                                    setFilterEndDate(newValue);
                                }}
                                slotProps={{
                                    textField: {
                                        margin: 'none',
                                    },
                                }}
                                sx={{
                                    minWidth: '190px',
                                    width: smUp ? 'auto' : '100%',
                                }}
                            />
                        </Box>

                    </Box>
                    <Box sx={{
                        flex: 1,
                        width: '100%',
                        overflowY: 'auto',
                    }}>
                        <Table sx={{
                            "& tr": {
                                px: 1,
                            },
                            "& td,th": {
                                fontSize: '10px',
                                py: 0.5,
                                px: 2,
                            },
                            "& tbody tr": {
                                py: 0.5,
                                transition: 'background-color 0.3s',
                                "&:hover": {
                                    backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1)
                                },
                            },
                        }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="caption" sx={{
                                            whiteSpace: 'nowrap',
                                        }}>Start Date</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{
                                            whiteSpace: 'nowrap',
                                        }}>End Date</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{
                                            whiteSpace: 'nowrap',
                                        }}>Initial Capitial</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{
                                            whiteSpace: 'nowrap',
                                        }}>Asset</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{
                                            whiteSpace: 'nowrap',
                                        }}>Indicator Parameters</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{
                                            whiteSpace: 'nowrap',
                                        }}>Buy condition</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{
                                            whiteSpace: 'nowrap',
                                        }}>Sell condition</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{
                                            whiteSpace: 'nowrap',
                                        }}>Warm up period</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_data, _index) => (
                                        <TableRow key={`latest-row-key-${_index}`}>
                                            <TableCell>
                                                <Typography variant="caption">8/Mar</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">8/Mar</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                }}>
                                                    <Typography variant="caption">${fNumberPrice(21340, 0)}</Typography>
                                                    <Typography variant="caption" sx={{ color: 'success.main' }}>0.1</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">BTC/USD</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">SMO</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">Stop less</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption">Stop less</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="caption" sx={{
                                                    py: 0.5,
                                                    px: 1,
                                                    borderRadius: '10px',
                                                    backgroundColor: theme => alpha(theme.palette.info.main, 0.3),
                                                    whiteSpace: 'nowrap',
                                                }}>1d 4h 23m</Typography>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Box>
        </Box>

        <Box sx={{
            width: '100%',
        }}>
            <Box sx={{
                width: '100%',
                height: '400px',
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