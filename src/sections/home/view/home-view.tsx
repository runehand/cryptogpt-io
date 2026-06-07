'use client';

import crypto from 'crypto';
import { useState, useEffect, useCallback } from 'react';

import { Box } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { BINANCE_OAUTH_CREDENTIALS } from 'src/config-global';


export default function HomeView() {
    const smUp = useResponsive("up", "sm")


    const [userData, setUserData] = useState(null);
    const [ws, setWs] = useState<any>(null);

    const generateSignature = (queryString) => crypto
        .createHmac('sha256', BINANCE_OAUTH_CREDENTIALS.clientSecret)
        .update(queryString)
        .digest('hex');


    const connectAuthWebSocket = useCallback(() => {
        const websocket = new WebSocket(`wss://ws-api.binance.com:443/ws-api/v3`);
        // const websocket = new WebSocket(`wss://testnet.binance.vision/ws-api/v3`);

        websocket.onopen = () => {
            console.log('Authenticated WebSocket Connected');
            // Send authentication message
            const timestamp = Date.now();
            const queryString = `timestamp=${timestamp}`;
            const signature = generateSignature(queryString);

            websocket.send(JSON.stringify({
                "id": "b137468a-fb20-4c06-bd6b-625148eec958",
                "method": "uiKlines",
                "params": {
                    "symbol": "BNBBTC",
                    "interval": "1h",
                    "startTime": 1655969280000,
                    "limit": 1
                }
            }));
            console.log('send request after')
        };

        websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if (data.e === 'outboundAccountPosition') {
                setUserData(data);
            }
        };

        websocket.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        websocket.onclose = () => {
            console.log('WebSocket Disconnected');
            // Implement reconnection logic here
        };

        setWs(websocket);

        return () => {
            if (websocket) {
                websocket.close();
            }
        };
    }, []);

    useEffect(() => {
        connectAuthWebSocket();
        return () => {
            if (ws) {
                ws.close();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connectAuthWebSocket]);


    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: smUp ? "row" : "column",
            justifyContent: 'start',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            Home Page
        </Box>
    );
}
