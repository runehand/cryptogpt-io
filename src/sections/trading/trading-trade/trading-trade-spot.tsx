import { useState } from 'react';

import { Box, Tab, Tabs, Stack, alpha, Button, Slider, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { TradeInput } from 'src/components/trade-input';

import TradingTradeMethod from './trading-trade-method';


export function TradingTradeSpot() {
    const [currentSpotTab, setCurrentSpotTab] = useState('limit');
    const [spotMarket, setSpotMarket] = useState('Amount');
    const smUp = useResponsive('up', 'sm');
    const [currentTradeType, setCurrentTradeType] = useState<"BUY" | "SELL">('BUY');

    const handleChangeSpotTab = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentSpotTab(newValue);
    };

    return <Box>
        {
            !smUp && <TradingTradeMethod tradeType={currentTradeType} onChangeTradeType={(type) => setCurrentTradeType(type)} />
        }

        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            mb: 2,
        }}>

            <Tabs value={currentSpotTab} onChange={handleChangeSpotTab} sx={{
                backgroundColor: theme => alpha(theme.palette.background.default, 0.2),
                border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                p: 0.5,
                borderRadius: '0px',
                '.MuiTabs-indicator': {
                    backgroundColor: 'transparent',
                    top: 0,
                },
                '.MuiTab-root': {
                    mr: smUp ? 1 : 0,
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
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                },
            }}>
                <Tab label="Limit" value="limit" />
                <Tab label="Market" value="market" />
                <Tab label="Stop limit" value="stop-limit" />
                <Tab label="Trailing limit" value="trailing-limit" />
                <Tab label="OCO" value="oco" />
            </Tabs>
        </Box>

        {
            currentSpotTab === 'limit' && <Stack direction={smUp ? "row" : "column"} spacing={2}>
                {
                    (smUp || currentTradeType === "BUY") && <Stack direction="column" spacing={1} sx={{
                        maxWidth: smUp ? '300px' : '100%',
                    }}>
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

                        <TradeInput label='Price' currentType='USDT' />
                        <TradeInput label='Amount' currentType='BTC' />

                        <Slider
                            size="medium"
                            marks
                            min={10}
                            step={10}
                            max={110}
                            defaultValue={30}
                            valueLabelDisplay="auto"
                        />

                        <Button variant="contained" color="primary" fullWidth sx={{
                            color: 'text.primary',
                        }}>BUY</Button>
                    </Stack>
                }

                {
                    (smUp || currentTradeType === "SELL") && <Stack direction="column" spacing={1} sx={{
                        maxWidth: smUp ? '300px' : '100%',
                    }}>
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

                        <TradeInput label='Price' currentType='USDT' />
                        <TradeInput label='Amount' currentType='BTC' />

                        <Slider
                            size="medium"
                            marks
                            min={10}
                            step={10}
                            max={110}
                            defaultValue={30}
                            valueLabelDisplay="auto"
                        />

                        <Button variant='outlined' color="primary" fullWidth>SELL</Button>
                    </Stack>
                }
            </Stack>
        }

        {
            currentSpotTab === 'market' && <Stack direction={smUp ? "row" : "column"} spacing={2}>
                {
                    (smUp || currentTradeType === "BUY") && <Stack direction="column" spacing={1} sx={{
                        maxWidth: smUp ? '300px' : '100%',
                    }}>
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

                        <TradeInput label='Price' currentType='BTC' readOnly inputValue='Market' />
                        <TradeInput label='Amount' currentType='BTC' multiOptions={['Amount', 'Total']} selectedMultiOption={spotMarket} onMultiOptionChange={(v) => setSpotMarket(v)} />

                        <Slider
                            size="medium"
                            marks
                            min={10}
                            step={10}
                            max={110}
                            defaultValue={30}
                            valueLabelDisplay="auto"
                        />

                        <Button variant="contained" color="primary" fullWidth sx={{
                            color: 'text.primary',
                        }}>BUY</Button>
                    </Stack>
                }

                {(smUp || currentTradeType === "SELL") && <Stack direction="column" spacing={1} sx={{
                    maxWidth: smUp ? '300px' : '100%',
                }}>
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

                    <TradeInput label='Amount' currentType='BTC' readOnly inputValue='Market' />
                    <TradeInput label='Amount' currentType='BTC' multiOptions={['Amount', 'Total']} selectedMultiOption={spotMarket} onMultiOptionChange={(v) => setSpotMarket(v)} />

                    <Slider
                        size="medium"
                        marks
                        min={10}
                        step={10}
                        max={110}
                        defaultValue={30}
                        valueLabelDisplay="auto"
                    />

                    <Button variant='outlined' color="primary" fullWidth>SELL</Button>
                </Stack>
                }
            </Stack>
        }

        {
            currentSpotTab === 'stop-limit' && <Stack direction={smUp ? "row" : "column"} spacing={2}>
                {
                    (smUp || currentTradeType === "BUY") && <Stack direction="column" spacing={1} sx={{
                        maxWidth: smUp ? '300px' : '100%',
                    }}>
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

                        <TradeInput label='Stop' currentType='USDT' />
                        <TradeInput label='Limit' currentType='USDT' />
                        <TradeInput label='Amount' currentType='BTC' />

                        <Slider
                            size="medium"
                            marks
                            min={10}
                            step={10}
                            max={110}
                            defaultValue={30}
                            valueLabelDisplay="auto"
                        />

                        <Button variant="contained" color="primary" fullWidth sx={{
                            color: 'text.primary',
                        }}>BUY</Button>
                    </Stack>
                }

                {
                    (smUp || currentTradeType === "SELL") && <Stack direction="column" spacing={1} sx={{
                        maxWidth: smUp ? '300px' : '100%',
                    }}>
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

                        <TradeInput label='Stop' currentType='USDT' />
                        <TradeInput label='Limit' currentType='USDT' />
                        <TradeInput label='Amount' currentType='BTC' />

                        <Slider
                            size="medium"
                            marks
                            min={10}
                            step={10}
                            max={110}
                            defaultValue={30}
                            valueLabelDisplay="auto"
                        />

                        <Button variant='outlined' color="primary" fullWidth>SELL</Button>
                    </Stack>
                }
            </Stack>
        }

        {
            currentSpotTab === 'trailing-limit' && <Stack direction={smUp ? "row" : "column"} spacing={2}>
                {
                    (smUp || currentTradeType === "BUY") && <Stack direction="column" spacing={1} sx={{
                        maxWidth: smUp ? '300px' : '100%',
                    }}>
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

                        <Stack direction="row" spacing={1}>
                            <TradeInput label='Trailing Delta' currentType='%' />
                            <Button sx={{
                                backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1),
                                color: 'text.primary',
                                borderRadius: '2px',
                                px: 0.5,
                                minWidth: '38px',
                                height: '38px',
                            }}>1%</Button>
                            <Button sx={{
                                backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1),
                                color: 'text.primary',
                                borderRadius: '2px',
                                px: 0.5,
                                minWidth: '38px',
                                height: '38px',
                            }}>2%</Button>
                        </Stack>
                        <TradeInput label='Limit' currentType='USDT' />
                        <TradeInput label='Amount' currentType='BTC' />

                        <Slider
                            size="medium"
                            marks
                            min={10}
                            step={10}
                            max={110}
                            defaultValue={30}
                            valueLabelDisplay="auto"
                        />

                        <Button variant="contained" color="primary" fullWidth sx={{
                            color: 'text.primary',
                        }}>BUY</Button>
                    </Stack>
                }

                {
                    (smUp || currentTradeType === "SELL") && <Stack direction="column" spacing={1} sx={{
                        maxWidth: smUp ? '300px' : '100%',
                    }}>
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

                        <Stack direction="row" spacing={1}>
                            <TradeInput label='Trailing Delta' currentType='%' />
                            <Button sx={{
                                backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1),
                                color: 'text.primary',
                                borderRadius: '2px',
                                px: 0.5,
                                minWidth: '38px',
                                height: '38px',
                            }}>1%</Button>
                            <Button sx={{
                                backgroundColor: theme => alpha(theme.palette.background.opposite, 0.1),
                                color: 'text.primary',
                                borderRadius: '2px',
                                px: 0.5,
                                minWidth: '38px',
                                height: '38px',
                            }}>2%</Button>
                        </Stack>
                        <TradeInput label='Limit' currentType='USDT' />
                        <TradeInput label='Amount' currentType='BTC' />

                        <Slider
                            size="medium"
                            marks
                            min={10}
                            step={10}
                            max={110}
                            defaultValue={30}
                            valueLabelDisplay="auto"
                        />

                        <Button variant='outlined' color="primary" fullWidth>SELL</Button>
                    </Stack>
                }
            </Stack>
        }

        {
            currentSpotTab === 'oco' && <Stack direction={smUp ? "row" : "column"} spacing={2}>
                {
                    (smUp || currentTradeType === "BUY") && <Stack direction="column" spacing={1} sx={{
                        maxWidth: smUp ? '300px' : '100%',
                    }}>
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

                        <TradeInput label='Price' currentType='USDT' />
                        <TradeInput label='Stop' currentType='USDT' />
                        <TradeInput label='Limit' currentType='USDT' />
                        <TradeInput label='Amount' currentType='BTC' />

                        <Slider
                            size="medium"
                            marks
                            min={10}
                            step={10}
                            max={110}
                            defaultValue={30}
                            valueLabelDisplay="auto"
                        />

                        <Button variant="contained" color="primary" fullWidth sx={{
                            color: 'text.primary',
                        }}>BUY</Button>
                    </Stack>
                }

                {
                    (smUp || currentTradeType === "SELL") && <Stack direction="column" spacing={1} sx={{
                        maxWidth: smUp ? '300px' : '100%',
                    }}>
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

                        <TradeInput label='Price' currentType='USDT' />
                        <TradeInput label='Stop' currentType='USDT' />
                        <TradeInput label='Limit' currentType='USDT' />
                        <TradeInput label='Amount' currentType='BTC' />

                        <Slider
                            size="medium"
                            marks
                            min={10}
                            step={10}
                            max={110}
                            defaultValue={30}
                            valueLabelDisplay="auto"
                        />

                        <Button variant='outlined' color="primary" fullWidth>SELL</Button>
                    </Stack>
                }
            </Stack>
        }
    </Box>
}