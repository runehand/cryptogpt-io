'use client';



import { useState, useEffect } from 'react';

import { Box, Card, Link, Grid, alpha, Stack, Button, TextField, Typography } from '@mui/material';

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

import { useResponsive } from 'src/hooks/use-responsive';

import axios, { endpoints } from 'src/utils/axios';

import { useStrategy } from 'src/store/strategy/useStrategy';

import Iconify from 'src/components/iconify';
import Carousel, { useCarousel } from 'src/components/carousel';

import StrategyCrgptBuyCard from '../strategy-crgpt-buy-card';
import StrategyCard from '../strategy-card';


export default function StrategyView() {
  const isShowSummary = useStrategy((state) => state.isShowSummary);
  const setIsShowSummary = useStrategy((state) => state.setIsShowSummary);
  const smUp = useResponsive("up", 'sm');
  const [text, setText] = useState('');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const carousel = useCarousel({
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  })
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true
  };

  useEffect(() => {
    axios.get(endpoints.strategy.initial_prompt).then((response) => {
      setText(response.data.prompt);
    });
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      axios.post(endpoints.strategy.initial_prompt, {
        prompt: newText
      }).then((response) => {
        console.log('response', response);
      }).catch((error) => {
        console.error('Error saving data:', error);
      });
    }, 2000);

    setTimeoutId(id);
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        pb: 2,
      }}
    >
      <Card
        sx={{
          p: 1,
          flex: 1,
          borderRadius: 1,
          boxShadow: 2,
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: 1,
        }}>
          <Box sx={{
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1,
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
            border: theme => `1px solid ${alpha(theme.palette.primary.main, 0.6)}`,
          }}>
            <Iconify icon="et:strategy" sx={{
              width: '36px',
              height: '36px',
              color: 'primary.main',
            }} />
          </Box>
          <TextField multiline size="small" value={text} onChange={handleTextChange} sx={{ flex: 1 }} />

          <Link href={paths.dashboard.strategy.create} component={RouterLink}>
            <Button variant="contained" size='small' color="primary">New Ai Strategy</Button>
          </Link>
          <Button variant="contained" size='small' color="primary">Upgrade</Button>
        </Box>

        <Box sx={{
        }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Risk Level</Typography>

          <Box sx={{
            display: 'flex',
            borderRadius: '20px',
            backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
            p: 0.5,
          }}>
            <Box sx={{
              width: '50%',
              backgroundImage: theme => `linear-gradient(to right, ${theme.palette.success.main}, ${theme.palette.warning.main})`,
              borderRadius: '20px',
              p: 0.75,
            }} />
          </Box>
        </Box>

        <Box sx={{
        }}>
          <Typography variant="h6" sx={{ mb: 1 }}>Market Sentiment</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={{
                backgroundColor: theme => alpha(theme.palette.error.main, 0.08),
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 1,
                boxShadow: theme => `0px 0px 10px 0px ${theme.palette.error.main}`,
              }}>
                <Typography variant="h6" sx={{
                  color: 'primary.main',
                }}>BITCOIN</Typography>
                <Typography variant="body2">Sentiment: Bullish</Typography>
                <Typography variant="body2">Value: 0.75</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={{
                backgroundColor: theme => alpha(theme.palette.info.main, 0.08),
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 1,
                boxShadow: theme => `0px 0px 10px 0px ${theme.palette.info.main}`,
              }}>
                <Typography variant="h6" sx={{
                  color: 'primary.main',
                }}>BITCOIN</Typography>
                <Typography variant="body2">Sentiment: Bullish</Typography>
                <Typography variant="body2">Value: 0.75</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={{
                backgroundColor: theme => alpha(theme.palette.success.main, 0.08),
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 1,
                boxShadow: theme => `0px 0px 10px 0px ${theme.palette.success.main}`,
              }}>
                <Typography variant="h6" sx={{
                  color: 'primary.main',
                }}>BITCOIN</Typography>
                <Typography variant="body2">Sentiment: Bullish</Typography>
                <Typography variant="body2">Value: 0.75</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Box sx={{
                backgroundColor: theme => alpha(theme.palette.warning.main, 0.08),
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 1,
                boxShadow: theme => `0px 0px 10px 0px ${theme.palette.warning.main}`,
              }}>
                <Typography variant="h6" sx={{
                  color: 'primary.main',
                }}>BITCOIN</Typography>
                <Typography variant="body2">Sentiment: Bullish</Typography>
                <Typography variant="body2">Value: 0.75</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {
              [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => <Box key={`key-${index}`} sx={{
                px: 0.5,
                width: '300px',
                height: '100%',
              }}>
                <StrategyCard />
              </Box>)
            }
            <Box sx={{
              px: 0.5,
              width: '300px',
              height: '100%',
            }}>
              <StrategyCrgptBuyCard />
            </Box>
          </Carousel>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}>
          <Typography variant="h6">TOP Strategies</Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            cursor: 'pointer',
          }}>
            <Box sx={{
              borderRadius: 1,
              p: 1.5,
              backgroundColor: theme => alpha(theme.palette.primary.main, 0.08),
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              position: 'relative',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                '& .summary-hover-panel': {
                  visibility: 'visible',
                  opacity: 1,
                },
              },
            }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <Typography variant="subtitle1" sx={{
                  color: 'primary.main',
                }}>Stratege 1</Typography>
                <Typography variant="body1" sx={{
                  color: 'success.main',
                }}>+90%</Typography>
              </Box>
              <Typography variant="body2" sx={{
                color: 'text.primary',
              }}>Success Rate: 78%</Typography>
              <Typography variant="body1" sx={{
                color: 'text.primary',
              }}>Assets: BTC/USDT</Typography>


              <Box
                className="summary-hover-panel"
                sx={{
                  width: '240px',
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  transition: 'all 0.3s',
                  position: 'absolute',
                  right: '16px',
                  bottom: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  visibility: 'hidden',
                  opacity: 0,
                }}
              >
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="hugeicons:chart-average"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Avg.Price:
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      flexGrow: 1,
                      textAlign: 'right',
                    }}
                  >
                    ≈ $0
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="mdi:bitcoin"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Sum BTC:
                  </Typography>

                  <Typography
                    variant="caption"
                    color="success"
                    sx={{
                      display: 'block',
                      flexGrow: 1,
                      textAlign: 'right',
                    }}
                  >
                    0.0
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <Iconify
                    icon="token:usdt"
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      mr: 1,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Sum USDT:
                  </Typography>

                  <Typography
                    variant="caption"
                    color="success"
                    sx={{
                      display: 'block',
                      flexGrow: 1,
                      textAlign: 'right',
                    }}
                  >
                    0
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Box>

        <Typography variant="h6">My Strategies</Typography>
      </Card>
    </Box>
  );
}
