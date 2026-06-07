import React, { useState, useEffect, useCallback } from 'react';

import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';

import usePayStripeCardPayment from 'src/hooks/use-pay-stripe-card-payment';
import usePayStripeApplePayment from 'src/hooks/use-pay-stripe-apple-payment';

import axios, { endpoints } from 'src/utils/axios';

import Stripe, { useStripe } from 'src/provider/Stripe';

import Label from 'src/components/label';
import CardElement from 'src/components/stripe-card';
import { useSnackbar } from 'src/components/snackbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import InvoiceTableRow from './invoice-table-row';

const TABLE_HEAD = [
  { id: 'no', label: 'No', align: 'center' },
  { id: 'amount', label: 'Amount' },
  { id: 'address', label: 'Address' },
  { id: 'date', label: 'Date' },
  { id: 'status', label: 'Status' },
];

const ApplePayButton = styled(Button)(() => ({
  display: 'flex',
  width: "120px",
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#000',
  color: 'white',
  '&:disabled ': {
    backgroundColor: 'gray',
  },
  height: "50px",
  borderRadius: '8px',
}));

const ApplePayIcon: React.FC = () => (
  <SvgIcon viewBox="0 0 55 23" sx={{ width: 55, height: 23 }}>
    <path d="M10.7479 4.82745C9.41143 4.82745 8.33331 5.63605 7.63702 5.63605C6.90704 5.63605 5.92999 4.87238 4.77325 4.87238C2.57207 4.87238 0.337212 6.70294 0.337212 10.1282C0.337212 12.2733 1.16827 14.5306 2.19024 16.0018C3.05499 17.2259 3.82989 18.2366 4.93047 18.2366C6.01983 18.2366 6.50274 17.5179 7.86163 17.5179C9.23174 17.5179 9.5462 18.2142 10.7479 18.2142C11.9495 18.2142 12.7469 17.1248 13.4993 16.0467C14.3304 14.8001 14.6898 13.5872 14.701 13.5311C14.6336 13.5086 12.3426 12.5765 12.3426 9.94855C12.3426 7.67999 14.1395 6.66925 14.2405 6.59064C13.0613 4.87238 11.2532 4.82745 10.7479 4.82745ZM10.1302 3.37872C10.6692 2.71613 11.0511 1.81769 11.0511 0.90802C11.0511 0.784485 11.0398 0.66095 11.0174 0.559875C10.1414 0.593567 9.06329 1.14386 8.42315 1.8963C7.92901 2.46906 7.45733 3.37872 7.45733 4.28839C7.45733 4.42316 7.47979 4.56915 7.49102 4.61407C7.54717 4.62531 7.63702 4.63654 7.72686 4.63654C8.52422 4.63654 9.53497 4.09747 10.1302 3.37872ZM19.1155 1.82892V18.0345H22.013V12.7225H25.5281C28.8074 12.7225 31.0984 10.5213 31.0984 7.30939C31.0984 4.04132 28.886 1.82892 25.6516 1.82892H19.1155ZM22.013 4.2547H24.888C26.9768 4.2547 28.156 5.32159 28.156 7.30939C28.156 9.24103 26.9431 10.3192 24.8767 10.3192H22.013V4.2547ZM36.5349 16.0467C35.2995 16.0467 34.4123 15.429 34.4123 14.3958C34.4123 13.3963 35.1423 12.8348 36.7033 12.7337L39.4773 12.554V13.5311C39.4773 14.9573 38.2195 16.0467 36.5349 16.0467ZM35.7151 18.2366C37.321 18.2366 38.6687 17.5403 39.3537 16.3499H39.5447V18.0345H42.2287V9.64532C42.2287 7.03986 40.4543 5.50128 37.2986 5.50128C34.3786 5.50128 32.3459 6.88263 32.1213 9.05011H34.7492C35.0075 8.21906 35.8835 7.76984 37.1638 7.76984C38.6687 7.76984 39.4773 8.44366 39.4773 9.64532V10.6785L36.3103 10.8694C33.323 11.0491 31.6496 12.3294 31.6496 14.553C31.6496 16.7991 33.3454 18.2366 35.7151 18.2366ZM45.3293 22.493C48.0808 22.493 49.3947 21.4822 50.4392 18.4276L54.8752 5.74835H51.9328L49.069 15.3392H48.8781L46.0031 5.74835H42.9484L47.3395 18.0906L47.1935 18.6297C46.8342 19.764 46.1716 20.2132 44.9924 20.2132C44.8015 20.2132 44.3859 20.202 44.2287 20.1683V22.4481C44.4084 22.4818 45.1608 22.493 45.3293 22.493Z" fill="currentColor" />
  </SvgIcon>
);

