

import { Box, Stack, BoxProps, useTheme } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { MAIN_CHART_PANEL } from 'src/layouts/config-layout';

import Carousel, { useCarousel } from 'src/components/carousel';

import TradingNewsTopic from './trading-news-topic';
import TradingNewsContent from './trading-news-content';


// ----------------------------------------------------------------------

interface TradingNewsProps extends BoxProps {
}

export default function TradingNews({ sx, ...other }: TradingNewsProps) {
    const theme = useTheme();
    const smUp = useResponsive("up", "sm");

    const carousel = useCarousel({})
    return (
        <Box sx={{
            height: `${MAIN_CHART_PANEL.W_DESKTOP}px`,
            // overflowX: 'hidden',
            // overflowY: 'auto',
            ...sx,
        }} {...other}>
            {
                smUp &&
                <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ height: '100%' }}>
                    <TradingNewsContent />
                    <TradingNewsTopic />
                </Stack>
            }
            {
                !smUp &&
                <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                    <TradingNewsContent onMoveRight={carousel.onNext} />
                    <TradingNewsTopic onMoveLeft={carousel.onPrev} />
                </Carousel>
            }
        </Box >
    );
}