import Image from 'next/image';
import React, { useMemo, useState, useCallback } from 'react';
import { Line, XAxis, YAxis, Tooltip, LineChart, ResponsiveContainer } from 'recharts';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Tab,
  Card,
  Tabs,
  Table,
  alpha,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  Pagination,
  CircularProgress,
} from '@mui/material';

import axios, { endpoints } from 'src/utils/axios';

import { useTokenBalances } from './useTokenBalances';

interface TokenBalance {
  token: string;
  balance: string;
  logo: string;
  price: number;
  priceHistory: { time: number; price: number }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ bgcolor: 'background.paper', p: 1, border: 1, borderColor: 'divider' }}>
        <Typography variant="body2">{`Price: $${payload[0].value.toFixed(4)}`}</Typography>
        <Typography variant="body2">{`Time: ${new Date(label).toLocaleTimeString()}`}</Typography>
      </Box>
    );
  }
  return null;
};

const OverviewCredit: React.FC = () => {
  const { eth, usdt, usdc, crgpt, dot, sol, avax } = useTokenBalances();
  const [prices, setPrices] = useState<{ [key: string]: number }>({});
  const [priceHistory, setPriceHistory] = useState<{
    [key: string]: { time: number; price: number }[];
  }>({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const rowsPerPage = 5;

  const balances: TokenBalance[] = useMemo(
    () => [
      {
        token: 'CRGPT',
        balance: crgpt,
        logo: '/logo/crgpt-icon.png',
        price: prices.CRGPT || 0,
        priceHistory: priceHistory.CRGPT || [],
      },
      {
        token: 'ETH',
        balance: eth,
        logo: '/images/ethereum-eth-logo.png',
        price: prices.ETH || 0,
        priceHistory: priceHistory.ETH || [],
      },
      {
        token: 'USDT',
        balance: usdt,
        logo: '/images/tether-usdt-logo.png',
        price: prices.USDT || 1,
        priceHistory: priceHistory.USDT || [],
      },
      {
        token: 'USDC',
        balance: usdc,
        logo: '/images/usd-coin-usdc-logo.png',
        price: prices.USDC || 1,
        priceHistory: priceHistory.USDC || [],
      },
      {
        token: 'DOT',
        balance: dot,
        logo: '/images/dot-logo.png',
        price: prices.DOT || 0,
        priceHistory: priceHistory.DOT || [],
      },
      {
        token: 'SOL',
        balance: sol,
        logo: '/images/sol-logo.png',
        price: prices.SOL || 0,
        priceHistory: priceHistory.SOL || [],
      },
      {
        token: 'AVAX',
        balance: avax,
        logo: '/images/avax-logo.png',
        price: prices.AVAX || 0,
        priceHistory: priceHistory.AVAX || [],
      },
    ],
    [eth, usdt, usdc, crgpt, dot, sol, avax, prices, priceHistory]
  );

  const totalUSDT = useMemo(
    () => balances.reduce((acc, balance) => acc + parseFloat(balance.balance) * balance.price, 0),
    [balances]
  );

  const fetchPrices = useCallback(async () => {
    try {
      const binanceSymbols = ['ETHUSDT', 'DOTUSDT', 'SOLUSDT', 'AVAXUSDT', 'USDCUSDT'];
      const binanceResponses = await Promise.all(
        binanceSymbols.map((symbol) =>
          fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`).then((res) =>
            res.json()
          )
        )
      );

      const newPrices = binanceResponses.reduce((acc, response) => {
        const token = response.symbol.replace('USDT', '');
        acc[token] = parseFloat(response.price);
        return acc;
      }, {});

      newPrices.USDT = 1;

      try {
        const response = await axios.get(`${endpoints.dashboard.price_charts}`);
        const { data: allPrices } = response;
        newPrices.CRGPT = allPrices.CRGPT;
      } catch (mecxError) {
        console.error('Error fetching CRGPT price from MECX:', mecxError);
        newPrices.CRGPT = prices.CRGPT || 0.071;
      }

      setPrices(newPrices);
      setPriceHistory((prevHistory) => {
        const newHistory = { ...prevHistory };
        Object.keys(newPrices).forEach((token) => {
          const price = newPrices[token];
          newHistory[token] = [
            ...(prevHistory[token] || []).slice(-59),
            { time: Date.now(), price },
          ];
        });
        return newHistory;
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching prices:', error);
      setIsLoading(false);
    }
  }, [prices]);

  fetchPrices();
  // useEffect(() => {
  //   // const interval = setInterval(fetchPrices, 20000000) //  realtime 20000;;
  //   // return () => clearInterval(interval);
  // }, [fetchPrices]);

  const getChartDomain = (token: string) => {
    if (token === 'USDT' || token === 'USDC') {
      return [0.9999, 1.0001];
    }
    return ['auto', 'auto'];
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleToggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  const calculatePercentageChange = (history: { time: number; price: number }[]) => {
    if (history.length < 2) return 0;
    const firstPrice = history[0].price;
    const lastPrice = history[history.length - 1].price;
    return ((lastPrice - firstPrice) / firstPrice) * 100;
  };

  const paginatedBalances = balances.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card
      sx={{
        color: 'text.primary',
        p: 2,
        borderRadius: 2,
        width: '100%',
        overflow: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2">
          Token Balances
        </Typography>
        <Button
          variant="contained"
          startIcon={isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
          color="primary"
          sx={{ bgcolor: (theme) => theme.palette.primary.main, color: 'text.primary' }}
          onClick={handleToggleVisibility}
        >
          {isHidden ? 'Show Data' : 'Hide Data'}
        </Button>
      </Box>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{
          mb: 2,
          '& .MuiTab-root': {
            color: 'text.secondary',
            '&.Mui-selected': {
              color: (theme) => theme.palette.primary.main,
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: (theme) => theme.palette.primary.main,
            height: 2,
          },
        }}
      >
        <Tab label="MetaMask" sx={{ color: (theme) => theme.palette.primary.main }} />
        <Tab label="MECX" sx={{ color: (theme) => theme.palette.primary.main }} />
        <Tab label="Binance" sx={{ color: (theme) => theme.palette.primary.main }} />
        <Tab label="OKX" sx={{ color: (theme) => theme.palette.primary.main }} />
      </Tabs>

      <Box sx={{ overflowY: 'auto' }}>
        <Table
          sx={{
            '& tr': { px: 1 },
            '& td,th': { py: 0.5, px: 2 },
            '& tbody tr': {
              py: 0.5,
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: (theme) => alpha(theme.palette.background.default, 0.1),
              },
            },
          }}
          aria-label="token balances table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'text.secondary' }}>Token</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Balance</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Balance in USDT</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Change (Last 1 hour)</TableCell>
              <TableCell sx={{ color: 'text.secondary' }}>Price History (Last 1 hour)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBalances.map((balance) => (
              <TableRow key={balance.token}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={balance.logo}
                      alt={`${balance.token} logo`}
                      width={24}
                      height={24}
                      style={{ marginRight: '8px' }}
                    />
                    {balance.token}
                  </Box>
                </TableCell>
                <TableCell>{isHidden ? '****' : parseFloat(balance.balance).toFixed(4)}</TableCell>
                <TableCell>
                  {isHidden ? '****' : (parseFloat(balance.balance) * balance.price).toFixed(4)}
                </TableCell>
                <TableCell>
                  {isHidden
                    ? '****'
                    : `${calculatePercentageChange(balance.priceHistory).toFixed(2)}%`}
                </TableCell>
                <TableCell>
                  <ResponsiveContainer width="100%" height={40}>
                    <LineChart
                      data={balance.priceHistory}
                      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                    >
                      <XAxis dataKey="time" hide />
                      <YAxis domain={getChartDomain(balance.token)} hide />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography sx={{ color: 'text.primary', fontWeight: 'bold' }}>
          Total: {totalUSDT.toFixed(2)} USDT
        </Typography>
        <Pagination
          count={Math.ceil(balances.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Card>
  );
};

export default OverviewCredit;
