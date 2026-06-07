import WaveSurfer from 'wavesurfer.js';
import { useRef, useState, useEffect } from 'react';
import { Line, XAxis, YAxis, Tooltip, LineChart, ResponsiveContainer } from 'recharts';

import { Box, Chip, Grid, alpha, Stack, Button, Switch, BoxProps, useTheme, IconButton, Typography, FormControlLabel } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { useStrategy } from 'src/store/strategy/useStrategy';
import { getUserProfileData } from 'src/auth/context/jwt/utils';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify/iconify';
import ChatInput from 'src/components/chat-input/chat-input';
import Carousel, { useCarousel } from 'src/components/carousel';


interface DataPoint {
    date: string;
    price: number;
    change: number;
    action?: 'Buy' | 'Sell';
}

interface StrategyChatProps extends BoxProps {
}

export default function StrategyChat({
    sx,
    ...other
}: StrategyChatProps) {
    const smUp = useResponsive("up", 'sm');
    const isPreview = useStrategy((state) => state.isPreview);
    const setIsPreview = useStrategy((state) => state.setIsPreview);
    const isShowSummary = useStrategy((state) => state.isShowSummary);
    const isSettingDetail = useBoolean(false);
    const isChatHistory = useBoolean(false);
    const carousel = useCarousel();
    const theme = useTheme();
    const user_profile = getUserProfileData();

    useEffect(() => {
        fetch('/audios/voice.mp3')
            .then((response) => response.blob())
            .then((_blob) => {
            });
    }, [])

    const isAutoplay = useBoolean();
    const audioPlayerRef = useRef<HTMLDivElement>();
    const [audioPlayerWavesurfer, setAudioPlayerWavesurfer] = useState<WaveSurfer | null>(null);
    const [recordedAudioMessage, setRecordedAudioMessage] = useState<any>(null);
    const isRecording = useBoolean();

    const handleAudioMessagePlay = (msgData: any) => {
        if (recordedAudioMessage !== msgData) {
            if (audioPlayerRef.current) {
                audioPlayerRef.current.innerHTML = "";

                const newAudioPlayerWavesurfer = WaveSurfer.create({
                    container: audioPlayerRef.current,
                    waveColor: theme.palette.primary.main,
                    progressColor: theme.palette.primary.dark,
                    height: 32,
                    url: '/audios/voice.mp3',
                })
                if (isAutoplay.value) {
                    newAudioPlayerWavesurfer.on('ready', () => {
                        newAudioPlayerWavesurfer.play();
                        isRecording.onTrue();
                    });
                }
                setAudioPlayerWavesurfer(newAudioPlayerWavesurfer);
                setRecordedAudioMessage(msgData);
            }
        }
    }

    const handleAudioMessagePause = () => {
        isRecording.onToggle();
        audioPlayerWavesurfer?.playPause();
    }

    const handleAudioMessageQuit = () => {
        audioPlayerWavesurfer?.destroy();
        isRecording.onFalse();
        setRecordedAudioMessage(null);
    }

    return <Stack direction="column" spacing={2} sx={{
        width: isShowSummary ? '33%' : '50%',
        flex: 1,
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
        height: '100%',
        position: 'relative',
        p: 1,
        ...(
            (isPreview && !smUp) && {
                display: 'none',
            }
        ),
        ...(
            (isShowSummary && !smUp) && {
                display: 'none',
            }
        ),
        ...sx,
    }} {...other}>
        {
            !smUp &&
            <Button size="small" variant="outlined" sx={{
                position: 'absolute',
                left: '8px',
                top: '8px',
                zIndex: 11,
            }}
                onClick={() => setIsPreview(!isPreview)}
            >Preview</Button>
        }
        <Box sx={{
            width: '100%',
            height: '100%',
            display: !isChatHistory.value ? 'block' : 'none',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowY: 'auto',
                height: '100%',
                pb: 8,
            }}>
                <Box sx={{
                    backgroundColor: alpha(theme.palette.background.default, 0.9),
                    position: 'sticky',
                    top: 0,
                    gap: 1,
                    p: 1,
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: 1,
                    }}>
                        <Button variant='contained' color='primary' size="small" sx={{ mr: 1 }}>Add AI Gneralted</Button>
                        <FormControlLabel control={<Switch checked={isAutoplay.value} onChange={isAutoplay.onToggle} />} label="Autoplay" />
                        <IconButton size="small" sx={{
                            transition: 'all 0.3s',
                            transform: isSettingDetail.value ? 'rotate(180deg)' : 'rotate(0deg)',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                        }} onClick={() => isSettingDetail.onToggle()}>
                            <Iconify icon="mingcute:down-line" sx={{
                                color: 'text.primary',
                            }} />
                        </IconButton>
                        <IconButton size="small" sx={{
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                        }} onClick={() => isChatHistory.onToggle()}>
                            <Iconify icon="material-symbols:list" sx={{
                                color: 'text.primary',
                            }} />
                        </IconButton>
                        <IconButton size="small" sx={{
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.8)}`,
                        }}>
                            <Iconify icon="octicon:screen-full-24" sx={{
                                color: 'text.primary',
                            }} />
                        </IconButton>
                    </Box>

                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        height: isSettingDetail.value ? '400px' : '0px',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        transition: 'all 0.3s',
                    }}>
                        <Box sx={{
                            width: '100%',
                            position: 'absolute',
                            top: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            p: 1,
                        }}>
                            <Typography variant="subtitle2" sx={{ color: 'primary.main', textAlign: 'center', fontWeight: '800' }}>CRYPTO TRADING ASSISTANT</Typography>

                            <Box sx={{
                                aspectRatio: '16 / 9',
                            }}>
                                <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
                                    <Box sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}>
                                        <video src="/videos/nicolas-model.mp4" autoPlay loop muted playsInline style={{
                                            width: '100%',
                                            height: '100%',
                                        }} />
                                    </Box>
                                    {
                                        modelData.map((item, index) => (
                                            <Box key={index} sx={{
                                                width: '100%',
                                                height: '100%',
                                            }}>
                                                <Box sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    backgroundColor: `${item.color}.main`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                    <Image src={item.avatar} sx={{
                                                        width: '100px',
                                                        height: '100px',
                                                        objectFit: 'cover',
                                                        borderRadius: '50%',
                                                    }} />
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Carousel>
                            </Box>

                            <Box sx={{
                                width: '100%',
                                height: '240px',
                                p: 1,
                                borderRadius: 1,
                                border: `1px solid ${theme.palette.primary.main}`,
                            }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <XAxis
                                            dataKey="date"
                                            stroke="#ddd"
                                            tick={{ fill: '#ddd' }}
                                        />
                                        <YAxis
                                            stroke="#ddd"
                                            tick={{ fill: '#ddd' }}
                                            domain={[0, 32000]}
                                            ticks={[0, 7500, 15000, 22500, 30000]}
                                        />
                                        <Tooltip
                                            content={({ active, payload, label }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    const changePercent = data.change !== 0 ? (data.change / (data.price - data.change) * 100).toFixed(2) : 0;
                                                    return (
                                                        <Box sx={{
                                                            p: 1,
                                                            borderRadius: 1,
                                                            backgroundColor: '#100e0d',
                                                        }}>
                                                            <Typography sx={{ color: 'primary.main' }}>{`Time: ${label}`}</Typography>
                                                            <Typography sx={{ color: 'primary.main' }}>{`Price: ${data.price.toFixed(2)}`}</Typography>
                                                            <Typography sx={{ color: data.change > 0 ? "success.main" : "error.main" }}>{`Change: ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${changePercent}%)`}</Typography>
                                                            {
                                                                data.action &&
                                                                <Typography sx={{ color: data.action === 'Buy' ? "success.main" : "error.main" }}>{`Action: ${data.action}`}</Typography>
                                                            }
                                                        </Box>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#ffd700"
                                            strokeWidth={2}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="change"
                                            stroke="#00d700"
                                            strokeWidth={2}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 1,
                                my: 1,
                            }}>
                                {
                                    modelData.map((item, index) => (
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1,
                                            alignItems: 'center',
                                            width: smUp ? "86px" : '56px',
                                        }} key={index}>
                                            <Image src={item.avatar} sx={{
                                                width: smUp ? '36px' : '32px',
                                                minWidth: smUp ? '36px' : '32px',
                                                height: smUp ? '36px' : '32px',
                                                borderRadius: '50%',
                                                borderWidth: '2px',
                                                borderStyle: 'solid',
                                                borderColor: `${item.color}.main`,
                                            }} />
                                            <Typography variant="caption" sx={{
                                                color: `${item.color}.main`,
                                                textAlign: 'center',
                                                fontSize: smUp ? '12px' : '10px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                width: '100%',
                                            }}>{item.name}</Typography>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 1,
                        my: 1,
                    }}>
                        <Chip size="small" color="primary" label="ETH/USDT" sx={{
                            borderRadius: '16px',
                        }} />
                        <Chip size="small" color="primary" label="BTC/USDT" sx={{
                            borderRadius: '16px',
                        }} />
                        <Chip size="small" color="primary" label="ADA/USDT" sx={{
                            borderRadius: '16px',
                        }} />
                        <Chip size="small" color="primary" label="XRP/USDT" sx={{
                            borderRadius: '16px',
                        }} />
                    </Box>

                    <Box sx={{
                        width: '100%',
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                        height: '32px',
                        display: recordedAudioMessage ? 'flex' : 'none',
                        alignItems: 'center',
                        gap: 1,
                    }}>
                        <IconButton size="small" onClick={() => handleAudioMessagePause()}>
                            <Iconify icon={isRecording.value ? "material-symbols:pause" : "mdi:play"} sx={{
                                color: 'text.primary'
                            }} />
                        </IconButton>
                        <Box ref={audioPlayerRef} sx={{
                            flex: 1,
                        }} />
                        <IconButton size="small" onClick={() => handleAudioMessageQuit()}>
                            <Iconify icon="material-symbols:close" sx={{
                                color: 'text.primary'
                            }} />
                        </IconButton>
                    </Box>
                </Box>

                {
                    1 && messageData.map((item, index) => {
                        if (!item.isUser) {
                            return <Box sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'flex-start',
                            }}>
                                <Box sx={{
                                    width: '100%',
                                    maxWidth: '600px',
                                    display: 'flex',
                                    gap: 2,
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    ':hover': {
                                        '.action-buttons': {
                                            opacity: 1,
                                            visibility: 'visible',
                                        },
                                    },
                                }}>
                                    <Image src={modelData.find((_m) => _m.id === item.model)?.avatar || ""} sx={{
                                        width: '46px',
                                        minWidth: '46px',
                                        height: '46px',
                                        borderRadius: '50%',
                                    }} />
                                    <Box sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            backgroundImage: `linear-gradient(to right, ${modelData.find((_m) => _m.id === item.model)?.startColor || ""}, ${modelData.find((_m) => _m.id === item.model)?.endColor || ""})`,
                                            borderRadius: 2,
                                            p: 1,
                                            cursor: 'pointer',
                                        }}>
                                            <Typography variant="body2" sx={{
                                                color: theme.palette.background.default,
                                            }}>
                                                {messageData[0].content}
                                            </Typography>
                                        </Box>
                                        <Typography variant="caption" sx={{
                                            color: 'text.secondary',
                                        }}>{messageData[0].timestamp}</Typography>
                                    </Box>
                                    <Box className="action-buttons" sx={{
                                        display: 'flex',
                                        gap: 0.5,
                                        alignItems: 'center',
                                        opacity: 0,
                                        visibility: 'hidden',
                                        transition: 'all 0.3s',
                                    }}>
                                        <IconButton size="small" sx={{
                                        }} onClick={() => handleAudioMessagePlay(item)} >
                                            <Iconify icon="cil:audio" sx={{
                                                color: 'primary.main',
                                                width: '16px',
                                                height: '16px',
                                            }} />
                                        </IconButton>
                                        <IconButton size="small" sx={{
                                        }}>
                                            <Iconify icon="lucide:clipboard" sx={{
                                                color: 'primary.main',
                                                width: '16px',
                                                height: '16px',
                                            }} />
                                        </IconButton>
                                        <IconButton size="small" sx={{
                                        }}>
                                            <Iconify icon="ic:baseline-reply" sx={{
                                                color: 'primary.main',
                                                width: '16px',
                                                height: '16px',
                                            }} />
                                        </IconButton>
                                        <IconButton size="small" sx={{
                                        }}>
                                            <Iconify icon="material-symbols:thumb-up-outline" sx={{
                                                color: 'primary.main',
                                                width: '16px',
                                                height: '16px',
                                            }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>;
                        }

                        return <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                            <Box sx={{
                                width: '100%',
                                maxWidth: '600px',
                                display: 'flex',
                                gap: 2,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-end',
                                ':hover': {
                                    '.action-buttons': {
                                        opacity: 1,
                                        visibility: 'visible',
                                    },
                                },
                            }}>
                                <Box className="action-buttons" sx={{
                                    display: 'flex',
                                    gap: 0.5,
                                    alignItems: 'center',
                                    opacity: 0,
                                    visibility: 'hidden',
                                    transition: 'all 0.3s',
                                }}>
                                    <IconButton size="small" sx={{
                                    }}>
                                        <Iconify icon="lucide:clipboard" sx={{
                                            color: 'primary.main',
                                            width: '16px',
                                            height: '16px',
                                        }} />
                                    </IconButton>
                                    <IconButton size="small" sx={{
                                    }}>
                                        <Iconify icon="ic:baseline-reply" sx={{
                                            color: 'primary.main',
                                            width: '16px',
                                            height: '16px',
                                        }} />
                                    </IconButton>
                                    <IconButton size="small" sx={{
                                    }}>
                                        <Iconify icon="material-symbols:thumb-up-outline" sx={{
                                            color: 'primary.main',
                                            width: '16px',
                                            height: '16px',
                                        }} />
                                    </IconButton>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                        borderRadius: 2,
                                        p: 1,
                                        cursor: 'pointer',
                                    }}>
                                        <Typography variant="body2" sx={{
                                            color: theme.palette.background.default,
                                        }}>
                                            {item.content}
                                        </Typography>
                                    </Box>
                                    <Typography variant="caption" sx={{
                                        color: 'text.secondary',
                                        ml: 1,
                                    }}>{item.timestamp}</Typography>
                                </Box>
                                {
                                    user_profile?.avatar ?
                                        <Image src={user_profile?.avatar || ""} sx={{
                                            width: '46px',
                                            minWidth: '46px',
                                            height: '46px',
                                            borderRadius: '50%',
                                        }} />
                                        :
                                        <Iconify icon="bxs:user" sx={{
                                            width: '46px',
                                            minWidth: '46px',
                                            height: '46px',
                                            borderRadius: '50%',
                                        }} />
                                }
                            </Box>
                        </Box>
                    }
                    )
                }

                {
                    null && <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Button variant="outlined" color="primary">Conversations</Button>
                    </Box>
                }
            </Box>

            <ChatInput sx={{
                position: 'absolute',
                bottom: '4px',
                left: '4px',
                right: '4px',
                p: 1,
                width: 'calc(100% - 8px)',
            }} />
        </Box>

        <Box sx={{
            width: '100%',
            height: '100%',
            display: isChatHistory.value ? 'flex' : 'none',
            flexDirection: 'column',
        }}>
            <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1} sx={{ mb: 1 }}>
                <Button size="small" variant="outlined" color="primary" endIcon={<Iconify icon="icon-park-outline:back" />} onClick={() => isChatHistory.onToggle()}>Back to Chat</Button>
            </Stack>
            <Typography variant="body2" sx={{ mb: 2 }}>Recent Chat History</Typography>

            <Box sx={{
                width: '100%',
                height: 'calc(100% - 76px)',
                overflowY: 'auto',
            }}>
                <Grid container spacing={1}>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 99].map((item, index) => (
                            <Grid item xs={12} sm={6} md={12} lg={6} xl={4}>
                                <Box sx={{
                                    borderRadius: 1,
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    p: 1,
                                    display: 'flex',
                                    gap: 1,
                                    flexDirection: 'column',
                                }}>
                                    <Iconify icon="wpf:chat" sx={{ color: 'primary.main' }} />
                                    <Typography variant="body2" sx={{ color: 'text.primary' }}>Great choice! ETH/USDT is highly liquid. Your 4H timeframe balances noise and signals well. Remember, proper risk management is crucial</Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>11 min ago</Typography>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    </Stack>
}

const data: DataPoint[] = [
    { date: '2023-01', price: 16500, change: 0 },
    { date: '2023-02', price: 21000, change: 0 },
    { date: '2023-03', price: 18500, change: -0.1, action: 'Sell' },
    { date: '2023-04', price: 15500, change: 0.1, action: 'Buy' },
    { date: '2023-05', price: 17500, change: 0.1 },
    { date: '2023-06', price: 11000, change: -0.1, action: 'Sell' },
    { date: '2023-07', price: 19500, change: 0.0 },
    { date: '2023-08', price: 16500, change: -0.1, action: 'Sell' },
];

const modelData = [
    {
        id: 1,
        avatar: '/images/Goldie.png',
        name: 'Goldie',
        color: 'primary',
        startColor: "#FFAB00",
        endColor: '#B76E00',
    },
    {
        id: 2,
        avatar: '/images/Nanami.jpg',
        name: 'Crypto Sage',
        color: 'success',
        startColor: "#00A76F",
        endColor: '#007867',
    },
    {
        id: 3,
        avatar: '/images/Naoki.jpg',
        name: 'Market Maven',
        color: 'info',
        startColor: "#00B8D9",
        endColor: '#006C9C',
    },
    {
        id: 4,
        avatar: '/images/Nicolas.png',
        name: 'Risk Ranger',
        color: 'error',
        startColor: "#FF5630",
        endColor: '#B71D18',
    },
]

const messageData = [
    {
        content: 'Great choice! ETH/USDT is highly liquid. Your 4H timeframe balances noise and signals well. Remember, proper risk management is crucial',
        timestamp: '11 min ago',
        model: 1,
        isUser: true,
    }, {
        content: 'Great choice! ETH/USDT is highly liquid. Your 4H timeframe balances noise and signals well. Remember, proper risk management is crucial',
        timestamp: '11 min ago',
        model: 1,
        isUser: false,
    }, {
        content: 'Great choice! ETH/USDT is highly liquid. Your 4H timeframe balances noise and signals well. Remember, proper risk management is crucial',
        timestamp: '11 min ago',
        model: 2,
        isUser: false,
    }, {
        content: 'Great choice! ETH/USDT is highly liquid. Your 4H timeframe balances noise and signals well. Remember, proper risk management is crucial',
        timestamp: '11 min ago',
        model: 3,
        isUser: false,
    }, {
        content: 'Great choice! ETH/USDT is highly liquid. Your 4H timeframe balances noise and signals well. Remember, proper risk management is crucial',
        timestamp: '11 min ago',
        model: 4,
        isUser: false,
    }
]