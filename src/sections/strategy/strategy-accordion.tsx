import React from 'react';
import { Pie, Area, Cell, XAxis, YAxis, Legend, Tooltip, PieChart, AreaChart, CartesianGrid, ResponsiveContainer } from 'recharts';

import { styled } from '@mui/system';
import { Box, alpha, Stack, Button, Rating, Accordion, Typography, AccordionDetails, AccordionSummary } from '@mui/material';

import Iconify from 'src/components/iconify';
import Carousel, { useCarousel } from 'src/components/carousel';


interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}
interface PieChartData {
    name: string;
    value: number;
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    '&.MuiAccordion-root': {
        boxShadow: 'none',
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        '& .MuiAccordionSummary-root': {
            position: 'relative',
            borderRadius: `4px 4px 0 0`,
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px', // Adjust the height of the line bar as needed
                background: 'linear-gradient(to right, #fde047 , #67e8f9, #fde047)', // Adjust the gradient colors as needed
            },
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
            color: theme.palette.primary.main,
        },
        '&.Mui-expanded': {
            margin: '0px', // Adjust this value to your needs
            '& .MuiAccordionSummary-root': {
                margin: '0',
                paddingRight: '0px !improtant',
                minHeight: '48px',
                '& .MuiAccordionSummary-content': {
                    margin: '0',
                },
            },
            '& .MuiAccordionDetails-root': {
                padding: '0px 0px 0px 0px !important',
            },
        },
    },
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function StrategyAccordion() {
    const carousel = useCarousel({});

    const lineChartData: DataPoint[] = [
        { date: '2023-01', price: 16500, change: 0 },
        { date: '2023-02', price: 21000, change: 0 },
        { date: '2023-03', price: 18500, change: -0.1, action: 'Sell' },
        { date: '2023-04', price: 15500, change: 0.1, action: 'Buy' },
        { date: '2023-05', price: 17500, change: 0.1 },
        { date: '2023-06', price: 11000, change: -0.1, action: 'Sell' },
        { date: '2023-07', price: 19500, change: 0.0 },
        { date: '2023-08', price: 16500, change: -0.1, action: 'Sell' },
    ];

    const pieChartData: PieChartData[] = [
        { name: 'ETH', value: 400 },
        { name: 'BTC', value: 300 },
        { name: 'ADA', value: 200 },
        { name: 'DOT', value: 100 },
    ];

    return <StyledAccordion sx={{
    }}>
        <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}>
                <Iconify icon="ion:search" sx={{ color: 'info.main' }} />
                <Typography variant="body1" sx={{
                    color: 'primary.main',
                }}>Step 1: Pair Selection</Typography>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
            <Stack direction="column" spacing={2} sx={{
                p: 1,
            }}>
                <Typography variant="caption">Selected ETH/USDT pair, 4H timeframe, allocated $10,000 for trading.</Typography>

                <Stack direction="column" spacing={1}>
                    <Stack direction="row" spacing={1}>
                        <Button fullWidth color='primary' variant="contained">ETH/USDT</Button>
                        <Button fullWidth color='primary' variant="outlined">BTC/USDT</Button>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Button fullWidth color='primary' variant="outlined">ADA/USDT</Button>
                        <Button fullWidth color='primary' variant="outlined">DOT/USDT</Button>
                    </Stack>
                </Stack>

                <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                    <Box sx={{
                        height: 240,
                        position: 'relative',
                    }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={lineChartData}>
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
                            </AreaChart>
                        </ResponsiveContainer>
                    </Box>
                    <Box sx={{
                        height: 240,
                        position: 'relative',
                    }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                </Carousel>

                <Box sx={{
                    borderRadius: 1,
                    overflow: 'hidden',
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                }}>
                    <Box sx={{
                        aspectRatio: '16/9',
                        backgroundImage: 'linear-gradient(to right, #fde047 , #67e8f9, #fde047)', // Adjust the gradient colors as needed
                    }} />
                    <Box sx={{
                        p: 1,
                    }}>
                        <Typography variant="body2" sx={{ color: 'primary.main' }}>Crypto Pair Analysis</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>ETH/USDT pair, 4H timeframe, allocated $10,000 for trading.</Typography>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Iconify icon="ri:user-line" color="primary.main" />
                                <Typography variant="body2" sx={{ color: 'info.main' }}>Goldie AI</Typography>
                            </Stack>
                            <Rating name="read-only" value={4} readOnly />
                        </Stack>
                    </Box>
                </Box>

                <Box sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                }}>
                    <Typography variant="body2" sx={{ color: 'primary.main' }}>Strategy Insights</Typography>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>Learn key aspects of this strategy step</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Iconify icon="ri:user-line" color="primary.main" />
                        <Typography variant="body2" sx={{ color: 'primary.main' }}>Goldie AI</Typography>
                        <Rating name="read-only" value={4} readOnly />
                    </Stack>
                </Box>

                <Accordion expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />} sx={{
                    '&.MuiAccordion-root': {
                        boxShadow: 'none',
                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                        '& .MuiAccordionSummary-root': {
                            position: 'relative',
                            borderRadius: `4px 4px 0 0`,
                            overflow: 'hidden',
                            padding: '0px 4px',
                            minHeight: '36px!important',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '4px', // Adjust the height of the line bar as needed
                                background: 'linear-gradient(to right, #fde047 , #67e8f9, #fde047)', // Adjust the gradient colors as needed
                            },
                        },
                        '& .MuiAccordionSummary-expandIconWrapper': {
                            color: "primary.main",
                        },
                        '&.Mui-expanded': {
                            margin: '0px', // Adjust this value to your needs
                            '& .MuiAccordionSummary-root': {
                                margin: '0',
                                paddingRight: '0px !improtant',
                                minHeight: '48px',
                                '& .MuiAccordionSummary-content': {
                                    margin: '0',
                                },
                            },
                            '& .MuiAccordionDetails-root': {
                                padding: '0px 0px 0px 0px !important',
                            },
                        },
                    },
                }}>
                    <AccordionSummary>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 24,
                                height: 24,
                                borderRadius: '50%',
                                backgroundColor: 'primary.main',
                            }}>
                                <Iconify icon="eva:person-outline" sx={{
                                    color: 'white',
                                }} />
                            </Box>
                            <Typography variant="body2" sx={{ color: 'primary.main' }}>Ask Goldie</Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ p: 1 }}>
                            <Typography variant="caption" sx={{
                            }}>Solid choices! ETH/USDT is liquid, 4H balances noise and signals. $10K is a good start. Remember, risk management is key! 🔑</Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                <Typography variant="caption" sx={{
                    fontStyle: 'italic',
                    color: 'text.secondary',
                }}>Goldie AI has analyzed the ETH/USDT pair and recommended a buy signal.</Typography>
            </Stack>
        </AccordionDetails>
    </StyledAccordion>
}
