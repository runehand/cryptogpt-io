// Desc: This file contains the content of the strategy dashboard.

import { Box, BoxProps } from '@mui/material';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Iconify from 'src/components/iconify/iconify';
import MobileMenu from 'src/components/mobile-tab/mobile-tab';

import StrategyStep1Beta from './steps/strategy-1-beta';
import StrategyStep2Beta from './steps/strategy-2-beta';
import StrategyStep3Beta from './steps/strategy-3-beta';
import StrategyStep4Beta from './steps/strategy-4-beta';


interface MenuButton {
    icon: React.ReactNode;
    id: string;
}

const menuButtons: MenuButton[] = [
    { icon: <Iconify icon="pepicons-pop:coins" />, id: '1.2.choose-pair' },
    { icon: <Iconify icon="hugeicons:bitcoin-invoice" />, id: '3.detail' },
    { icon: <Iconify icon="carbon:chart-multitype" />, id: '4.backtesting' },
    { icon: <Iconify icon="vaadin:chart-3d" />, id: '5.review' },
];

interface StrategyContentBetaProps extends BoxProps {

}

export default function StrategyContentBeta({ sx, ...other }: StrategyContentBetaProps) {
    const step = useStrategy(state => state.step);
    const setStep = useStrategy(state => state.setStep);

    return <Box sx={{
        width: '1280px',
        height: '680px',
        border: "1px solid white",
        backdropFilter: "blur(10px)",
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
        ...sx,
    }} {...other}>
        {
            step === "1.2.choose-pair" &&
            <StrategyStep1Beta />
        }
        {
            step === "3.detail" &&
            <StrategyStep2Beta />
        }
        {
            step === "4.backtesting" &&
            <StrategyStep3Beta />
        }
        {
            step === "5.review" &&
            <StrategyStep4Beta />
        }


        <Box sx={{
            mt: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
            <MobileMenu data={menuButtons} value={step} handleChange={setStep} />
        </Box>
    </Box>
}