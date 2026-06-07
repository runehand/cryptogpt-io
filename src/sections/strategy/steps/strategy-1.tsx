import { useState } from 'react';
import { Pie, Line, Area, Cell, XAxis, YAxis, Tooltip, PieChart, LineChart, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';

import { alpha } from '@mui/system';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Box, Tab, Tabs, Stack, Select, Button, Switch, Rating, BoxProps, MenuItem, useTheme, TextField, Typography, ButtonBase, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from "src/store/strategy/useStrategy";

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useCarousel } from 'src/components/carousel';
import { StyledDialog } from 'src/components/styled-component';

import InternetNoiseItem from '../internet-noise-item';
import StrategyCoinSelector from '../strategy-coin-selector';

const filter = createFilterOptions<any>();

interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}

interface StrategyStep1Props extends BoxProps {

};

export default function StrategyStep1({ sx, ...other }: StrategyStep1Props) {
    const theme = useTheme();
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);
    const topAmountCase = useStrategy((state) => state.topAmountCase);
    const setTopAmountCase = useStrategy((state) => state.setTopAmountCase);
    const selectedPair = useStrategy((state) => state.selectedPair);
    const setSelectedPair = useStrategy((state) => state.setSelectedPair);
    const timeframe = useStrategy((state) => state.timeframe);
    const setTimeframe = useStrategy((state) => state.setTimeframe);
    const internetNoise = useStrategy((state) => state.internetNoise);
    const toggleInternetNoise = useStrategy((state) => state.toggleInternetNoise);
    const addInternetNoise = useStrategy((state) => state.addInternetNoise);
    const dataSources = useStrategy((state) => state.dataSources);
    const updateDataSource = useStrategy((state) => state.updateDataSource);
    const [lastSelectedDataSourceIndex, setLastSelectedDataSourceIndex] = useState(-1);
    const smUp = useResponsive("up", 'sm');
    const isPercentageForBalance = useBoolean(false);
    const isTradingPairSelectModalShow = useBoolean(false);
    const internetNoiseAddModalShow = useBoolean(false);
    const settingTypeIn1step = useStrategy((state) => state.settingTypeIn1step);
    const setSettingTypeIn1step = useStrategy((state) => state.setSettingTypeIn1step);
    const [newInternetNoiseSource, setNewInternetNoiseSource] = useState('');
    const [apikey, setApikey] = useState('');
    const [secretkey, setSecretkey] = useState('');
    const strategyForge = useStrategy((state) => state.strategyForge);
    const setStrategyForge = useStrategy((state) => state.setStrategyForge);

    const [strategySearchValue, setStrategySearchValue] = useState<any>(null);
    const [strategySearchInputValue, setStrategySearchInputValue] = useState('');
    const carouselPreloadIndicator = useCarousel({
        slidesToShow: 4,
    });

    const handleSwapCoin = () => {
        const [temp1, temp2] = [coin1, coin2];
        setCoin1(temp2);
        setCoin2(temp1);
    }

    const handleAddInternetNoise = () => {
        addInternetNoise({ name: newInternetNoiseSource, isActive: true });
        internetNoiseAddModalShow.onFalse();
    }

    const handleSelectDataSource = (index: number) => {
        if (dataSources[index].name === "Pyth Network") {
            updateDataSource(index, { ...dataSources[index], isSelected: !dataSources[index].isSelected });
        } else if (dataSources[index].isSelected) {
            updateDataSource(index, { ...dataSources[index], isSelected: !dataSources[index].isSelected });
        } else {
            setLastSelectedDataSourceIndex(index);
            setApikey(dataSources[index].apiKey || '');
            setSecretkey(dataSources[index].secretKey || '');
            updateDataSource(index, { ...dataSources[index], isSelected: true });
        }
    }

    const handleSaveDataSourceKeys = () => {
        updateDataSource(lastSelectedDataSourceIndex, { ...dataSources[lastSelectedDataSourceIndex], apiKey: apikey, secretKey: secretkey });
        setLastSelectedDataSourceIndex(-1);
        setApikey('');
        setSecretkey('');
    }

    const handleStrategyForge = (_data: any) => {
        if (strategyForge.find((item) => item.value === _data.value)) {
            setStrategyForge(strategyForge.filter((item) => item.value !== _data.value));
        } else {
            setStrategyForge([...strategyForge, _data]);
        }
    }

    return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
        <Typography variant={smUp ? "h4" : 'h6'} color="primary" sx={{
            textAlign: smUp ? "center" : 'left',
            my: 2,
        }}>Choose the cryptocurrency pairs you want to trade.</Typography>

        <Stack direction="column" spacing={2} sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
        }}>

            <Stack direction='column' spacing={2}>
                <Typography variant="h4" sx={{
                    whitespace: 'nowrap',
                    mr: 11,
                }}>1. Start, Select Pair</Typography>

                <Stack direction="row" alignItems='center' justifyContent="space-between">
                    <IconButton onClick={() => isTradingPairSelectModalShow.onTrue()}>
                        <Iconify icon="tabler:search" sx={{
                            color: 'primary.main',
                            width: '24px',
                            height: '24px',
                        }} />
                    </IconButton>

                    <Stack direction="row" alignItems='center' justifyContent="center" spacing={2}>
                        <StrategyCoinSelector size={smUp ? "medium" : 'small'} currency={coin1} handleChange={setCoin1} />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            <ButtonBase sx={{
                            }} onClick={() => handleSwapCoin()}>
                                <Image src="/assets/images/ethereum-to-dollar-swap.png" alt="swap" sx={{
                                    width: smUp ? '32px' : '24px',
                                    height: smUp ? '32px' : '24px',
                                }} />
                            </ButtonBase>
                        </Box>
                        <StrategyCoinSelector size={smUp ? "medium" : 'small'} currency={coin2} handleChange={setCoin2} />

                        <Select size={smUp ? "medium" : 'small'}
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value as string)}
                            sx={{
                                border: `1px solid ${theme.palette.primary.main}`,
                            }}>
                            {
                                timeframesDummyData.map((item) => <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>)
                            }
                        </Select>
                    </Stack>

                    <IconButton onClick={() => isTradingPairSelectModalShow.onTrue()}>
                        <Iconify icon="tabler:search" sx={{
                            color: 'primary.main',
                            width: '24px',
                            height: '24px',
                        }} />
                    </IconButton>
                </Stack>
            </Stack>

            <Stack direction="column" sx={{
                width: '100%',
            }}>
                <Box
                    sx={{
                        position: 'relative',
                    }}
                >
                    <Box sx={{
                        width: '100%',
                        aspectRatio: '3 / 2',
                        maxHeight: '200px',
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

                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                        }}>

                            <FormControl size="small" variant="outlined" fullWidth>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type='text'
                                    startAdornment={
                                        <InputAdornment position="end">
                                            <Typography sx={{ color: 'primary.main' }}>{isPercentageForBalance.value ? "%" : "$"}</Typography>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <Button sizem="small" variant="outlined" color="primary"
                                sx={{
                                    minWidth: '42px',
                                }}
                                onClick={() => isPercentageForBalance.onToggle()}
                            >
                                {isPercentageForBalance.value ? "$" : "%"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Stack>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                <Typography variant="h6" sx={{
                    color: 'primary.main',
                }}>Create Custom Strategy</Typography>

                <Autocomplete
                    id="strategy-autocomplete"
                    fullWidth
                    options={strategyDummyData}
                    value={strategySearchValue}
                    onChange={(event: any, newValue: any) => {
                        if (typeof newValue === 'string') {
                            // timeout to avoid instant validation of the dialog's form.
                            alert('string');
                        } else if (newValue && newValue.inputValue) {
                            alert('object');
                        } else {
                            setStrategySearchValue(newValue);
                        }
                    }}
                    inputValue={strategySearchInputValue}
                    onInputChange={(event, newInputValue) => {
                        setStrategySearchInputValue(newInputValue);
                    }}
                    autoHighlight
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.name;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                title: `Add "${params.inputValue}"`,
                                isNew: true,
                            });
                        }

                        return filtered;
                    }}

                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <Box
                                key={key}
                                component="li"
                                sx={{
                                    p: 1,
                                    cursor: 'pointer',
                                }}
                                {...optionProps}
                            >
                                {
                                    option.isNew ?
                                        <Button variant="outlined" color="primary" sx={{
                                            width: '100%',
                                        }}>Add New Strategy</Button> :
                                        <Box sx={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            gap: 1,
                                        }}>
                                            <Image src={option.logo} sx={{
                                                width: '32px',
                                                height: '32px',
                                            }} />

                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}>
                                                <Typography variant="subtitle2">{option.name}</Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>{option.description}</Typography>
                                            </Box>

                                            <Box sx={{
                                                flex: 1,
                                                height: '48px',
                                            }}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <LineChart
                                                        data={data}
                                                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                                    >
                                                        <XAxis dataKey="time" hide />
                                                        <YAxis dataKey='price' hide />
                                                        <Line type="monotone" dataKey="price" stroke={theme.palette.primary.main} dot={false} />
                                                    </LineChart>
                                                </ResponsiveContainer>
                                            </Box>

                                            <Typography sx={{ color: 'success.main', textAlign: 'right' }}>+7%</Typography>
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '120px',
                                                gap: 1,
                                            }}>
                                                <Iconify icon="mingcute:time-line" sx={{
                                                    color: 'success.main',
                                                }} />
                                                <Typography variant="caption" sx={{
                                                    color: 'text.primary',
                                                    whiteSpace: 'nowrap',
                                                }}>Active: 29.1h</Typography>
                                            </Box>
                                            <Rating name="half-rating" size="small" defaultValue={2.5} precision={0.5} />
                                        </Box>
                                }
                            </Box>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search the strategy"
                            inputProps={{
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            }}
                        />
                    )}
                />

                <Tabs value={settingTypeIn1step} onChange={(e, v) => setSettingTypeIn1step(v)} sx={{
                    mb: 1,
                }}>
                    <Tab value="basic" label="Basic Setting" />
                    <Tab value="advanced" label="Advanced Setting" />
                </Tabs>

                {
                    settingTypeIn1step === 'basic' &&
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    }}>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor="my-profit-target-input">My Profit Target</InputLabel>
                            <OutlinedInput
                                id='my-profit-target-input'
                                type='text'
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Iconify icon="hugeicons:trade-up" sx={{
                                            color: 'success.main',
                                        }} />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Typography sx={{ color: 'text.primary' }}>%</Typography>
                                    </InputAdornment>
                                }
                                placeholder="Example: 10%"
                                label="My Profit Target"
                            />
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor="stop-less-input">Stop less</InputLabel>
                            <OutlinedInput
                                id='stop-less-input'
                                type='text'
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Iconify icon="hugeicons:trade-down" sx={{
                                            color: 'error.main',
                                        }} />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Typography sx={{ color: 'text.primary' }}>%</Typography>
                                    </InputAdornment>
                                }
                                placeholder="Example: 10%"
                                label="My Profit Target"
                            />
                        </FormControl>
                        <FormControl fullWidth size="small">
                            <InputLabel htmlFor="max-draw-down-input">Max Draw Down</InputLabel>
                            <OutlinedInput
                                id='max-draw-down-input'
                                type='text'
                                startAdornment={
                                    <InputAdornment position="start">
                                        <Iconify icon="hugeicons:trade-down" sx={{
                                            color: 'primary.main',
                                        }} />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <Typography sx={{ color: 'text.primary' }}>%</Typography>
                                    </InputAdornment>
                                }
                                placeholder="Example: 10%"
                                label="My Profit Target"
                            />
                        </FormControl>
                    </Box>
                }

                {
                    settingTypeIn1step === 'advanced' &&
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}>
                            <Typography variant="subtitle2" sx={{
                                color: 'primary.main',
                            }}>Preloaded Indicators</Typography>
                            <Box sx={{
                                width: '100%',
                                overflowX: 'auto',
                                overflowY: 'hidden',
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    gap: 1,
                                }}>
                                    {
                                        [...strategyForgeDummyData, ...strategyForgeDummyData].map((item, index) => <ButtonBase key={`key-indicator-${index}`} direction="row" alignItems='center' spacing={2} sx={{
                                            width: '100px',
                                            height: '80px',
                                            borderRadius: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1,
                                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                            cursor: 'pointer',
                                            trasnition: 'all 0.3s',
                                            flexGrow: 0,
                                            flexShrink: 0,
                                            ...(strategyForge.find((i) => i.value === item.value) && {
                                                backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.9)}, ${alpha(theme.palette.primary.dark, 0.4)})`,
                                            }),
                                        }}
                                            onClick={() => handleStrategyForge(item)}
                                        >
                                            <Iconify icon={item.icon} sx={{
                                                color: 'text.primary',
                                                width: '32px',
                                                height: '32px',
                                            }} />
                                            <Typography variant="subtitle2" sx={{
                                                color: 'text.primary',
                                            }}>{item.label}</Typography>
                                        </ButtonBase>
                                        )
                                    }
                                </Box>
                            </Box>
                            {
                                strategyForge.length !== 0 &&
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    borderRadius: 1,
                                    border: `1px dashed ${theme.palette.primary.main}`,
                                    p: 1,
                                }}>
                                    {
                                        strategyForge.map((item, index) => <Button key={`key-indicator-${index}`} direction="row" alignItems='center' spacing={2} sx={{
                                            backgroundImage: `linear-gradient(to right, ${alpha(theme.palette.primary.main, 0.9)}, ${alpha(theme.palette.primary.dark, 0.4)})`,
                                        }}>
                                            {item.label}
                                        </Button>)
                                    }
                                </Box>
                            }
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}>
                            <Typography variant="subtitle2" sx={{
                                color: 'primary.main',
                            }}>Indicator Configure</Typography>
                            {
                                [1, 2, 3, 4].map((item, index) => <Stack key={`key-indicator-${index}`} direction="row" alignItems='center' spacing={2} sx={{ width: '100%' }}>
                                    <FormControl sx={{
                                        '.MuiInputBase-root': {
                                            border: 'none',
                                            width: '100px',
                                        },
                                    }}>
                                        <InputLabel htmlFor="indicator-label">indicators</InputLabel>
                                        <Select labelId="indicator-label" id="indicator" label="Time frame" size="small" value="SMA" sx={{
                                            border: `1px solid ${theme.palette.primary.main}`,
                                        }}>
                                            <MenuItem value="SMA">SMA</MenuItem>
                                            <MenuItem value="EMA">EMA</MenuItem>
                                            <MenuItem value="RSI">RSI</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{
                                        '.MuiInputBase-root': {
                                            border: 'none',
                                            width: '100px',
                                        },
                                    }}>
                                        <InputLabel htmlFor="add-indicator-label">Operator</InputLabel>
                                        <Select labelId="add-indicator-label" id="add-indicator" label="Operator" size="small" value="plus" sx={{
                                            border: `1px solid ${theme.palette.primary.main}`
                                        }}>
                                            <MenuItem value="plus">plus</MenuItem>
                                            <MenuItem value="minus">minus</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField size="small" sx={{ flex: 1 }} />
                                    <IconButton sx={{
                                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                    }}>
                                        <Iconify icon="fa:trash" sx={{
                                            color: 'primary.main',
                                            width: '24px',
                                            hegiht: '24px',
                                        }} />
                                    </IconButton>
                                </Stack>
                                )
                            }
                            <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-end',
                            }}>
                                <Button variant="contained" size="small" color="primary" startIcon={<Iconify icon="material-symbols:add" />}>Add Indicator</Button>
                            </Box>
                        </Box>

                        <Box sx={{}}>
                            <Typography variant="subtitle2" sx={{
                                color: 'primary.main',
                                mb: 1,
                            }}>Internet Noise</Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: 1,
                            }}>
                                {
                                    internetNoise.map((item, index) => <InternetNoiseItem
                                        key={`internet-noise-${index}`}
                                        name={item.name}
                                        logo={item.logo}
                                        startColor={item.startColor}
                                        endColor={item.endColor}
                                        isActive={item.isActive}
                                        onChangleActive={() => toggleInternetNoise(index)}
                                    />)
                                }
                                <Button variant='outlined' color='primary' startIcon={<Iconify icon="material-symbols:add" />}
                                    onClick={() => internetNoiseAddModalShow.onTrue()}>Add Source</Button>

                                <StyledDialog open={internetNoiseAddModalShow.value} onClose={() => internetNoiseAddModalShow.onFalse()}>
                                    <Box sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        width: '400px',
                                    }}>
                                        <Typography variant="h6" sx={{
                                            color: 'primary.main',
                                        }}>Add New Internet Noise Source</Typography>
                                        <FormControl fullWidth size="small">
                                            <InputLabel htmlFor="source-name-input">Source Name</InputLabel>
                                            <OutlinedInput
                                                id='source-name-input'
                                                type='text'
                                                placeholder="Source Name"
                                                label="Source Name"
                                                value={newInternetNoiseSource}
                                                onChange={(e) => setNewInternetNoiseSource(e.target.value)}
                                            />
                                        </FormControl>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}>
                                            <Button variant="contained" color="primary" onClick={() => handleAddInternetNoise()}>Add</Button>
                                        </Box>
                                    </Box>
                                </StyledDialog>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{
                                color: 'primary.main',
                            }}>Data Sources</Typography>

                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: 1,
                            }}>
                                {
                                    dataSources.map((item, index) => <Button
                                        key={`data-source-${index}`}
                                        variant={item.isSelected ? "contained" : 'outlined'}
                                        color="primary"
                                        sx={{
                                            position: 'relative',
                                            flexShrink: 0,
                                            ...(item.isSelected && {
                                                backgroundImage: `linear-gradient(to right, ${item.startColor} 0%, ${item.endColor} 100%)`,
                                                color: 'white',
                                            }),
                                        }}
                                        onClick={() => handleSelectDataSource(index)}
                                        startIcon={
                                            <Box sx={{
                                                width: '24px',
                                                height: '24px',
                                                backgroundImage: `url(${item.logo})`,
                                                backgroundSize: 'cover',
                                            }} />
                                        }
                                    >
                                        {item.name}
                                        {
                                            item.apiKey &&
                                            <Iconify icon="fluent:key-multiple-20-regular" sx={{
                                                position: 'absolute',
                                                right: '-8px',
                                                bottom: '-6px',
                                                backgroundColor: 'background.default',
                                                color: 'primary.main',
                                                border: `1px solid ${theme.palette.primary.main}`,
                                                borderRadius: '50%',
                                                p: '3px',
                                            }} />
                                        }
                                    </Button>)
                                }

                                <StyledDialog open={lastSelectedDataSourceIndex !== -1} onClose={() => setLastSelectedDataSourceIndex(-1)}>
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        p: 2,
                                        width: '400px',
                                    }}>
                                        <Typography variant="h6" sx={{
                                        }}>Set API Keys for {dataSources[lastSelectedDataSourceIndex]?.name || ""}</Typography>
                                        <TextField
                                            label="API Key"
                                            variant="outlined"
                                            fullWidth
                                            value={apikey}
                                            onChange={(e) => setApikey(e.target.value)}
                                        />
                                        <TextField
                                            label="Secret Key"
                                            variant="outlined"
                                            fullWidth
                                            value={secretkey}
                                            onChange={(e) => setSecretkey(e.target.value)}
                                        />
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                        }}>
                                            <Button variant="contained" color="primary" onClick={() => handleSaveDataSourceKeys()}>Save</Button>
                                        </Box>
                                    </Box>
                                </StyledDialog>
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}>
                            <Iconify icon="mingcute:time-line" sx={{
                                color: 'primary.main',
                            }} />
                            <Typography variant="subtitle2" sx={{
                                flex: 1,
                            }}>Auto-rebalance</Typography>
                            <Switch />
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}>
                            <Iconify icon="fa:usd" sx={{
                                color: 'primary.main',
                            }} />
                            <Typography variant="subtitle2" sx={{
                                flex: 1,
                            }}>Reinvest Profits</Typography>
                            <Switch />
                        </Box>
                    </Box>
                }

                {/* <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        backgroundImage: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)} 25%, transparent 25%, transparent 50%, ${alpha(theme.palette.primary.main, 0.1)} 50%, ${alpha(theme.palette.primary.main, 0.1)} 75%, transparent 75%, transparent)`,
                        mb: 1,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'space-between',
                        }}>
                            <Box>
                                <Typography variant="h5" sx={{
                                    color: 'primary.main'
                                }}>Credit Balance</Typography>
                                <Typography variant="subtitle2" sx={{
                                    color: 'text.primary',
                                }}>Available for strategies</Typography>
                            </Box>
                            <Iconify icon="fluent-mdl2:payment-card" sx={{
                                color: 'primary.main',
                                width: '36px',
                                height: '36px',
                            }} />
                        </Box>
                        <Typography variant="h5" sx={{
                            color: 'primary.main'
                        }}>1000.00 CRGPT</Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}>
                            <Iconify icon="bx:user" sx={{
                                color: 'primary.main',
                                width: '42px',
                                height: '42px',
                                p: 0.5,
                                borderRadius: '50%',
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                            }} />
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                <Typography variant="body2" sx={{
                                    color: 'text.primary',
                                }}>John Doe</Typography>
                                <Typography variant="caption" sx={{
                                    color: 'text.secondary',
                                }}>Premium Member</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        p: 1,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        boxShadow: `0 2px 5px 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Typography variant="subtitle2" sx={{
                                color: 'text.primary',
                            }}>Strategy Score:</Typography>
                            <Typography variant="h6" sx={{
                                color: 'primary.main'
                            }}>75/100</Typography>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Typography variant="subtitle2" sx={{
                                color: 'text.primary',
                            }}>Strategy Cost:</Typography>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'flex-end',
                                gap: 1,
                            }}>
                                <Typography variant="h6" sx={{
                                    color: 'primary.main'
                                }}>4.29 CRGPT</Typography>
                                <Typography variant="body2" sx={{
                                    color: 'primary.main'
                                }}>$0.30</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box> */}
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1,
            }}>
                <Button variant="soft" color="success" fullWidth sx={{
                    display: 'flex',
                    flexDirection: smUp ? "row" : 'column',
                    alignItems: 'center',
                    p: smUp ? 1 : 0.5,
                    gap: 0.5,
                }}>
                    <Iconify icon="la:chart-line" sx={{
                        width: '24px',
                        height: '24px',
                    }} />
                    <Typography variant="body2" sx={{ fontSize: smUp ? "14px" : '10px' }}>Run Backtest</Typography>
                </Button>
                <Button variant="soft" color="primary" fullWidth sx={{
                    display: 'flex',
                    flexDirection: smUp ? "row" : 'column',
                    alignItems: 'center',
                    p: smUp ? 1 : 0.5,
                    gap: 0.5,
                }}>
                    <Iconify icon="et:strategy" sx={{
                        width: '24px',
                        height: '24px',
                    }} />
                    <Typography variant="body2" sx={{ fontSize: smUp ? "14px" : '10px' }}>Create Strategy</Typography>
                </Button>
                <Button variant="soft" color="info" fullWidth sx={{
                    display: 'flex',
                    flexDirection: smUp ? "row" : 'column',
                    alignItems: 'center',
                    p: smUp ? 1 : 0.5,
                    gap: 0.5,
                }}>
                    <Iconify icon="tabler:discount" sx={{
                        width: '24px',
                        height: '24px',
                    }} />
                    <Typography variant="body2" sx={{ fontSize: smUp ? "14px" : '10px' }}>Spin for Discount</Typography>
                </Button>
            </Box>
        </Stack>


        <StyledDialog maxWidth="lg" open={isTradingPairSelectModalShow.value} onClose={() => isTradingPairSelectModalShow.onFalse()}>
            <Box sx={{
                width: '60vw',
                maxWidth: '800px',
                minWidth: '400px',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}>
                <Box sx={{
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.primary.main}`,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Typography variant="h6" sx={{
                        color: 'primary.main',
                    }}>Traing Pair</Typography>

                    <Box sx={{
                        width: '100%',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            gap: 1,
                        }}>
                            {
                                pairAmountDummyData.map((item) => <Button variant={item.value === topAmountCase.value ? "contained" : 'outlined'} color="primary" key={item} startIcon={<Iconify icon="mingcute:down-line" />}
                                    onClick={() => setTopAmountCase(item)}
                                    sx={{
                                        flexShrink: 0,
                                    }}
                                >TOP {item.label}</Button>)
                            }
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        flexWrap: 'wrap',
                    }}>
                        {
                            pairsDummyData.filter((item) => item.amount <= topAmountCase.value).map((item) => <Button variant={item.value === selectedPair ? "contained" : 'outlined'} color="primary" key={item} onClick={() => setSelectedPair(item.value)}>{item.label}</Button>)
                        }
                    </Box>
                </Box>

                <Box sx={{
                    height: "100px",
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
                    height: "200px",
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
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Box>



                <Box sx={{
                    width: '100%',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                }}>
                    <Box sx={{
                        display: 'flex',
                        gap: 1,

                    }}>
                        {
                            pairsDummyData.map((item) => <Button variant={item.value === selectedPair ? "contained" : 'outlined'} color="primary" key={`${item}-pair`}
                                onClick={() => setSelectedPair(item.value)}
                                sx={{
                                    flexShrink: 0,
                                }}
                            >{item.label}</Button>)
                        }
                    </Box>
                </Box>

                <Box sx={{
                    borderRadius: 1,
                    border: `1px solid ${theme.palette.primary.main}`,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <Typography variant="h6" sx={{
                        color: 'primary.main',
                    }}>Time Frame</Typography>


                    <Box sx={{
                        width: '100%',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            gap: 1,
                        }}>
                            {
                                timeframesDummyData.map((item) => <Button variant={item.value === timeframe ? "contained" : 'outlined'} color="primary" key={`${item}-timeframe`}
                                    onClick={() => setTimeframe(item.value)}
                                    sx={{
                                        flexShrink: 0,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 0.5,
                                    }}
                                >
                                    <Iconify icon={item.icon} />
                                    <Typography variant="caption">{item.label}</Typography>
                                    <Iconify icon="et:strategy" />
                                </Button>)
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </StyledDialog>
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

const pieChartData = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 200 },
    { name: 'Category D', value: 100 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const pairAmountDummyData = [
    {
        value: 100,
        label: '100',
    },
    {
        value: 200,
        label: '200',
    },
    {
        value: 300,
        label: '300',
    },
    {
        value: 400,
        label: '400',
    },
    {
        value: 500,
        label: '500',
    },
    {
        value: 1000,
        label: '1k',
    },
];

const pairsDummyData = [
    {
        value: "BTC/USDT",
        label: "BTC/USDT",
        amount: 100,
    },
    {
        value: "ETH/USDT",
        label: "ETH/USDT",
        amount: 200,
    },
    {
        value: "BNB/USDT",
        label: "BNB/USDT",
        amount: 300,
    },
    {
        value: "ADA/USDT",
        label: "ADA/USDT",
        amount: 400,
    },
    {
        value: "SOL/USDT",
        label: "SOL/USDT",
        amount: 500,
    },
    {
        value: "DOT/USDT",
        label: "DOT/USDT",
        amount: 1000,
    },
];

const timeframesDummyData = [
    {
        value: "5m",
        label: "5m",
        icon: "mingcute:time-line",
    },
    {
        value: "10m",
        label: "10m",
        icon: "mingcute:time-line",
    },
    {
        value: "15m",
        label: "15m",
        icon: "mingcute:time-line",
    },
    {
        value: "30m",
        label: "30m",
        icon: "mingcute:time-line",
    },
    {
        value: "1h",
        label: "1h",
        icon: "mingcute:time-line",
    },
    {
        value: "4h",
        label: "4h",
        icon: "mingcute:time-line",
    },
    {
        value: "1d",
        label: "1d",
        icon: "lets-icons:date-today",
    },
    {
        value: "1w",
        label: "1w",
        icon: "lets-icons:date-today",
    },
    {
        value: "1m",
        label: "1m",
        icon: "lets-icons:date-today",
    },
    {
        value: "1y",
        label: "1y",
        icon: "lets-icons:date-today",
    },
];

const strategyForgeDummyData = [
    {
        value: "ma",
        label: "MA",
        icon: 'hugeicons:trade-up',
    },
    {
        value: "rsi",
        label: "RSI",
        icon: 'mynaui:chart-line',
    },
    {
        value: "macd",
        label: "MACD",
        icon: 'mage:chart',
    },
    {
        value: "bb",
        label: "BB",
        icon: 'solar:pie-chart-bold',
    },
    {
        value: "fib",
        label: "FIB",
        icon: 'ph:lightning',
    },
];

const strategyDummyData = [
    {
        value: '1',
        logo: '/images/Goldie.png',
        name: 'Strate 1',
        description: 'Moving Average',
    },
    {
        value: '2',
        logo: '/images/Goldie.png',
        name: 'Strate 2',
        description: 'Moving Average',
    },
    {
        value: '3',
        logo: '/images/Goldie.png',
        name: 'Strate 3',
        description: 'Moving Average',
    },
];