import { Box, alpha, BoxProps } from '@mui/material';

interface TradingTrackerStrategyStatusProps extends BoxProps {
    value?: number;
}

export default function TradingTrackerStrategyStatus({
    value = 30,
    sx,
    ...other
}: TradingTrackerStrategyStatusProps) {
    return <Box sx={{
        display: 'flex',
        height: '16px',
        gap: 0.25,
        ...sx,
    }} {...other}>
        {
            Array.from({ length: 10 }).map((_, index) => <Box key={`status-item-${index}`} sx={{
                width: '100%',
                height: '100%',
                backgroundColor: theme => value < index * 10 ? alpha(theme.palette.background.opposite, 0.2) : 'primary.main',
            }} />)
        }
    </Box>
}