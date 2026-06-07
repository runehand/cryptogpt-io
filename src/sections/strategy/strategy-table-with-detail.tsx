import { useState } from 'react';

import { Box, Stack, Table, TableRow, Collapse, TableHead, TableCell, TableBody, Typography, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

function Row() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>2023-01</TableCell>
                <TableCell>$16500</TableCell>
                <TableCell>Buy</TableCell>
                <TableCell>$16500</TableCell>
                <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography>0%</Typography>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <Iconify icon="mingcute:up-fill" /> : <Iconify icon="mingcute:down-fill" />}
                        </IconButton>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Typography>row.details</Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function StrategyTableWithDetail() {
    return <Table sx={{
        width: '100%',
    }}>
        <TableHead>
            <TableRow>
                <TableCell>Period</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Order</TableCell>
                <TableCell>Order Price</TableCell>
                <TableCell>Pro</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <Row />
            <Row />
            <Row />
        </TableBody>
    </Table>
}