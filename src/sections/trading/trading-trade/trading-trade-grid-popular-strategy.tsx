
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Box, Stack, alpha, Button, useTheme, BoxProps, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

interface TradingTradeGridPopularStrategyProps extends BoxProps {

}

export default function TradingTradeGridPopularStrategy({ sx, ...other }: TradingTradeGridPopularStrategyProps) {
    const theme = useTheme();

    return (<Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderRadius: 1,
        border: `1px solid ${alpha(theme.palette.background.opposite, 0.2)}`,
        width: '100%',
        maxWidth: '320px',
        p: 2,
        transition: 'border-color 0.25s',
        cursor: 'pointer',
        "&:hover": {
            border: `1px solid ${theme.palette.primary.main}`,
        },
        ...sx,
    }} {...other}>
        <Stack direction="row" spacing={1} alignItems='center' justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.primary' }}>BTC/USDT</Typography>
            <Stack direction="row" spacing={1} alignItems='center'>
                <Iconify icon="mdi:users" sx={{ color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>1</Typography>
            </Stack>
        </Stack>

        <Stack direction="row" spacing={1} alignItems='center' justifyContent="space-between">
            <Box>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>ROI</Typography>
                <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>4.68%</Typography>
            </Box>

            <Box>
                <SparkLineChart
                    plotType="line"
                    data={[1, 4, 2, 5, 7, 2, 4, 6, -1, 3, 4, 0, 3, 2, 2, -1, 0, 2, 4, 9]}
                    width={124}
                    height={50}
                    colors={[theme.palette.primary.main]}
                />
            </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems='center' justifyContent="space-between">
            <Stack direction='column'>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>PNL (USD)</Typography>
                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>$7.03</Typography>
            </Stack>
            <Stack direction='column'>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>Runtime</Typography>
                <Typography variant="caption" sx={{
                    color: 'text.primary', fontWeight: 600,
                    whiteSpace: 'nowrap',
                }}>6d 21h 11m</Typography>
            </Stack>
            <Stack direction='column'>
                <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'right' }}>Min. Invetment</Typography>
                <Typography variant="caption" sx={{
                    color: 'text.primary', fontWeight: 600, textAlign: 'right',
                    whiteSpace: 'nowrap',
                }}>98.55 USDT</Typography>
            </Stack>
        </Stack>

        <Stack direction="row" spacing={1} alignItems='center' justifyContent="space-between">
            <Stack direction='column'>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>24H/Total Matched Trades</Typography>
                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 600 }}>1/5</Typography>
            </Stack>
            <Button variant="contained" color="primary" size="small">Copy</Button>
        </Stack>
    </Box>
    );
}