// Desc: This file contains the content of the strategy dashboard.

import { Box, BoxProps } from '@mui/material';

import { useStrategy } from "src/store/strategy/useStrategy";

import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

import StrategyCard from './strategy-card';


interface StrategyCardWrapperProps extends BoxProps {

};

export default function StrategyCardWrapper({ sx, ...other }: StrategyCardWrapperProps) {
    const coin1 = useStrategy((state) => state.coin1);
    const setCoin1 = useStrategy((state) => state.setCoin1);
    const coin2 = useStrategy((state) => state.coin2);
    const setCoin2 = useStrategy((state) => state.setCoin2);

    const carousel = useCarousel({
        slidesToShow: 4,
    })

    return <Box sx={{
        width: '1280px',
        height: '480px',
        border: "1px solid white",
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
        ...sx,
    }} {...other}>
        <CarouselArrows
            filled
            icon="ic:round-navigate-next"
            onNext={carousel.onNext}
            onPrev={carousel.onPrev}
        >
            <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => <Box key={`key-${index}`} sx={{
                        px: 0.5
                    }}>
                        <StrategyCard />
                    </Box>)
                }
            </Carousel>
        </CarouselArrows>
    </Box>
}