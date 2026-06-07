
import { useState } from 'react';

import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import { Box, Stack, Switch, MenuItem, useTheme, BoxProps, Typography, InputLabel, IconButton, FormControl, FormControlLabel } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Iconify from 'src/components/iconify';

interface TradingNewsContentProps extends BoxProps {
    onMoveRight?: () => void;
}

export default function TradingNewsContent({ sx, onMoveRight, ...other }: TradingNewsContentProps) {
    const theme = useTheme();
    const [filterOption, setFilterOption] = useState('all');
    const smUp = useResponsive("up", "sm");

    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilterOption(event.target.value as string);
    };

    const handleMoveRight = () => {
        if (onMoveRight) {
            onMoveRight();
        }
    }

    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflowX: 'hidden',
        overflowY: 'auto',
    }}>
        <Stack direction='row' spacing={smUp ? 2 : 1} justifyContent="space-between" alignItems="center" sx={{
            // position: "sticky",
            // top: 0,
            pt: 1,
            zIndex: 2,
        }}>
            <Typography variant={smUp ? "h4" : "h6"} sx={{ flex: 1 }}>June 17 Tue</Typography>
            <FormControlLabel control={<Switch />} label={smUp ? "Only display important news" : "News"} />
            <FormControl>
                <InputLabel id="news-filter-option-label">Filter</InputLabel>
                <Select
                    labelId="news-filter-option-label"
                    id="news-filter-option"
                    value={filterOption}
                    size="small"
                    label="Filter"
                    onChange={handleFilterChange}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="binance">Binance News</MenuItem>
                    <MenuItem value="market">Market News</MenuItem>
                    <MenuItem value="bitcoin">Bitcoin News</MenuItem>
                    <MenuItem value="bnb">BNB News</MenuItem>
                </Select>
            </FormControl>
            <IconButton onClick={() => handleMoveRight()}>
                <Iconify icon="icon-park-solid:topic" />
            </IconButton>
        </Stack>

        <Stack direction="column" spacing={2} sx={{
            height: 0,
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
        }}>
            <Timeline
                sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                }}
            >
                {
                    [...dummyData, ...dummyData, ...dummyData, ...dummyData, ...dummyData, ...dummyData, ...dummyData].map((item, index) => (
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{
                                width: "100%",
                            }}>
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="body2" sx={{
                                        color: "text.secondary",
                                    }} >{item.date}</Typography>
                                    <Typography variant={smUp ? "h6" : 'subtitle1'} sx={{
                                        zIndex: 1,
                                    }}>{item.title}</Typography>
                                    <Box sx={{
                                        color: "text.secondary",
                                        fontSize: '14px',
                                        overflow: "hidden",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 3,
                                    }}>{item.content}</Box>
                                </Stack>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }
            </Timeline>
        </Stack>
    </Box>
}


const dummyData = [
    {
        date: "2021-06-17 00:00:00",
        title: "BakerySwap Indicates High Growth Potential For BAKE",
        content: "According to BlockBeats, BakerySwap, a decentralized finance (DeFi) protocol, has indicated that BAKE, its native token, possesses high growth potential. The announcement was made on June 17th. The protocol's officials have pointed out several factors that contribute to this potential. Firstly, BAKE has a low market capitalization, which suggests room for significant growth. Secondly, the user base of BAKE is expanding rapidly, indicating a growing demand for the token. Thirdly, the innovative features of BAKE are attracting more users and investors, further driving its growth. Lastly, compared to CAKE, another popular DeFi token, BAKE has a lower market value, suggesting it has more room to grow. These factors collectively suggest that BAKE has a high potential for growth in the future. However, it's important to note that the cryptocurrency market is highly volatile and unpredictable, and investors should always do their own research before making any investment decisions.",
        upvote: 100,
        comments: []
    },
    {
        date: "2021-06-17 00:00:00",
        title: "BakerySwap Indicates High Growth Potential For BAKE",
        content: "According to BlockBeats, BakerySwap, a decentralized finance (DeFi) protocol, has indicated that BAKE, its native token, possesses high growth potential. The announcement was made on June 17th. The protocol's officials have pointed out several factors that contribute to this potential. Firstly, BAKE has a low market capitalization, which suggests room for significant growth. Secondly, the user base of BAKE is expanding rapidly, indicating a growing demand for the token. Thirdly, the innovative features of BAKE are attracting more users and investors, further driving its growth. Lastly, compared to CAKE, another popular DeFi token, BAKE has a lower market value, suggesting it has more room to grow. These factors collectively suggest that BAKE has a high potential for growth in the future. However, it's important to note that the cryptocurrency market is highly volatile and unpredictable, and investors should always do their own research before making any investment decisions.",
        upvote: 100,
        comments: []
    },
]