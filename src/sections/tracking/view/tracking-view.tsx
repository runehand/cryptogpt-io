'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';

import { Box, Tab, Card, Tabs, Stack } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { NAV, HEADER, SPACING } from 'src/layouts/config-layout';

import Carousel, { useCarousel } from 'src/components/carousel';

import { TradingAIChat } from 'src/sections/trading/trading-ai-chat';

import TrackingHistory from '../tracking-history';
import TrackingSummary from '../tracking-summary';
import TrackingDetailDrawer from '../tracking-detail-drawer';
import TrackingOverviewCalendar from '../tracking-overview-calendar';


export default function TrackingView() {
    const [currentTab, setCurrentTab] = useState('overview');
    const smUp = useResponsive('up', 'sm');
    const [currentWidth, setCurrentWidth] = useState(0);
    const isTradeWindowFull = useBoolean(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const trackerDetailDrawer = useBoolean(false);
    const isAIChatWindowFull = useBoolean(false);

    useEffect(() => {
        const handleResize = () => {
            setCurrentWidth(window.innerWidth);
        };

        // Set initial width
        handleResize();

        // Correctly listen for resize events
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
        setCurrentTab(newValue);
    }, []);

    const handleChangleSelectedDate = (newDate: Date) => {
        console.log('newDate', newDate);
        setSelectedDate(newDate);

        if (
            (newDate.getFullYear() === new Date().getFullYear() &&
                newDate.getMonth() === new Date().getMonth() &&
                newDate.getDate() === new Date().getDate()) ||
            newDate.getTime() > new Date().getTime()
        ) {
            trackerDetailDrawer.onTrue();
        }
    }
    const chatAreaFullWidth = useMemo(() => {
        if (smUp) return currentWidth - NAV.W_SIDE_BAR_MENU - SPACING.md;
        return currentWidth - SPACING.sm;
    }, [currentWidth, smUp]);

    const carousel = useCarousel({});

    return (
        <Box sx={{
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            pb: 2,
            overflowX: 'hidden',
            overflowY: 'auto',
        }}>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{
                flexGrow: 0,
                flexShrink: 0,
            }}>
                <Card sx={{
                    p: smUp ? 2 : 1,
                    flex: 1,
                    borderRadius: 1,
                    boxShadow: 2,
                    height: '100%',
                }}>
                    <Stack direction="column" spacing={1} sx={{ height: '100%' }}>
                        <Tabs value={currentTab} onChange={handleChangeTab}>
                            <Tab value='overview' label="Overview" />
                            <Tab value='summary' label="Summary" />
                        </Tabs>
                        <Box sx={{
                            height: 0,
                            flex: 1,
                        }}>
                            {
                                currentTab === 'overview' && <TrackingOverviewCalendar selectedDate={selectedDate} handlechangeSelectedDate={handleChangleSelectedDate} />
                            }
                            {
                                currentTab === 'summary' && <TrackingSummary />
                            }
                        </Box>
                    </Stack>
                </Card>
            </Stack>

            <Box sx={{
                maxWidth: '100%',
                overflowX: 'auto',
                overflowY: 'hidden',
                minHeight: '320px',
                position: 'relative',
                transition: 'all 0.3s',
                display: isTradeWindowFull.value ? 'none' : 'block',
                opacity: isTradeWindowFull.value ? 0 : 1,
                visibility: isTradeWindowFull.value ? 'hidden' : 'visible',
            }}>
                {/* desktop */}
                {
                    smUp &&
                    <Stack direction="row" flexWrap="nowrap" spacing={2} sx={{
                        flex: 1,
                        position: 'absolute',
                        height: '100%',
                        left: 0,
                    }}>
                        <Card sx={{
                            height: '100%',
                            p: 2,
                        }}>
                            <TrackingHistory />
                        </Card>

                        <Card sx={{
                            height: '100%',
                            backdropFilter: 'none',
                            transition: 'aspect-ratio 0.5s',
                            aspectRatio: isAIChatWindowFull.value ? `${chatAreaFullWidth}/309` : '2/1',
                            p: 2,
                        }}>
                            <TradingAIChat isMinimized={isAIChatWindowFull.value} onBlockResize={() => isAIChatWindowFull.onToggle()} />
                        </Card>
                    </Stack>
                }

                {/* mobile, carousel */}
                {
                    !smUp &&
                    <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                        <Card sx={{
                            p: 1,
                            height: '100%',
                        }}>
                            <TrackingHistory />
                        </Card>

                        <Card sx={{
                            p: 1,
                            height: '100%',
                            transition: 'aspect-ratio 0.5s',
                            aspectRatio: isAIChatWindowFull.value ? `${chatAreaFullWidth}/309` : '2/1',
                            backdropFilter: 'none',
                        }}>
                            <TradingAIChat isMinimized={isAIChatWindowFull.value} onBlockResize={() => isAIChatWindowFull.onToggle()} />
                        </Card>
                    </Carousel>
                }
            </Box>

            <Box sx={{
                display: 'none',
                ...(
                    (isAIChatWindowFull.value && !smUp) ? {
                        display: 'block',
                        height: `calc(100vh - ${HEADER.H_MOBILE + SPACING.sm * 2}px)`,
                        position: 'fixed',
                        bottom: 0,
                        left: `${SPACING.sm}px`,
                        right: `${SPACING.sm}px`,
                        zIndex: 1000,
                    } : {}),
            }}>
                <Card sx={{
                    p: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: 1,
                }}>
                    <TradingAIChat isMinimized={isAIChatWindowFull.value} onBlockResize={() => isAIChatWindowFull.onToggle()} />
                </Card>
            </Box>

            <TrackingDetailDrawer
                isShow={trackerDetailDrawer.value}
                handleClose={() => trackerDetailDrawer.onFalse()}
                selectedDate={selectedDate}
                handleChangeSelectedDate={handleChangleSelectedDate}
            />
        </Box>
    );
}
