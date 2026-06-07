import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

import { fDate } from 'src/utils/format-time';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  index: number;
  setIsModalOpened: (value: boolean) => void;
  setCurrentID: (value: string) => void;
};

export default function InvoiceTableRow({
  row,
  index,
  setIsModalOpened,
  setCurrentID
}: Props) {
  const { address, amount, created_at, status, id, explorer_url } = row;

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2" noWrap sx={{ textAlign: 'center' }}>
              {index+1}
            </Typography>
          }
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={`${amount} CRGPT`}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={address}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
        />
      </TableCell>

      <TableCell>{fDate(created_at)}</TableCell>

      <TableCell sx={{ width: '160px', textAlign: 'center' }}>
        <Label
          variant="soft"
          color={
            (status === 'paid' && 'success') ||
            (status === "admin_waiting" && 'warning') ||
            (status === 'address_waiting' && 'error') ||
            'default'
          }
        >
          {(() => {
            switch (status) {
              case "admin_waiting":
                return "pending delivery";
              case "address_waiting":
                return "Awaiting address";
              case "paid":
                return "PAID & DELIVERED";
              default:
                return status;
            }
          })()}
        </Label>
      </TableCell>
      <TableCell sx={{ width: '100px', textAlign: 'center' }}>
        {status === 'address_waiting' && (
          <Button variant="contained" color="primary" size="small" sx={{ ml: 1 }} onClick={() => { setIsModalOpened(true); setCurrentID(id) }}>
            Edit
          </Button>
        )}
        {status === 'paid' && (
          <Button variant="contained" color="primary" size="small" sx={{ ml: 1 }} onClick={() => window.open(explorer_url, '_blank')}>
            View
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
