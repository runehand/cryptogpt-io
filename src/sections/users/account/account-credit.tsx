import { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';

import AccountCreditAmount from './account-credit-amount';
import AccountCreditDeposit from './account-credit-deposit';

// ----------------------------------------------------------------------

export default function AccountCredit() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Grid container spacing={1} disableEqualOverflow>
      <Grid xs={12} md={12}>
        <AccountCreditAmount isLoading={isLoading} />
      </Grid>
      <Grid xs={12} md={12}>
        <AccountCreditDeposit isLoading={isLoading} setIsLoading={setIsLoading} />
      </Grid>
    </Grid>
  );
}