const GooglePayIcon = () => (
  <svg height="80" width="55" viewBox="0 0 2387.3 948" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path
        fill="#ffffff"
        d="M1129.1,463.2V741h-88.2V54.8h233.8c56.4-1.2,110.9,20.2,151.4,59.4c41,36.9,64.1,89.7,63.2,144.8
          c1.2,55.5-21.9,108.7-63.2,145.7c-40.9,39-91.4,58.5-151.4,58.4L1129.1,463.2L1129.1,463.2z M1129.1,139.3v239.6h147.8
          c32.8,1,64.4-11.9,87.2-35.5c46.3-45,47.4-119.1,2.3-165.4c-0.8-0.8-1.5-1.6-2.3-2.3c-22.5-24.1-54.3-37.3-87.2-36.4L1129.1,139.3
          L1129.1,139.3z M1692.5,256.2c65.2,0,116.6,17.4,154.3,52.2c37.7,34.8,56.5,82.6,56.5,143.2V741H1819v-65.2h-3.8
          c-36.5,53.7-85.1,80.5-145.7,80.5c-51.7,0-95-15.3-129.8-46c-33.8-28.5-53-70.7-52.2-115c0-48.6,18.4-87.2,55.1-115.9
          c36.7-28.7,85.7-43.1,147.1-43.1c52.3,0,95.5,9.6,129.3,28.7v-20.2c0.2-30.2-13.2-58.8-36.4-78c-23.3-21-53.7-32.5-85.1-32.1
          c-49.2,0-88.2,20.8-116.9,62.3l-77.6-48.9C1545.6,286.8,1608.8,256.2,1692.5,256.2L1692.5,256.2z M1578.4,597.3
          c-0.1,22.8,10.8,44.2,29.2,57.5c19.5,15.3,43.7,23.5,68.5,23c37.2-0.1,72.9-14.9,99.2-41.2c29.2-27.5,43.8-59.7,43.8-96.8
          c-27.5-21.9-65.8-32.9-115-32.9c-35.8,0-65.7,8.6-89.6,25.9C1590.4,550.4,1578.4,571.7,1578.4,597.3L1578.4,597.3z M2387.3,271.5
          L2093,948h-91l109.2-236.7l-193.6-439.8h95.8l139.9,337.3h1.9l136.1-337.3L2387.3,271.5z"
      />
    </g>
    <path fill="#4285F4" d="M772.8,403.2c0-26.9-2.2-53.7-6.8-80.2H394.2v151.8h212.9c-8.8,49-37.2,92.3-78.7,119.8v98.6h127.1
      C729.9,624.7,772.8,523.2,772.8,403.2L772.8,403.2z"/>
    <path fill="#34A853" d="M394.2,788.5c106.4,0,196-34.9,261.3-95.2l-127.1-98.6c-35.4,24-80.9,37.7-134.2,37.7
      c-102.8,0-190.1-69.3-221.3-162.7H42v101.6C108.9,704.5,245.2,788.5,394.2,788.5z"/>
    <path fill="#FBBC04" d="M172.9,469.7c-16.5-48.9-16.5-102,0-150.9V217.2H42c-56,111.4-56,242.7,0,354.1L172.9,469.7z" />
    <path fill="#EA4335" d="M394.2,156.1c56.2-0.9,110.5,20.3,151.2,59.1L658,102.7C586.6,35.7,492.1-1.1,394.2,0
      C245.2,0,108.9,84.1,42,217.2l130.9,101.6C204.1,225.4,291.4,156.1,394.2,156.1z"/>
  </svg>
);

