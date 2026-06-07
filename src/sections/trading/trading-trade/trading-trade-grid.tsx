import { useState } from 'react';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, Tab, Tabs, Stack, alpha, Input, Slider, Button, Divider, Checkbox, MenuItem, useTheme, TextField, Typography, IconButton, InputLabel, FormControl, FormControlLabel } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';
import { TradeInput } from 'src/components/trade-input';
import { usePopover } from 'src/components/custom-popover';
import { StyledDialog, StyledPopover } from 'src/components/styled-component';

import TradingTradeGridPopularStrategy from './trading-trade-grid-popular-strategy';


export function TradingTradeGrid() {
    const theme = useTheme();
    const [currentGridTab, setCurrentGridTab] = useState('ai');
    const [currentAiPeriod, setCurrentAiPeriod] = useState('3d');
    const [currentPopularType, setCurrentPopularType] = useState('top-roi');
    const [gridManualGrids, setGridManualGrids] = useState('Arithmetic');
    const [investMentCurrency, setInvestMentCurrency] = useState('USDT');
    const investMentCurrencyMenuShow = useBoolean(false);
    const advancedPopover = usePopover();
    const popularGridStrategiesDialog = useBoolean(false);
    const [popularGridDataSort, setPopularGridDataSort] = useState('asc');
    const smUp = useResponsive('up', 'sm');

    const handleChangePopularGridDataSort = (event: SelectChangeEvent) => {
        setPopularGridDataSort(event.target.value as string);
    };

    const handleChangeGridTab = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentGridTab(newValue);
    };

    const handleChangeAiPeriod = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentAiPeriod(newValue);
    }

    const handleChangePopularType = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentPopularType(newValue);
    }

    return <Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            mb: 2,
        }}>
            <Tabs value={currentGridTab} onChange={handleChangeGridTab} sx={{
                backgroundColor: alpha(theme.palette.background.default, 0.2),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                p: 0.5,
                borderRadius: '0px',
                '.MuiTabs-indicator': {
                    backgroundColor: 'transparent',
                    top: 0,
                },
                '.MuiTab-root': {
                    px: 1,
                    color: 'text.secondary',
                    fontSize: '12px',
                    lineHeight: '12px',
                    minHeight: '28px',
                    height: '28px',
                    '&.Mui-selected': {
                        color: 'text.primary',
                    },
                },
                ".Mui-selected": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                },
            }}>
                <Tab label="AI" value="ai" icon={<Iconify icon="hugeicons:bot" sx={{ width: '14px', height: '14px', color: 'primary.main' }} />} iconPosition='start' />
                <Tab label="Popular" value="popular" icon={<Iconify icon="game-icons:coins" sx={{ width: '14px', height: '14px', color: 'primary.main' }} />} iconPosition='start' />
                <Tab label="Manual" value="manual" icon={<Iconify icon="material-symbols:person-apron-outline" sx={{ width: '14px', height: '14px', color: 'primary.main' }} />} iconPosition='start' />
            </Tabs>
        </Box>
        {
            currentGridTab === 'ai' && <Stack direction={smUp ? "row" : "column"} spacing={4}>
                <Stack direction="column" spacing={1} sx={{
                    maxWidth: smUp ? '300px' : '100%',
                    width: '100%',
                }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>1. Parameters</Typography>

                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Time Period</Typography>

                        <Tabs value={currentAiPeriod} onChange={handleChangeAiPeriod} sx={{
                            padding: 0,
                            minHeight: 0,
                            ".MuiTab-root": {
                                padding: 0,
                                margin: 0,
                                fontSize: '12px',
                                lineHeight: '12px',
                                minHeight: '20px',
                                height: '20px',
                                '&.Mui-selected': {
                                    color: 'text.primary',
                                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                },
                            },
                            ".MuiTabs-indicator": {
                                display: 'none',
                            },
                        }}>
                            <Tab label="3D" value="3d" />
                            <Tab label="7D" value="7d" />
                            <Tab label="30D" value="30d" />
                            <Tab label="180D" value="180d" />
                        </Tabs>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Price Range</Typography>
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>33323 - 20393 USDT</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Grid Number</Typography>
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>117</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Profile/grid(fee deducted)</Typography>
                        <Typography variant="caption" sx={{ color: 'text.primary' }}>0.37% = 1.55%</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems='center' sx={{ cursor: 'pointer' }} onClick={() => setCurrentGridTab('manual')}>
                        <Typography variant="caption" sx={{
                            color: 'text.secondary',
                            textDecoration: 'underline',
                        }}>
                            Copy parameters to Manual settings
                        </Typography>
                        <Iconify icon="mingcute:right-line" sx={{ color: 'text.secondary', }} />
                    </Stack>
                </Stack>

                <Stack direction="column" spacing={1} sx={{
                    maxWidth: smUp ? '300px' : '100%',
                    width: '100%',
                }}>
                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems='center' sx={{ mb: 1 }}>
                        <Typography variant="subtitle1">2. Investment</Typography>
                        <Stack direction="row" spacing={1} alignItems='center'>
                            <Iconify icon="cryptocurrency-color:usdt" sx={{ width: '20px', height: '20px' }} />
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>USDT</Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Typography variant="caption" sx={{
                            color: 'text.secondary',
                        }}>Avbl</Typography>
                        <Typography variant="caption" sx={{
                            color: 'text.secondary',
                        }}>-</Typography>
                        <Typography variant="caption" sx={{
                        }}>USDT</Typography>
                    </Stack>
                    <TradeInput label='Total' currentType='USDT' readOnly inputValue='' />
                    <Slider
                        size="medium"
                        marks
                        min={10}
                        step={10}
                        max={110}
                        defaultValue={30}
                        valueLabelDisplay="auto"
                    />
                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 1 }}>Create</Button>
                </Stack>
            </Stack>
        }
        {
            currentGridTab === 'popular' && <Stack direction="column" spacing={1}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems='center'>
                    <Tabs value={currentPopularType} onChange={handleChangePopularType} sx={{
                        padding: 0,
                        minHeight: 0,
                        ".MuiTab-root": {
                            mr: smUp ? 1 : 0.25,
                            letterSpacing: smUp ? 'normal' : '-1px',
                            py: 0.25,
                            px: 0.5,
                            fontSize: '12px',
                            lineHeight: '12px',
                            minHeight: '20px',
                            height: '20px',
                            '&.Mui-selected': {
                                color: 'text.primary',
                                backgroundColor: alpha(theme.palette.primary.main, 0.2),
                            },
                        },
                        ".MuiTabs-indicator": {
                            display: 'none',
                        },
                    }}>
                        <Tab label="Top ROI" value="top-roi" />
                        <Tab label="Top PNL" value="top-pnl" />
                        <Tab label="Top Copied" value="top-copied" />
                        <Tab label="Most Matched" value="most-matched" />
                    </Tabs>

                    {
                        smUp ?
                            <Button color="primary" size="small" onClick={() => popularGridStrategiesDialog.onTrue()}>View More Grids</Button>
                            :
                            <IconButton onClick={() => popularGridStrategiesDialog.onTrue()}><Iconify icon="mingcute:grid-line" sx={{ color: 'primary.main' }} /></IconButton>
                    }

                    <StyledDialog maxWidth="lg" open={popularGridStrategiesDialog.value} onClose={() => popularGridStrategiesDialog.onFalse()}>
                        <Box sx={{
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}>
                            <Stack direction="row" spacing={1} alignItems='center' justifyContent='space-between' sx={{ mb: 2 }}>
                                <Typography variant="subtitle1">Popular Grid Strategies</Typography>
                                <IconButton onClick={() => popularGridStrategiesDialog.onFalse()}><Iconify icon="bx:bx-x" sx={{ color: 'text.secondary' }} /></IconButton>
                            </Stack>

                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems='center' sx={{ mb: 2 }} >
                                <TextField label="Search" variant="outlined" size="small" fullWidth />

                                <FormControl sx={{
                                    mt: 0,
                                }}>
                                    <InputLabel id="data-sort-label">Date Sort</InputLabel>
                                    <Select
                                        labelId="data-sort-label"
                                        id="data-sort"
                                        value={popularGridDataSort}
                                        label="Date Sort"
                                        size="small"
                                        onChange={handleChangePopularGridDataSort}
                                    >
                                        <MenuItem value='asc'>Ascending</MenuItem>
                                        <MenuItem value='desc'>Descending</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Tabs value={currentPopularType} onChange={handleChangePopularType} sx={{
                                padding: 0,
                                minHeight: 0,
                                ".MuiTab-root": {
                                    mr: smUp ? 1 : 0.5,
                                    py: 0.25,
                                    px: 0.5,
                                    fontSize: '12px',
                                    letterSpacing: smUp ? 'normal' : '-1px',
                                    lineHeight: '12px',
                                    minHeight: '20px',
                                    height: '20px',
                                    '&.Mui-selected': {
                                        color: 'text.primary',
                                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                    },
                                },
                                ".MuiTabs-indicator": {
                                    display: 'none',
                                },
                            }}>
                                <Tab label="Top ROI" value="top-roi" />
                                <Tab label="Top PNL" value="top-pnl" />
                                <Tab label="Top Copied" value="top-copied" />
                                <Tab label="Most Matched" value="most-matched" />
                            </Tabs>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                gap: 1,
                                flex: 1,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                maxHeight: '320px',
                                width: smUp ? '660px' : '100%',
                            }}>
                                {
                                    Array.from({ length: 10 }).map((_, i) => <TradingTradeGridPopularStrategy key={`grid-popular-key-${i}`} sx={{
                                        ...(smUp ? {} : {
                                            maxWidth: '100%',
                                        })
                                    }} />)
                                }
                            </Box>
                        </Box>
                    </StyledDialog>
                </Stack>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 2,
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    maxHeight: '204px',
                }}>
                    {
                        Array.from({ length: 10 }).map((_, i) => <TradingTradeGridPopularStrategy key={`grid-popular-key-${i}`} sx={{
                            ...(smUp ? {} : {
                                maxWidth: '100%',
                            })
                        }} />)
                    }
                </Box>
            </Stack>
        }
        {
            currentGridTab === 'manual' && <Stack direction={smUp ? "row" : "column"} spacing={4}>
                <Stack direction="column" spacing={1} sx={{
                    maxWidth: '420px',
                    width: '100%',
                }}>
                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems='center'>
                        <Typography variant="subtitle1">1. Price Range</Typography>

                        <Button color="primary" size="small">Auto Fill</Button>
                    </Stack>

                    <Stack direction="row" spacing={0.5} justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                        <Input
                            placeholder="Lower"
                            disableUnderline
                            sx={{
                                '& input': {
                                    borderRadius: 0.5,
                                    p: 1,
                                    backgroundColor: alpha(theme.palette.background.opposite, 0.1),
                                    border: '1px solid transparent',
                                    transition: 'all 0.25s',
                                    '&:focus': {
                                        border: `1px solid ${theme.palette.primary.main}`,
                                        outline: '0',
                                    },
                                },
                            }}
                        />
                        <Typography variant="caption" sx={{ color: 'text.secondry' }}>-</Typography>
                        <Input
                            placeholder="Upper"
                            disableUnderline
                            sx={{
                                '& input': {
                                    borderRadius: 0.5,
                                    p: 1,
                                    backgroundColor: alpha(theme.palette.background.opposite, 0.1),
                                    border: '1px solid transparent',
                                    transition: 'all 0.25s',
                                    '&:focus': {
                                        border: `1px solid ${theme.palette.primary.main}`,
                                        outline: '0',
                                    },
                                },
                            }}
                        />
                    </Stack>

                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems='center'>
                        <Typography variant="subtitle1">2. Grids</Typography>
                    </Stack>

                    <TradeInput label='Amount' currentType='Grids' multiOptions={['Arithmetic', 'Geometric']} selectedMultiOption={gridManualGrids} onMultiOptionChange={(v) => setGridManualGrids(v)} />
                    <Stack direction="row" spacing={0.5} justifyContent="space-between" alignItems="center">
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Profit/grid(fees deducted)</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>0.09% - 0.12%</Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                        <Stack direction="row" alignItems="center" spacing={0.5} sx={{
                            cursor: 'pointer',
                        }} onClick={advancedPopover.onOpen} >
                            <Typography variant="caption" sx={{
                                color: 'text.secondary',
                                whiteSpace: 'nowrap',
                            }}>Advanced (Optional)</Typography>
                            <Iconify icon="la:edit" sx={{ color: 'text.secondary' }} />
                        </Stack>

                        <StyledPopover
                            open={Boolean(advancedPopover.open)}
                            anchorEl={advancedPopover.open}
                            onClose={advancedPopover.onClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <Box sx={{
                                p: 2,
                                borderRadius: 1,
                                backgroundColor: alpha(theme.palette.background.default, 0.2),
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                width: '320px',
                            }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>Advanced (Optional)</Typography>

                                <FormControlLabel control={<Checkbox color="primary" defaultChecked />} label="Trailing Up (Est. Cap Price --)" sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: '12px',
                                        color: 'text.secondary',
                                    },
                                    ml: -1,
                                    mr: 0,
                                }} />
                                <FormControlLabel control={<Checkbox color="primary" defaultChecked />} label="Grid Trigger" sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: '12px',
                                        color: 'text.secondary',
                                    },
                                    ml: -1,
                                    mr: 0,
                                }} />
                                <TradeInput label='Trigger Price' currentType='USDT' readOnly inputValue='' />
                                <FormControlLabel control={<Checkbox color="primary" defaultChecked />} label="Stop Trigger" sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: '12px',
                                        color: 'text.secondary',
                                    },
                                    ml: -1,
                                    mr: 0,
                                }} />
                                <TradeInput label='Stop Loss(trailing)' currentType='USDT' readOnly inputValue='' />
                                <TradeInput label='Take Profit' currentType='USDT' readOnly inputValue='' />
                                <FormControlLabel control={<Checkbox color="primary" defaultChecked />} label="Sell all base coin on stop" sx={{
                                    '& .MuiTypography-root': {
                                        fontSize: '12px',
                                        color: 'text.secondary',
                                    },
                                    ml: -1,
                                    mr: 0,
                                }} />
                                <Typography variant='caption' sx={{ color: 'error.main' }}>The grid uses the same quote asset USDT to place sub-orders, with variations in the exact quote asset USDT amount due to fluctuations in market prices.</Typography>
                            </Box>
                        </StyledPopover>

                        <FormControlLabel control={<Checkbox color="primary" defaultChecked />} label="Sell all base coin on stop" sx={{
                            '& .MuiTypography-root': {
                                fontSize: '12px',
                                color: 'text.secondary',
                            },
                            mx: 0,
                        }} />
                    </Stack>
                </Stack>

                <Stack direction="column" spacing={1} sx={{
                    maxWidth: '420px',
                    width: '100%',
                }}>
                    <Stack direction="row" spacing={2} justifyContent="space-between" alignItems='center' sx={{ mb: 1 }}>
                        <Typography variant="subtitle1">3. Investment</Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            position: 'relative',
                            gap: 1,
                            cursor: 'pointer',
                        }} onClick={() => investMentCurrencyMenuShow.onToggle()}>
                            <Stack direction="row" spacing={1} alignItems='center'>
                                <Iconify icon="cryptocurrency-color:usdt" sx={{ width: '20px', height: '20px' }} />
                                <Typography variant="body2" sx={{ color: 'text.primary' }}>USDT</Typography>
                            </Stack>
                            {
                                investMentCurrency === "USDT+BTC" && <>
                                    <Typography variant="body2">+</Typography>
                                    <Stack direction="row" spacing={1} alignItems='center'>
                                        <Iconify icon="logos:bitcoin" sx={{ width: '20px', height: '20px' }} />
                                        <Typography variant="body2" sx={{ color: 'text.primary' }}>BTC</Typography>
                                    </Stack>
                                </>
                            }
                            {
                                investMentCurrencyMenuShow.value ? <Iconify icon="gravity-ui:caret-up" sx={{ color: 'text.secondary' }} /> : <Iconify icon="gravity-ui:caret-down" sx={{ color: 'text.secondary' }} />
                            }

                            <Box sx={{
                                position: 'absolute',
                                right: 0,
                                top: '32px',
                                p: 0.5,
                                borderRadius: 0.5,
                                backgroundColor: alpha(theme.palette.background.default, 0.3),
                                backdropFilter: 'blur(10px)',
                                display: investMentCurrencyMenuShow.value ? 'block' : 'none',
                            }}>
                                <MenuItem onClick={() => { setInvestMentCurrency('USDT') }}>USDT</MenuItem>
                                <MenuItem onClick={() => { setInvestMentCurrency('USDT+BTC') }}>USDT + BTC</MenuItem>
                            </Box>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Typography variant="caption" sx={{
                            color: 'text.secondary',
                        }}>Avbl</Typography>
                        <Typography variant="caption" sx={{
                            color: 'text.secondary',
                        }}>-</Typography>
                        <Typography variant="caption" sx={{
                        }}>USDT</Typography>
                    </Stack>
                    <TradeInput label='Total' currentType='USDT' readOnly inputValue='' />
                    <Slider
                        size="medium"
                        marks
                        min={10}
                        step={10}
                        max={110}
                        defaultValue={30}
                        valueLabelDisplay="auto"
                    />

                    {
                        investMentCurrency === "USDT+BTC" && <>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="caption" sx={{
                                    color: 'text.secondary',
                                }}>Avbl</Typography>
                                <Typography variant="caption" sx={{
                                    color: 'text.secondary',
                                }}>-</Typography>
                                <Typography variant="caption" sx={{
                                }}>BTC</Typography>
                            </Stack>
                            <TradeInput label='Total' currentType='BTC' readOnly inputValue='' />
                            <Slider
                                size="medium"
                                marks
                                min={10}
                                step={10}
                                max={110}
                                defaultValue={30}
                                valueLabelDisplay="auto"
                            />
                        </>
                    }

                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 1 }}>Create</Button>
                </Stack>
            </Stack>
        }
    </Box>
}