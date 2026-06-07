import { Box, BoxProps } from '@mui/material';

import { MAIN_CHART_PANEL } from 'src/layouts/config-layout';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

interface TradingLineChartProps extends BoxProps {
    data?: number[]
}

export default function TradingLineChart({ data = dummyData, sx, ...other }: TradingLineChartProps) {
    const chartOptions = useChart({
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
        tooltip: {
            x: {
                show: false,
            },
            marker: { show: false },
        },
    });

    return (
        <Box sx={{
            ...sx,
        }} {...other}>
            <Chart dir="ltr" type="area" series={[{
                name: 'Price',
                data,
            }]} options={chartOptions} width="100%" height={MAIN_CHART_PANEL.W_DESKTOP - 88} />
        </Box>
    );
}

const dummyData = [10, 15, 8, 15, 7, 12, 8, 15, 10];