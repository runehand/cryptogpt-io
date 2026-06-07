
import GaugeComponent from 'react-gauge-component'

import { Box, Stack, alpha, Button, useTheme, BoxProps, TextField, Typography, IconButton, InputAdornment } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

interface TradingNewsTopicProps extends BoxProps {
    onMoveLeft?: () => void;
}

export default function TradingNewsTopic({ sx, onMoveLeft, ...other }: TradingNewsTopicProps) {
    const theme = useTheme();
    const smUp = useResponsive("up", "sm");

    const handleMoveLeft = () => {
        if (onMoveLeft) {
            onMoveLeft();
        }
    }

    return <Stack direction="column" spacing={2} sx={{
        minWidth: "356px",
        pt: 2,
        height: "100%",
    }}>
        <Stack direction="row" justifyContent='space-between' alignItems='center' spacing={1}>
            {
                !smUp && <IconButton onClick={() => handleMoveLeft()}>
                    <Iconify icon="ic:outline-arrow-back-ios" />
                </IconButton>
            }

            <TextField label="Search" variant="outlined" size="small" fullWidth
                InputProps={{
                    startAdornment: <InputAdornment position="start"><Iconify icon="material-symbols:search" /></InputAdornment>,
                }} />
        </Stack>

        <Stack direction="column" spacing={2} sx={{
            height: 0,
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
        }}>
            <Stack direction="column" spacing={1} sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                padding: 2.5,
            }}>
                <Typography variant="h5">Explore the lastest crypto news</Typography>
                <Typography sx={{
                    color: "text.secondary",
                }}>⚡️ Be a part of the latests discussions in crypto</Typography>
                <Typography sx={{
                    color: "text.secondary",
                }}>💬 Interact with your favorite creators</Typography>
                <Typography sx={{
                    color: "text.secondary",
                }}>👍 Enjoy content that interests you</Typography>
            </Stack>

            <Stack direction="column" spacing={2} alignItems='flex-start' sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                paddingY: 2.5,
            }}>
                <Typography variant="h5" sx={{ px: 2.5 }}>Trading Topics</Typography>

                <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
                    <Stack direction="row" justifyContent='space-between' alignItems='flex-start' spacing={1} sx={{
                        px: 2.5,
                        py: 0.5,
                        cursor: 'pointer',
                        width: "100%",
                        backgroundColor: "transparent",
                        transition: "all 0.3s",
                        "&:hover": {
                            backdropFilter: "blur(10px)",
                            backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                        },
                    }}>
                        <Iconify icon="mingcute:binance-coin-bnb-fill" />
                        <Stack direction="column" alignItems='stretch' spacing={0.5} sx={{
                            width: "calc(100% - 28px)",
                        }}>
                            <Typography variant="body1">BinanceTaurnament</Typography>
                            <Stack direction="row" spacing={2}>
                                <Typography variant="body1" sx={{
                                    color: "text.secondary",
                                    fontSize: "12px",
                                }}>93.5M views</Typography>
                                <Typography variant="body1" sx={{
                                    color: "text.secondary",
                                    fontSize: "12px",
                                }}>30,223 Posts</Typography>
                            </Stack>
                            <Box sx={{
                                p: 1,
                                borderRadius: 1,
                                border: `1px solid ${theme.palette.divider}`,
                                width: "100%",
                            }}>
                                <Typography variant="body1" sx={{
                                    fontSize: "12px",
                                }}>Post your #BinanceTournament Journey on Binance Square and Compete for 5,000 USDT!</Typography>
                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                    <Typography variant="body1" sx={{
                                        color: "text.secondary",
                                        fontSize: "12px",
                                        flex: 1,
                                        textAlign: "right",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}>Binance Square Official</Typography>
                                    <Box component='span' sx={{
                                        borderLeft: 1,
                                        borderColor: "divider",
                                        mx: 0.5,
                                    }} />
                                    <Typography variant="body1" sx={{
                                        color: "text.secondary",
                                        fontSize: "12px",
                                        whiteSpace: "nowrap",
                                    }}>311 Likes</Typography>
                                    <Box component='span' sx={{
                                        borderLeft: 1,
                                        borderColor: "divider",
                                        mx: 0.5,
                                    }} />
                                    <Typography variant="body1" sx={{
                                        color: "text.secondary",
                                        fontSize: "12px",
                                        whiteSpace: "nowrap",
                                    }}>255k views</Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack direction="row" justifyContent='space-between' spacing={1} sx={{
                        px: 2.5,
                        py: 0.5,
                        backgroundColor: "transparent",
                        transition: "all 0.3s",
                        cursor: 'pointer',
                        width: "100%",
                        "&:hover": {
                            backdropFilter: "blur(10px)",
                            backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                        },
                    }}>
                        <Iconify icon="mingcute:binance-coin-bnb-fill" />
                        <Stack direction="column" spacing={0.5} sx={{
                            width: "calc(100% - 28px)",
                        }}>
                            <Typography variant="body1">BinanceTaurnament</Typography>
                            <Stack direction="row" spacing={2}>
                                <Typography variant="body1" sx={{
                                    color: "text.secondary",
                                    fontSize: "12px",
                                }}>93.5M views</Typography>
                                <Typography variant="body1" sx={{
                                    color: "text.secondary",
                                    fontSize: "12px",
                                }}>30,223 Posts</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

                <Button color='primary' sx={{ mx: 2.5 }}>View More</Button>
            </Stack>

            <Stack direction="column" spacing={2} sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                paddingY: 2.5,
            }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{
                    px: 2.5
                }}>
                    <Typography variant="h5">Fear & Greed Index</Typography>
                    <Button color='primary'>Trade Now</Button>
                </Stack>

                <GaugeComponent
                    type="semicircle"
                    arc={{
                        colorArray: [theme.palette.success.main, theme.palette.error.main],
                        padding: 0.02,
                        subArcs:
                            [
                                { limit: 40 },
                                { limit: 60 },
                                { limit: 70 },
                                {},
                                {},
                                {},
                                {}
                            ]
                    }}
                    pointer={{ type: "blob", animationDelay: 0 }}
                    value={50}
                />
                <Typography variant="body1" sx={{
                    mx: 2.5,
                    fontSize: "12px",
                }}>How do you feel about the market today?</Typography>
                <Stack direction="row" justifyContent='space-between' spacing={3} sx={{
                    px: 2.5
                }}>
                    <Button variant="contained" color='error' fullWidth sx={{
                        position: "relative",
                        backgroundColor: theme.palette.error.main,
                        borderRadius: 0,
                        "::before": {
                            zIndex: -1,
                            content: "''",
                            position: "absolute",
                            top: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: theme.palette.error.main,
                            transform: "skew(-15deg)",
                            left: '5px',
                        }
                    }}>Bearish</Button>
                    <Button variant="contained" color='success' fullWidth sx={{
                        position: "relative",
                        backgroundColor: theme.palette.success.main,
                        borderRadius: 0,
                        "::before": {
                            zIndex: -1,
                            content: "''",
                            position: "absolute",
                            top: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: theme.palette.success.main,
                            transform: "skew(-15deg)",
                            left: '-5px',
                        }
                    }}>Bullish</Button>
                </Stack>
            </Stack>

            <Stack direction="column" spacing={2} sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                paddingY: 2.5,
            }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{
                    px: 2.5
                }}>
                    <Typography variant="h5">Most Searched (6H)</Typography>
                    <Typography sx={{
                        color: "text.secondary",
                        fontSize: "12px",
                    }}>USDT</Typography>
                </Stack>

                <Stack direction="column" spacing={1}>
                    {
                        [1, 2, 3, 4].map((item, index) => (
                            <Stack direction='row' justifyContent="space-between" alignItems='center' spacing={1} sx={{
                                px: 2.5,
                                py: 0.5,
                                cursor: 'pointer',
                                backgroundColor: "transparent",
                                transition: "all 0.3s",
                                "&:hover": {
                                    backdropFilter: "blur(10px)",
                                    backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                                },
                            }} key={index}>
                                <Image src="/assets/images/bitcoin.png" sx={{ width: 24, height: 24 }} />
                                <Typography variant="body1" sx={{ flex: 1 }}>USDT</Typography>
                                <Stack direction='column' alignItems='flex-end'>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>1.2</Typography>
                                    <Typography variant="body1" sx={{ fontSize: '12px', color: "error.main" }}>-0.82%</Typography>
                                </Stack>
                            </Stack>
                        ))
                    }
                </Stack>
            </Stack>


            <Stack direction="column" spacing={2} sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                paddingY: 2.5,
            }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{
                    px: 2.5
                }}>
                    <Typography variant="h5">Latest News</Typography>
                </Stack>

                <Stack direction="column" spacing={1}>
                    {
                        [1, 2, 3, 4].map((item, index) => (
                            <Stack direction='column' justifyContent="space-between" spacing={0.5} sx={{
                                px: 2.5,
                                py: 0.5,
                                cursor: 'pointer',
                                backgroundColor: "transparent",
                                transition: "all 0.3s",
                                "&:hover": {
                                    backdropFilter: "blur(10px)",
                                    backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                                },
                            }} key={index}>
                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>Polkadot Co-Founder Proposes New System Chain Plaza To Enhance Network Scalability</Typography>
                                <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '600', color: 'text.secondary' }}>5m</Typography>
                            </Stack>
                        ))
                    }
                </Stack>

                <Stack direction="row" justifyContent='flex-start' spacing={2}>
                    <Button color='primary' sx={{ mx: 2.5 }}>View More</Button>
                </Stack>
            </Stack>

            <Stack direction="column" spacing={2} sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                paddingY: 2.5,
            }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{
                    px: 2.5
                }}>
                    <Typography variant="h5">Suggested Creators</Typography>
                </Stack>

                <Stack direction="column" spacing={1}>
                    {
                        [1, 2, 3, 4].map((item, index) => (
                            <Stack direction='row' justifyContent="space-between" alignItems='center' spacing={1.5} sx={{
                                px: 2.5,
                                py: 0.5,
                                cursor: 'pointer',
                                backgroundColor: "transparent",
                                transition: "all 0.3s",
                                "&:hover": {
                                    backdropFilter: "blur(10px)",
                                    backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                                },
                            }} key={index}>
                                <Box sx={{
                                    position: 'relative',
                                }}>
                                    <Image src="/assets/images/creator1.png" sx={{
                                        width: 38,
                                        height: 38,
                                        minWidth: 38,
                                        minHeight: 38,
                                        borderRadius: '50%',
                                        zIndex: 1,
                                    }} />
                                    <Iconify icon="mdi:check-circle" sx={{
                                        fontSize: '10px',
                                        position: 'absolute',
                                        right: -1,
                                        bottom: 0,
                                        zIndex: 2,
                                        color: 'primary.main',
                                    }} />
                                </Box>
                                <Stack direction='column' sx={{ width: 0, flex: 1 }}>
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>Richard Teng</Typography>
                                    <Typography variant="body1" sx={{
                                        fontSize: '14px',
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        color: "text.secondary",
                                    }}>Binance CEO | Formerly Binance Head of Regional Markets | Former CEO of Financial Services Regulatory Authority ADGM</Typography>
                                </Stack>
                                <Button variant="contained" color='primary' size="small">Follow</Button>
                            </Stack>
                        ))
                    }
                </Stack>
                <Stack direction="row" justifyContent='flex-start' spacing={2}>
                    <Button color='primary' sx={{ mx: 2.5 }}>View More</Button>
                </Stack>
            </Stack>

            <Stack direction="column" spacing={2} sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                paddingY: 2.5,
            }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{
                    px: 2.5
                }}>
                    <Typography variant="h5">Trending Articles</Typography>
                </Stack>

                <Stack direction="column" spacing={1}>
                    {
                        [1, 2, 3, 4].map((item, index) => (
                            <Stack direction='column' justifyContent="space-between" spacing={0.5} sx={{
                                px: 2.5,
                                py: 0.5,
                                cursor: 'pointer',
                                backgroundColor: "transparent",
                                transition: "all 0.3s",
                                "&:hover": {
                                    backdropFilter: "blur(10px)",
                                    backgroundColor: alpha(theme.palette.background.opposite, 0.2),
                                },
                            }} key={index}>
                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>Tether Launches Alloy, US Dollar-Pegged Stablecoin Backed By Gold</Typography>
                                <Stack direction='row' alignItems='center' spacing={1.5}>
                                    <Image src="/assets/images/bitcoin.png" sx={{ width: 24, height: 24 }} />
                                    <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>CoinMarketCap</Typography>
                                </Stack>
                            </Stack>
                        ))
                    }
                </Stack>

                <Stack direction="row" justifyContent='flex-start' spacing={2}>
                    <Button color='primary' sx={{ mx: 2.5 }}>View More</Button>
                </Stack>
            </Stack>
        </Stack>
    </Stack>
}