const UIComponents = () => {
  const table = useTable({ defaultOrderBy: 'date', defaultOrder: 'desc' });

  const [tableData, setTableData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [currentID, setCurrentID] = useState('');
  const [cardPaymentState, setCardPaymentState] = useState({
    errorMessage: ''
  });

  const [cardElementState, setCardElementState] = useState({
    errorMessage: '',
    complete: false,
  });

  const [depositState, setDepositState] = useState({
    submitting: false,
    error: '',
    success: '',
  })

  const payStripeCardPayment = usePayStripeCardPayment();

  const _OnCardElementChange = useCallback(({ error, complete }: { error: any, complete: any }) => {
    setCardPaymentState({
      errorMessage: ''
    });
    setCardElementState({
      errorMessage: !error ? undefined : error.message,
      complete
    });
  }, [setCardElementState]);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(endpoints.history.crgptToken);
      setTableData(response.data);
    } catch (err) {
      enqueueSnackbar(`Failed to fetch user CRGPT token history.`, { variant: 'error' });
      console.error('Error fetching user profile:', err);
    } finally {
      setIsLoading(false);
    }
  }, [enqueueSnackbar]);

  const fetchPrice = useCallback(async () => {
    try {
      const response = await axios.post(endpoints.history.price);
      setCurrentPrice(parseFloat(response.data.price));
    } catch (err) {
      enqueueSnackbar(`Failed to fetch current CRGPT price.`, { variant: 'error' });
      console.error('Error fetching price:', err);
    }
  }, [enqueueSnackbar]);

  const _OnContinue = useCallback(async () => {
    if (amount < 10) {
      enqueueSnackbar(`You must purchase over $10.`, { variant: 'error' });
      return;
    }
    // if (!address) {
    //   enqueueSnackbar(`You must enter your ERC20 token address.`, { variant: 'error' });
    //   return;
    // }
    if (address && !/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      enqueueSnackbar(`Please enter a valid ERC20 token address.`, { variant: 'error' });
      return;
    }
    setDepositState({
      error: '',
      success: '',
      submitting: true
    });
    try {
      setCardPaymentState({
        errorMessage: '',
      });
      const { data }: { success: boolean, data: any } = await axios.post(endpoints.credits.createPaymentIntent,
        {
          "amount": amount
        }
      );

      const { success, data: paymentIntent } = data;
      console.log('success', success)
      console.log('paymentIntent', paymentIntent)
      if (success) {
        const payResult: any = await payStripeCardPayment({
          client_secret: paymentIntent.client_secret
        }, {
          name: ''
        }
        );
        try {
          if (payResult && payResult.paymentIntent && payResult.paymentIntent.status === 'succeeded') {
            await axios.post(endpoints.history.confirmPaymentIntent,
              {
                "payment_intent_id": payResult.paymentIntent.id,
                "amount": (amount / currentPrice).toFixed(1),
                "address": address
              }
            );
            enqueueSnackbar(`Your request has been successfully submitted to the administrator. Please wait for the administrator to approve it.`, { variant: 'success' });
            setIsLoading(true);
            setAmount(0);
            setAddress("");
            setDepositState({
              submitting: false,
              error: '',
              success: '',
            });
            fetchHistory();
          }
        } catch (err) {
          console.error(err)
          setDepositState({
            submitting: false,
            error: err,
            success: '',
          });
        }

      } else if (paymentIntent && paymentIntent.error) {
        setCardPaymentState({
          errorMessage: paymentIntent.error
        });
        setDepositState({
          submitting: false,
          error: paymentIntent.error,
          success: '',
        });
      } else {
        setCardPaymentState({
          errorMessage: `The server responded`
        });
        setDepositState({
          submitting: false,
          error: `The server responded`,
          success: '',
        });
      }

    } catch (e: any) {
      setDepositState({
        success: '',
        submitting: false,
        error: e?.message
      });
      setCardPaymentState({
        errorMessage: e.message
      });
    }
  }, [amount, address, enqueueSnackbar, payStripeCardPayment, currentPrice, fetchHistory]);

  const isDepositButtonDisabled = !!cardElementState.errorMessage || !!cardPaymentState.errorMessage || !cardElementState.complete || !amount;

  useEffect(() => {
    fetchHistory();
    fetchPrice();

    const intervalId = setInterval(() => {
      fetchPrice();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [fetchHistory, fetchPrice]);

  useEffect(() => {
    if (tableData?.length) {
      const comparator = getComparator(table.order, table.orderBy);
      const stabilizedThis = tableData.map((el, index) => [el, index] as const);

      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      const sortedData = stabilizedThis.map((el) => el[0]);
      setFilteredTableData(sortedData);
    } else {
      setFilteredTableData([]);
    }
  }, [tableData, table.order, table.orderBy]);

  const {
    confirmCardPayment,
  } = useStripe();

  const confirmPaymentMethodApple = React.useCallback(async (e: any, paymentIntent: any) => {
    const payResult: any = await confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: e.paymentMethod.id,
      },
      {
        handleActions: false
      }
    )

    // eslint-disable-next-line @typescript-eslint/return-await
    return await axios.post(endpoints.history.confirmPaymentIntent,
      {
        "payment_intent_id": payResult.paymentIntent.id,
        "amount": (amount / currentPrice).toFixed(1),
        "address": address
      }
    );
  }, [address, amount, confirmCardPayment, currentPrice]);

  const [paymentRequestApple, { createPaymentRequest: createPaymentRequestApple }] = usePayStripeApplePayment(
    async () => {
      const { data }: { success: boolean, data: any } = await axios.post(endpoints.credits.createPaymentIntent,
        {
          "amount": amount
        }
      );

      const { success, data: paymentIntent } = data;
      return success ? paymentIntent : null;
    },
    confirmPaymentMethodApple,
    () => {
      enqueueSnackbar(`Your request has been successfully submitted to the administrator. Please wait for the administrator to approve it.`, { variant: 'success' });
      setIsLoading(true);
      setAmount(0);
      setAddress("");
      fetchHistory();
    }
  );

  useEffect(() => {
    createPaymentRequestApple(
      'Buy CRGPT',
      amount * 100,
    )
  }, [createPaymentRequestApple, amount]);

  const confirmPaymentMethodGoogle = React.useCallback(async (e: any, paymentIntent: any) => {
    const payResult: any = await confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: e.paymentMethod.id,
      },
      {
        handleActions: false
      }
    )

    // eslint-disable-next-line @typescript-eslint/return-await
    return await axios.post(endpoints.history.confirmPaymentIntent,
      {
        "payment_intent_id": payResult.paymentIntent.id,
        "amount": (amount / currentPrice).toFixed(1),
        "address": address
      }
    );
  }, [address, amount, confirmCardPayment, currentPrice]);

  const [paymentRequestGoogle, { createPaymentRequest: createPaymentRequestGoogle }] = usePayStripeApplePayment(
    async () => {
      const { data }: { success: boolean, data: any } = await axios.post(endpoints.credits.createPaymentIntent,
        {
          "amount": amount
        }
      );

      const { success, data: paymentIntent } = data;
      return success ? paymentIntent : null;
    },
    confirmPaymentMethodGoogle,
    () => {
      enqueueSnackbar(`Your request has been successfully submitted to the administrator. Please wait for the administrator to approve it.`, { variant: 'success' });
      setIsLoading(true);
      setAmount(0);
      setAddress("");
      fetchHistory();
    }
  );

  useEffect(() => {
    createPaymentRequestGoogle(
      'credits',
      amount * 100,
    )
  }, [createPaymentRequestGoogle, amount]);

  const handleUpdateAddress = async () => {
    if (address && !/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      enqueueSnackbar('Please enter a valid ERC20 token address.', { variant: 'error' });
      return;
    }

    try {
      const response = await axios.post(endpoints.history.updateAddress, { address, id: currentID });
      if (response.data.success) {
        enqueueSnackbar('Address updated successfully', { variant: 'success' });
        setIsModalOpened(false);
        fetchHistory();
      } else {
        enqueueSnackbar(response.data.error, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Failed to update address', { variant: 'error' });
    }
  };

  return (
    <>
      <Grid xs={12} md={12}>
        <Card sx={{ marginTop: 3 }}>
          <CardHeader title="Buy CRGPT Token" />

          <Typography variant="subtitle1" gutterBottom sx={{ width: "100%", p: 3, pb: 0 }}>
            Current Price: ${currentPrice.toFixed(4)} per CRGPT
          </Typography>

          <Stack direction="column" sx={{ width: "100%", p: 3 }}>
            <Stack direction="row" sx={{ width: "100%", gap: 2 }}>
              <TextField
                variant="outlined"
                sx={{ width: "200px" }}
                type="number"
                label="Amount(USD)"
                value={amount}
                InputLabelProps={{ shrink: true }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = parseFloat(event.target.value);
                  if (Number.isNaN(value) || value < 0) {
                    setAmount(0);
                  } else {
                    setAmount(value);
                  }
                }}
                placeholder='Please enter the amount in USD.'
              />
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                label="ERC20 Address(optional)"
                InputLabelProps={{ shrink: true }}
                placeholder='Please enter your erc20 address for receiving CRGPT.'
                value={address}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
              />
            </Stack>
            <Typography variant="caption" sx={{ width: "100%", pt: 2 }}>
              You will receive {(amount / currentPrice).toFixed(1)} CRGPT.
            </Typography>
          </Stack>

          <Stack direction="column" sx={{ width: "100%", p: 3, "#card-element": { width: '100%' }, ".InputElement": { color: "white" } }}>
            <CardElement
              onChange={_OnCardElementChange}
            />
            {(cardElementState.errorMessage || cardPaymentState.errorMessage) && <Label
              color="error"
              sx={{
                background: 'transparent',
                justifyContent: 'left',
                padding: 0,
                marginTop: 1
              }}
            >
              {cardElementState.errorMessage || cardPaymentState.errorMessage || <>&nbsp;</>}
            </Label>}
          </Stack>

          <Stack spacing={1.5} direction="row" justifyContent="flex-end" sx={{ p: 3, paddingTop: 0 }}>
            {paymentRequestApple && <ApplePayButton
              variant="contained"
              startIcon={<ApplePayIcon />}
              disabled={!amount}
              onClick={() => paymentRequestApple.show()}
            />}
            {paymentRequestGoogle && <ApplePayButton
              variant="contained"
              startIcon={<GooglePayIcon />}
              disabled={!amount}
              onClick={() => paymentRequestGoogle.show()}
            />}
            <LoadingButton
              size="medium"
              sx={{ paddingLeft: 5, paddingRight: 5 }}
              onClick={_OnContinue}
              loading={depositState.submitting}
              variant="contained"
              disabled={isDepositButtonDisabled}
            >
              Buy CRGPT
            </LoadingButton>
          </Stack>
        </Card >
        <Card sx={{ mt: 3 }}>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Table size="medium" sx={{ minWidth: 800 }}>
              <TableHeadCustom
                headLabel={TABLE_HEAD}
                order={table.order}
                orderBy={table.orderBy}
                onSort={table.onSort}
                excludeSort={['no']}
                sx={{ "th": { color: 'white !important' }, ".MuiTableCell-root.MuiTableCell-head:first-child": { textAlign: "center" } }}
              />

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {filteredTableData
                      .slice(
                        table.page * table.rowsPerPage,
                        table.page * table.rowsPerPage + table.rowsPerPage
                      )
                      .map((row, index) => (
                        <InvoiceTableRow
                          key={index}
                          row={row}
                          index={index}
                          setIsModalOpened={setIsModalOpened}
                          setCurrentID={setCurrentID}
                        />
                      ))}

                    <TableEmptyRows
                      emptyRows={emptyRows(table.page, table.rowsPerPage, filteredTableData.length)}
                    />

                    <TableNoData notFound={!filteredTableData.length} sx={{ ".MuiTypography-root": { color: 'white' } }} />
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePaginationCustom
            count={tableData.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </Grid>
      <Modal
        open={isModalOpened}
        aria-labelledby="update-address-modal"
        aria-describedby="modal-to-update-address-profile"
      >
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: 2,
            outline: 'none',
            p: 3,
            maxWidth: 400,
            minWidth: 360,
            margin: 'auto',
            mt: 5
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: theme => theme.palette.primary.main }}>
            Add Your ERC20 Address
          </Typography>

          <Stack spacing={3} mt={3}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            />
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                sx={{ width: '50%' }}
                onClick={() => setIsModalOpened(false)}
              >
                Cancel
              </Button>
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ width: '50%' }}
                onClick={handleUpdateAddress}
              >
                Update
              </LoadingButton>
            </Stack>
          </Stack>
        </Card>
      </Modal>
    </>
  );
}

const AccountBuyCRGPT: any = (props: any) => (
  <Stripe>
    <UIComponents {...props} />
  </Stripe>
);

export default AccountBuyCRGPT;