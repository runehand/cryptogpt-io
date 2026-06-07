import {
  Line,
  XAxis,
  YAxis,
  LineChart,
  ResponsiveContainer,
} from 'recharts';

import { Box, Rating, BoxProps, useTheme, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import Image from 'src/components/image/image';

interface DataPoint {
  date: string;
  price: number;
  change: number;
  action?: 'Buy' | 'Sell';
}

interface StrategyListCardProps extends BoxProps { }

export default function StrategyListCard({
  sx,
  ...other
}: StrategyListCardProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        ...sx,
      }}
      {...other}
    >
      <Image
        src="/images/goldie.png"
        sx={{
          width: '32px',
          height: '32px',
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="subtitle2">option.name</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          option.description
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          height: '48px',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <XAxis dataKey="time" hide />
            <YAxis dataKey="price" hide />
            <Line type="monotone" dataKey="price" stroke={theme.palette.primary.main} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Typography sx={{ color: 'success.main', textAlign: 'right' }}>+7%</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '120px',
          gap: 1,
        }}
      >
        <Iconify
          icon="mingcute:time-line"
          sx={{
            color: 'success.main',
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: 'text.primary',
            whiteSpace: 'nowrap',
          }}
        >
          Active: 29.1h
        </Typography>
      </Box>
      <Rating name="half-rating" size="small" defaultValue={2.5} precision={0.5} />
    </Box>
  );
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
