import { Box, alpha, Table, TableRow, TableHead, TableCell, TableBody, Typography } from '@mui/material';

import { fNumberPrice } from 'src/utils/format-number';

import { MAIN_CHART_PANEL } from 'src/layouts/config-layout';

import Iconify from 'src/components/iconify';

export default function TrackingHistory() {
    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
        height: '100%',
        flex: 1,
    }}>
        <Typography variant="h6">Event History</Typography>

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
                            <Typography variant="caption">Date</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="caption">Event</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="caption">Performance</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="caption" sx={{
                                whiteSpace: 'nowrap',
                            }}>Income/Loss/Expends</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="caption">Backtested/Wins</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="caption">Timeframe</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="caption">Maximum Drawdown</Typography>
                        </TableCell>
                        <TableCell align='center'>
                            <Typography variant="caption" sx={{
                                whiteSpace: 'nowrap',
                            }}>Rewards/Points</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="caption" sx={{
                                whiteSpace: 'nowrap',
                            }}>AI comments</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="caption">AI Rated</Typography>
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
}