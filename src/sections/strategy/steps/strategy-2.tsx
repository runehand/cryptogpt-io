// Desc: This file contains the content of the strategy dashboard.




import { useState } from 'react';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { Box, alpha, Stack, Select, styled, BoxProps, MenuItem, TextField, IconButton, Typography, InputLabel, FormControl } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from "src/store/strategy/useStrategy";

import Iconify from 'src/components/iconify';



const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  border: none;
  outline: none;
  resize: none;
  color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
  background: transparent;
`,
);

interface StrategyStep1Props extends BoxProps {

};

export default function StrategyStep2({ sx, ...other }: StrategyStep1Props) {
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);
    const [value, setValue] = useState("Please input the message here");
    const isFocus = useBoolean();
    const smUp = useResponsive("up", 'sm');

    return <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    }}>
        <Typography variant="h4" color="primary" sx={{ textAlign: "center", my: 2 }}>Input the details for your strategy</Typography>
        <Stack direction='row' alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{
                whitespace: 'nowrap',
            }}>3. Strategy detail for {coin1.name}/{coin2.name}</Typography>
        </Stack>

        <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: 2,
            overflowY: 'auto',
            overflowX: 'hidden',
        }}>
            <TextField label="Name" />
            <Box sx={{
                width: '100%',
                borderRadius: 1,
                border: (theme: any) => `1px solid rgba(145, 158, 171, 0.2)`,
                transition: 'all 0.3s',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1,
                p: 1.5,
                ...(isFocus.value ? {
                    border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
                } : {}),
            }}>
                <Textarea
                    value={value}
                    placeholder="Desecription"
                    onInput={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)} sx={{
                        width: '100%'
                    }} />
            </Box>
            <Stack direction={smUp ? "row" : "column"} alignItems="center" justifyContent="space-around" spacing={2} sx={{ width: '100%' }}>
                <TextField fullWidth label="Investment" />
                <TextField fullWidth label="Stop loss" />
                <TextField fullWidth label="Take profit" />
            </Stack>

            <FormControl sx={{
                width: '100%',
                '.MuiInputBase-root': {
                    border: 'none',
                },
                mb: 2,
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
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
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
                            border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                        }}>
                            <MenuItem value="plus">plus</MenuItem>
                            <MenuItem value="minus">minus</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField size="small" sx={{ flex: 1 }} />
                    <IconButton sx={{
                        border: (theme: any) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
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
            <Stack direction="row" alignItems='center' spacing={2} sx={{ width: '100%' }}>
                <FormControl sx={{
                    '.MuiInputBase-root': {
                        border: 'none',
                        width: '100px',
                    },
                }}>
                    <InputLabel htmlFor="indicator-label">indicators</InputLabel>
                    <Select labelId="indicator-label" id="indicator" label="Time frame" size="small" value="SMA" sx={{
                        border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
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
                        border: (theme: any) => `1px solid ${theme.palette.primary.main}`
                    }}>
                        <MenuItem value="plus">plus</MenuItem>
                        <MenuItem value="minus">minus</MenuItem>
                    </Select>
                </FormControl>
                <TextField size="small" sx={{ flex: 1 }} />
                <IconButton sx={{
                    border: (theme: any) => `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}>
                    <Iconify icon="mingcute:add-fill" sx={{
                        color: 'primary.main',
                        width: '24px',
                        hegiht: '24px',
                    }} />
                </IconButton>
            </Stack>
        </Box>
    </Box>
}