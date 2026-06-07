import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const AccountCreditAmount = ({ isLoading }: { isLoading: boolean }) => {
  const [currentAmount, setCurrentAmount] = useState(0);

  useEffect(() => {
    axios.post(endpoints.credits.credits)
      .then((response: any) => {
        const { statusText, data } = response.data;
        console.log("finally", statusText, data);
        if (statusText === "OK") {
          if (data?.length) {
            setCurrentAmount(data[0]?.amount);
          } else {
            setCurrentAmount(0);
          }
        } else {
          console.error(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching credits:", error);
      });
  }, [isLoading]);

  return (
    <Card sx={{
      backdropFilter: 'none',
    }}>
      <CardHeader title={`My Credit: ${currentAmount}`} sx={{ marginBottom: "20px" }} />
    </Card >
  )
}

export default AccountCreditAmount;