import { Box, Grid, Stack, alpha, Table, BoxProps, TableRow, TableHead, TableCell, TableBody, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { fNumberPrice } from 'src/utils/format-number';

import { MAIN_CHART_PANEL } from 'src/layouts/config-layout';

import Iconify from 'src/components/iconify';

interface TradingLatestTransactionProps extends BoxProps {
}

export default function TradingLatestTransaction({ sx, ...other }: TradingLatestTransactionProps) {
    const smUp = useResponsive('up', 'sm');

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            ...sx,
        }} {...other}>
            <Typography variant="h6">Latest Transaction</Typography>

            <Grid container spacing={{
                xs: 1,
                sm: 2,
                md: 2,
                lg: 2,
                xl: 6,
            }}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                        width: '100%',
                    }}>
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                        }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 0.5,
                                    backgroundColor: theme => alpha(theme.palette.info.main, 0.3),
                                }}>
                                    <Iconify icon="lets-icons:done-all-round" sx={{
                                        color: 'info.main',
                                    }} width={24} height={24} />
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Total R</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>19.30</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                        <Box sx={{
                            flex: 1,
                        }} />
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                        width: '100%',
                    }}>
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                        }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 0.5,
                                    backgroundColor: theme => alpha(theme.palette.info.main, 0.3),
                                }}>
                                    <Iconify icon="iconamoon:swap" sx={{
                                        color: 'info.main',
                                    }} width={24} height={24} />
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Total trades</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>100</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 0.5,
                        }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Win rate</Typography>
                            <Typography variant="caption" sx={{ color: 'success.main' }}>42 (42.00%0)</Typography>

                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                        width: '100%',
                    }}>
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                        }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 0.5,
                                    backgroundColor: theme => alpha(theme.palette.success.main, 0.3),
                                }}>
                                    <Iconify icon="mdi:arrow-up" sx={{
                                        color: 'success.main',
                                    }} width={24} height={24} />
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Longs</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>44</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 0.5,
                        }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Win rate</Typography>
                            <Typography variant="caption" sx={{ color: 'success.main' }}>42 (42.00%0)</Typography>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                        width: '100%',
                    }}>
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                        }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box sx={{
                                    width: 40,
                                    height: 40,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 0.5,
                                    backgroundColor: theme => alpha(theme.palette.error.main, 0.3),
                                }}>
                                    <Iconify icon="mdi:arrow-down" sx={{
                                        color: 'error.main',
                                    }} width={24} height={24} />
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>Shorts</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>56</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                        <Box sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 0.5,
                        }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Win rate</Typography>
                            <Typography variant="caption" sx={{ color: 'success.main' }}>21 (47.73%0)</Typography>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>

            <Box sx={{
                flex: 1,
                width: '100%',
                maxHeight: `${MAIN_CHART_PANEL.W_DESKTOP - 168}px`,
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
                                <Typography variant="caption">Side</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption">Asset</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption">Size</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption" sx={{
                                    whiteSpace: 'nowrap',
                                }}>Close Date</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption">Entry</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption">Exit</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption">Duration</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="caption" sx={{
                                    whiteSpace: 'nowrap',
                                }}>Acc Risk</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption" sx={{
                                    whiteSpace: 'nowrap',
                                }}>Final R</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="caption">Content</Typography>
                            </TableCell>
                            <TableCell align='center'>
                                <Typography variant="caption">Result</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((_data, _index) => (
                                <TableRow key={`latest-row-key-${_index}`}>
                                    <TableCell>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}>
                                            <Iconify icon="mdi:arrow-up" sx={{
                                                color: 'text.primary',
                                                backgroundColor: theme => alpha(theme.palette.success.main, 0.3),
                                                p: 0.5,
                                                borderRadius: '50%',
                                            }} />
                                            <Typography variant="caption">Long</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">BTC/USD</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption" sx={{ color: 'success.main' }}>0.1</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">8/Mar</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">${fNumberPrice(21340, 0)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">${fNumberPrice(22013, 0)}</Typography>
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
                                    <TableCell align='center'>
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Box sx={{
                                                py: 0.5,
                                                px: 1,
                                                borderRadius: '10px',
                                                display: "flex",
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 1,
                                                backgroundColor: theme => alpha(theme.palette.success.main, 0.3),
                                            }}>
                                                <Typography variant="caption">1%</Typography>
                                                <Iconify icon="material-symbols:check" sx={{
                                                    color: 'success.main',
                                                }} />
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="caption">1.5</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}>
                                            <Iconify icon="material-symbols:sell" sx={{
                                                color: 'warning.main',
                                            }} />
                                            <Typography variant="caption">2</Typography>
                                            <Iconify icon="mdi:chart-line" sx={{
                                                color: 'warning.main',
                                                ml: 1,
                                            }} />
                                            <Typography variant="caption">2</Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography variant="caption" sx={{
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: '10px',
                                            backgroundColor: theme => alpha(theme.palette.success.main, 0.3),
                                            color: 'success.main',
                                        }}>Win</Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
}