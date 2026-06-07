'use client';

import { useState, useEffect } from 'react';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { Box, Tab, Tabs, Stack, alpha, Button, Select, BoxProps, MenuItem, TextField, Typography, IconButton, InputLabel, FormControl } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import { Calendar } from 'src/components/calendar';

import TradingTrackerStrategyStatus from './trading-tracker-strategy-status';


interface TradingTrackerProps extends BoxProps {
}

export function TradingTracker({ sx, ...other }: TradingTrackerProps) {
    const trackerDetailDrawer = useBoolean(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentTab, setCurrentTab] = useState('book');
    const [dateStatus, setDateStatus] = useState<"today" | "old" | "future">('today');

    useEffect(() => {
        const today = new Date();
        if (currentDate.getFullYear() < today.getFullYear() || currentDate.getMonth() < today.getMonth() || currentDate.getDate() < today.getDate()) {
            setDateStatus('old');
        } else {
            setDateStatus('future');
        }
        if (currentDate.getFullYear() === today.getFullYear() && currentDate.getMonth() === today.getMonth() && currentDate.getDate() === today.getDate()) {
            setDateStatus('today');
        }
    }, [currentDate]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            height: '100%',
            ...sx,
        }} {...other}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                mb: 1,
            }}>
                <Typography variant="h6">Tracker</Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton size="small" sx={{
                        border: theme => `1px solid ${theme.palette.primary.main}`,
                        color: 'primary.main',
                    }} onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setMonth(newDate.getMonth() - 1);
                        setCurrentDate(newDate);
                    }}><Iconify icon="mingcute:left-fill" /></IconButton>
                    <IconButton size="small" sx={{
                        border: theme => `1px solid ${theme.palette.primary.main}`,
                        color: 'primary.main',
                    }} onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setMonth(newDate.getMonth() + 1);
                        setCurrentDate(newDate);
                    }}><Iconify icon="mingcute:right-fill" /></IconButton>

                    <Button variant="outlined" color="primary" onClick={() => trackerDetailDrawer.onFalse()} sx={{
                        px: 1,
                        py: 0.5,
                        fontSize: '12px',
                    }}>{currentDate.getFullYear()},{currentDate.toLocaleString('default', { month: 'long' }).substring(0, 3)}</Button>
                </Stack>
            </Stack>

            <Calendar date={currentDate} onClick={() => trackerDetailDrawer.onTrue()} />

            <Drawer
                anchor="right"
                open={trackerDetailDrawer.value}
                onClose={() => trackerDetailDrawer.onFalse()}
                slotProps={{
                    backdrop: { invisible: true },
                }}
                sx={{
                    [`& .${drawerClasses.paper}`]: {
                        backdropFilter: 'blur(10px)',
                        backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
                        width: 400,
                    },
                }}
            >
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 2,
                }}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
                        <Typography variant="h6">Tracker Detail</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                        border: theme => `1px solid ${theme.palette.divider}`,
                        borderRadius: 1,
                    }}>
                        <IconButton onClick={() => {
                            const newDate = new Date(currentDate);
                            newDate.setMonth(newDate.getMonth() - 1);
                            setCurrentDate(newDate);
                        }}><Iconify icon="mingcute:left-fill" /></IconButton>
                        <Typography variant="body1">{currentDate.toLocaleString('default', { month: 'long' })}</Typography>
                        <IconButton onClick={() => {
                            const newDate = new Date(currentDate);
                            newDate.setMonth(newDate.getMonth() + 1);
                            setCurrentDate(newDate);
                        }}><Iconify icon="mingcute:right-fill" /></IconButton>
                    </Stack>

                    <Calendar date={currentDate} handleDateChange={(d) => setCurrentDate(d)} isShowWeekDay sx={{ mb: 1 }} />

                    {
                        dateStatus === "today" && <Tabs value={currentTab} onChange={handleTabChange}>
                            <Tab value="book" label="Event & Order" />
                            <Tab value="history" label="History" />
                        </Tabs>
                    }

                    {/* History */}
                    {
                        (dateStatus === "old" || (dateStatus === 'today' && currentTab === 'history')) &&
                        <Stack direction="column" spacing={1}>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                                <FormControl variant="outlined" size="small" sx={{ width: '100%' }}>
                                    <InputLabel>Sort</InputLabel>
                                    <Select
                                        value="time"
                                        label="Sort"
                                        size='small'
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        <MenuItem value="time">Time</MenuItem>
                                        <MenuItem value="profitable">Profitable</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="outlined" size="small" sx={{ width: '100%' }}>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value="completed"
                                        label="Status"
                                        size='small'
                                        sx={{
                                            width: '100%',
                                        }}
                                    >
                                        <MenuItem value="loss">Loss</MenuItem>
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="completed">Completed</MenuItem>
                                        <MenuItem value="ended">Ended</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{
                                border: theme => `2px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                p: 1,
                            }}>
                                <Box>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.main', mb: 1 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>BOUGHT</Typography>
                                        <Typography variant="body2">:</Typography>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{
                                            color: 'primary.main',
                                            flex: 1,
                                        }}>
                                            <Iconify icon="logos:bitcoin" />
                                            <Typography variant="body2">BTC</Typography>
                                        </Stack>
                                        <Typography variant="body2">50.000$</Typography>
                                        <Typography variant="caption" sx={{
                                            display: 'block',
                                            px: 0.5,
                                            backgroundColor: 'success.main',
                                            color: 'text.primary',
                                            fontWeight: 'bold',
                                            borderRadius: 0.5,
                                        }}>+4.10%</Typography>
                                    </Stack>

                                    <Typography variant="caption" sx={{ display: 'block' }}>Traded Strategy 1 and performed 10 trades</Typography>
                                    <Stack direction="row" spacing={1}>
                                        <Typography variant="caption">Profit: 18%</Typography>
                                        <Typography variant="caption">Average tradetime: 240 ms</Typography>
                                    </Stack>
                                </Box>

                                <Box>
                                    <Typography variant="caption" sx={{ display: 'block' }}>100%</Typography>
                                    <TradingTrackerStrategyStatus value={70} />
                                    <Typography variant="caption" sx={{ display: 'block', color: "primary.main" }}>Completed</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    }

                    {/* Start */}
                    {
                        (dateStatus === "future" || (dateStatus === 'today' && currentTab === 'book')) &&
                        <Box>
                            <Typography variant="body1" sx={{ mb: 1 }}>Ai Trading Strategy for {fDate(new Date())}</Typography>
                            <Stack direction="column" spacing={1} sx={{
                                p: 1,
                                border: theme => `1px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                            }}>
                                <Typography variant="body2">Balance: 1.000$</Typography>

                                <Box sx={{
                                    border: theme => `1px solid ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    position: 'relative',
                                    p: 1,
                                    mt: 1,
                                }}>
                                    <Typography variant="caption" sx={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '-10px',
                                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.6),
                                        borderRadius: 1,
                                        px: 1,
                                        color: 'text.primary',
                                    }}>Trade Info</Typography>

                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent='space-between' sx={{ mb: 0.25 }}>
                                        <Typography variant="body2">SYMBOL:</Typography>

                                        <Select size="small" value="BTC" sx={{
                                            width: '100px',
                                        }}>
                                            <MenuItem value="BTC">BTC</MenuItem>
                                            <MenuItem value="USDT">USDT</MenuItem>
                                            <MenuItem value="CGPT">CGPT</MenuItem>
                                        </Select>
                                    </Stack>
                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent='space-between'>
                                        <Typography variant="body2">Trade:</Typography>
                                        <TextField size="small" value="1" sx={{
                                            width: '100px',
                                        }} />
                                    </Stack>
                                </Box>

                                <Box sx={{
                                    border: theme => `1px solid ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    position: 'relative',
                                    p: 1,
                                    mt: 1,
                                }}>
                                    <Typography variant="caption" sx={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '-10px',
                                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.6),
                                        borderRadius: 1,
                                        px: 1,
                                        color: 'text.primary',
                                    }}>Strategy</Typography>

                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent='space-between'>
                                        <Typography variant="body2" sx={{ flex: 1 }}>STRATEGY:</Typography>

                                        <Select size="small" value="BTC" sx={{
                                            width: '100px',
                                        }}>
                                            <MenuItem value="BTC">Buy 1</MenuItem>
                                            <MenuItem value="USDT">Sell 2</MenuItem>
                                            <MenuItem value="CGPT">Book Order</MenuItem>
                                        </Select>
                                        <IconButton size="small" sx={{
                                            border: theme => `1px solid ${theme.palette.primary.main}`,
                                            borderRadius: 1,
                                            color: 'primary.main',
                                        }}><Iconify icon="material-symbols:add" /></IconButton>
                                    </Stack>
                                    <Button fullWidth variant="outlined" size="small" color="primary" startIcon={<Iconify icon="game-icons:coinflip" />} sx={{ mt: 1 }}>Add New AI Strategy</Button>
                                </Box>

                                <Box sx={{
                                    border: theme => `1px solid ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    position: 'relative',
                                    px: 1,
                                    pt: 2,
                                    pb: 1,
                                    mt: 1,
                                }}>
                                    <Typography variant="caption" sx={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '-10px',
                                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.6),
                                        borderRadius: 1,
                                        px: 1,
                                        color: 'text.primary',
                                    }}>AI AUTO TRADE</Typography>

                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent='space-between'>
                                        <TimePicker
                                            label="Start Time"
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    margin: "none",
                                                },
                                            }}
                                        />
                                        <TimePicker
                                            label="End Time"
                                            slotProps={{
                                                textField: {
                                                    fullWidth: true,
                                                    margin: "none",
                                                },
                                            }}
                                        />
                                    </Stack>
                                    <Typography variant="caption">Period: 10h 20m</Typography>
                                </Box>

                                <Box sx={{
                                    border: theme => `1px solid ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    position: 'relative',
                                    p: 1,
                                    mt: 1,
                                }}>
                                    <Typography variant="caption" sx={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '-10px',
                                        backgroundColor: theme => alpha(theme.palette.primary.main, 0.6),
                                        borderRadius: 1,
                                        px: 1,
                                        color: 'text.primary',
                                    }}>AI News & Alerts 🔔</Typography>

                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent='space-between' sx={{
                                        mb: 0.25,
                                    }}>
                                        <Typography variant="body2" sx={{ flex: 1 }}>Track every:</Typography>
                                        <TextField size="small" value="10" sx={{
                                            width: '56px',
                                        }} />
                                        <Select size="small" value="MIN" sx={{
                                            width: '56px',
                                        }}>
                                            <MenuItem value="MIN">M</MenuItem>
                                            <MenuItem value="HOUR">H</MenuItem>
                                        </Select>
                                    </Stack>

                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent='space-between' sx={{
                                        mb: 0.25,
                                    }}>
                                        <Typography variant="body2" sx={{ flex: 1 }}>Deliver to:</Typography>

                                        <Select size="small" value="Email" sx={{
                                            width: '100px',
                                        }}>
                                            <MenuItem value="Email">Email</MenuItem>
                                            <MenuItem value="SMS">SMS</MenuItem>
                                            <MenuItem value="Whatsapp">Whatsapp</MenuItem>
                                        </Select>
                                        <IconButton size="small" sx={{
                                            border: theme => `1px solid ${theme.palette.primary.main}`,
                                            borderRadius: 1,
                                            color: 'primary.main',
                                        }}><Iconify icon="material-symbols:add" /></IconButton>
                                    </Stack>
                                    <Box sx={{
                                        pl: 2,
                                    }}>
                                        <Stack direction="row" spacing={1} alignItems="center" justifyContent='space-between' sx={{
                                            mb: 0.25,
                                        }}>
                                            <Iconify icon="mdi:email-outline" />
                                            <Typography variant="caption" sx={{ flex: 1 }}>Email:</Typography>
                                            <Typography variant="caption">example@crypto.io</Typography>
                                            <IconButton size="small" sx={{
                                                border: theme => `1px solid ${theme.palette.primary.main}`,
                                                borderRadius: 1,
                                                color: 'primary.main',
                                            }}><Iconify icon="ph:trash" /></IconButton>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center" justifyContent='space-between' sx={{
                                            mb: 0.25,
                                        }}>
                                            <Iconify icon="material-symbols:sms-outline" />
                                            <Typography variant="caption" sx={{ flex: 1 }}>SMS:</Typography>
                                            <Typography variant="caption">1 234 567 890</Typography>
                                            <IconButton size="small" sx={{
                                                border: theme => `1px solid ${theme.palette.primary.main}`,
                                                borderRadius: 1,
                                                color: 'primary.main',
                                            }}><Iconify icon="ph:trash" /></IconButton>
                                        </Stack>
                                        <Stack direction="row" spacing={1} alignItems="center" justifyContent='space-between' sx={{
                                            mb: 0.25,
                                        }}>
                                            <Iconify icon="ic:baseline-whatsapp" />
                                            <Typography variant="caption" sx={{ flex: 1 }}>Whatsapp:</Typography>
                                            <TextField size="small" value="" sx={{ width: '124px' }} />
                                            <IconButton size="small" sx={{
                                                border: theme => `1px solid ${theme.palette.primary.main}`,
                                                borderRadius: 1,
                                                color: 'primary.main',
                                            }}><Iconify icon="ph:trash" /></IconButton>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Stack>
                        </Box>
                    }

                </Box>
            </Drawer>
        </Box>
    );
}