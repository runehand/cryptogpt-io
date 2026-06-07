import { useState } from 'react';

import { Box, alpha, BoxProps } from '@mui/material';

interface TradingTradeMethodProps extends BoxProps {
    tradeType: 'BUY' | 'SELL';
    onChangeTradeType: (type: 'BUY' | 'SELL') => void;
}

export default function TradingTradeMethod({
    tradeType = 'BUY',
    onChangeTradeType,
    sx,
    ...other
}: TradingTradeMethodProps) {
    const [currentTradeType, setCurrentTradeType] = useState(tradeType);

    const handleChangeTradeType = (type: 'BUY' | 'SELL') => {
        setCurrentTradeType(type);

        if (onChangeTradeType) {
            onChangeTradeType(type);
        }
    }

    return <Box sx={{
        display: 'flex',
        width: '100%',
        borderRadius: 1,
        mt: 1,
        mb: 2,
        ...sx,
    }} {...other}>
        <Box sx={{
            flex: 1,
            textAlign: 'center',
            fontSize: '12px',
            borderRadius: '4px 0px 0px 4px',
            p: 0.5,
            position: 'relative',
            ...(
                currentTradeType === 'BUY' ? {
                    backgroundColor: theme => theme.palette.primary.main,
                    color: 'text.primary',
                } : {
                    borderColor: theme => alpha(theme.palette.primary.main, 1),
                    color: 'primary.main',
                    borderWidth: '1px 0px 1px 1px',
                }
            ),
        }} onClick={() => handleChangeTradeType("BUY")}>Buy
            <Box sx={{
                width: '20px',
                height: '20px',
                backgroundColor: theme => theme.palette.primary.main,
                borderTopRightRadius: '4px',
                transform: 'rotate(45deg)',
                transformOrigin: 'center',
                position: 'absolute',
                right: '-11px',
                top: '4px',
                display: currentTradeType === 'BUY' ? 'block' : 'none',
            }} />
        </Box>

        <Box sx={{
            textAlign: 'center',
            fontSize: '12px',
            flex: 1,
            p: 0.5,
            borderRadius: '0px 4px 4px 0px',
            position: 'relative',
            ...(
                currentTradeType === 'SELL' ? {
                    color: 'text.primary',
                    backgroundColor: theme => theme.palette.primary.main,
                } : {
                    borderColor: theme => alpha(theme.palette.primary.main, 1),
                    color: 'primary.main',
                    borderWidth: '1px 1px 1px 0px',
                }
            ),
        }} onClick={() => handleChangeTradeType("SELL")}>Sell
            <Box sx={{
                width: '20px',
                height: '20px',
                backgroundColor: theme => theme.palette.primary.main,
                borderRadius: '0px 0px 0px 4px',
                transform: 'rotate(45deg)',
                transformOrigin: 'center',
                position: 'absolute',
                left: '-11px',
                top: '4px',
                display: currentTradeType === 'SELL' ? 'block' : 'none',
            }} />
        </Box>
    </Box>
}