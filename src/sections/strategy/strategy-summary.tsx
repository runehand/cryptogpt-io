

import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import { Box, alpha, BoxProps, IconButton } from '@mui/material';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Iconify from 'src/components/iconify/iconify';

import StrategyAccordion from './strategy-accordion';


interface StrategySummaryProps extends BoxProps {
}

export default function StrategySummary(
    {
        sx,
        ...other
    }: StrategySummaryProps
) {
    const smUp = useResponsive("up", 'sm');
    const isShowSummary = useStrategy((state) => state.isShowSummary);
    const setIsShowSummary = useStrategy((state) => state.setIsShowSummary);

    return <Box
        sx={{
            width: isShowSummary ? '33%' : 0,
            height: '100%',
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.05),
            transition: 'all 0.3s',
            overflowX: 'hidden',
            overflowY: 'auto',
            ...(isShowSummary && {
                flex: 1,
            }),
            ...(
                (!isShowSummary && !smUp) && {
                    display: 'none',
                }
            ),
        }}
    >
        <Box sx={{
            p: 1,
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
            }}>
                <IconButton size="small" sx={{
                    backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                }}>
                    <Iconify icon="material-symbols:close" sx={{
                        color: 'primary.main',
                    }} onClick={() => setIsShowSummary(false)} />
                </IconButton>
            </Box>
            <Timeline
                sx={{
                    [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                    },
                }}
            >
                {
                    [1, 2, 3].map((item, index) => (
                        <TimelineItem key={index}>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{
                                width: "100%",
                            }}>
                                <Box>
                                    <StrategyAccordion />
                                </Box>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }
            </Timeline>
        </Box>
    </Box>
}