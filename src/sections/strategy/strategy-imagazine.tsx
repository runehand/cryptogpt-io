import { Box, BoxProps } from "@mui/material";

interface StrategyImaganizeProps extends BoxProps {

}

export default function StrategyImaganize({
    sx,
    ...other
}: StrategyImaganizeProps) {
    return <Box sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        border: (theme: any) => `1px solid ${theme.palette.primary.main}`,
        borderRadius: 1,
        backgroundColor: 'white',
        p: 1,
        ...sx,
    }} {...other}>
        Q & A
    </Box>
}