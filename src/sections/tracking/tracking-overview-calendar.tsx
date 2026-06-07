
import { useMemo, useState, useEffect } from "react";
import { getDay, startOfMonth, getDaysInMonth } from "date-fns";

import { Box, Stack, BoxProps, IconButton, Typography } from "@mui/material";

import { useResponsive } from "src/hooks/use-responsive";

import { NAV } from "src/layouts/config-layout";

import Iconify from "src/components/iconify";
import { CalendarDateItem } from "src/components/calendar/calendar-date-item";

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface TrackingOverviewCalendarProps extends BoxProps {
    date?: Date;
    selectedDate?: Date;
    handlechangeSelectedDate?: (date: Date) => void;
    handleChangeDate?: (date: Date) => void;
    isShowWeekDay?: boolean;
}

export default function TrackingOverviewCalendar({
    date: defaultDate = new Date(),
    selectedDate: defaultSelectedDate = new Date(),
    handleChangeDate,
    handlechangeSelectedDate,
    isShowWeekDay = false,
    sx,
    ...other
}: TrackingOverviewCalendarProps) {
    const [currentDate, setCurrentDate] = useState(defaultDate);
    const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);

    // for UI
    const smUp = useResponsive('up', 'sm');
    const [startRestPeriod, setStartRestPeriod] = useState(0);
    const [endRestPeriod, setEndRestPeriod] = useState(0);
    const [numberOfDaysForMonths, setNumberOfDaysForMonths] = useState(30);

    const [currentWidth, setCurrentWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setCurrentWidth(window.innerWidth);
        };

        // Set initial width
        handleResize();

        // Correctly listen for resize events
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const numberofMonth = useMemo(() => {
        console.log('currentWidth', currentWidth);
        if (smUp) return Math.round((currentWidth - (NAV.W_SIDE_BAR_MENU + 16) - 100) / 300);
        return Math.round((currentWidth - (NAV.W_SIDE_BAR_MENU + 8)) / 300);;
    }, [currentWidth, smUp]);

    useEffect(() => {
        const firstDateOfMonth = startOfMonth(currentDate);

        const targetDate = new Date(firstDateOfMonth);
        targetDate.setMonth(firstDateOfMonth.getMonth() + numberofMonth);

        const timeDifference = targetDate.getTime() - firstDateOfMonth.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        const _numberOfDaysForMonths = getDaysInMonth(currentDate);
        setNumberOfDaysForMonths(Math.floor(daysDifference));

        console.log('firstDateOfMonth', firstDateOfMonth);
        const dayOfFirstDateOfMonth = getDay(firstDateOfMonth);
        setStartRestPeriod(dayOfFirstDateOfMonth);

        const _endRestPeriod = 7 - (_numberOfDaysForMonths + dayOfFirstDateOfMonth) % 7;
        setEndRestPeriod(_endRestPeriod === 7 ? 0 : _endRestPeriod);

        console.log('numberofMonth', numberofMonth);
        console.log('currentDate', currentDate);
        console.log('dayOfFirstDateOfMonth', dayOfFirstDateOfMonth);
        console.log('_numberOfDaysForMonths', _numberOfDaysForMonths);
        console.log('startRestPeriod', startRestPeriod);
        console.log('endRestPeriod', endRestPeriod);
        console.log('daysDifference', daysDifference);
    }, [currentDate, endRestPeriod, startRestPeriod, numberofMonth]);

    const monthRangeContentOfButton = useMemo(() => {
        if (numberofMonth === 0) return currentDate.toLocaleString('default', { month: 'long' });
        const startMonth = currentDate.toLocaleString('default', { month: 'long' });
        const endMonthDate = startOfMonth(currentDate);
        endMonthDate.setMonth(currentDate.getMonth() + numberofMonth - 1);
        const endMonth = new Date(endMonthDate).toLocaleString('default', { month: 'long' });
        return `${startMonth} - ${endMonth}`;
    }, [currentDate, numberofMonth])

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            position: 'relative',
            ...sx,
        }} {...other}>
            <Stack direction="row" spacing={1} justifyContent="space-between" alignItems='center'>
                <Box>
                    <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 1 }}>Total hours</Typography>
                    <Typography variant="h5">22h</Typography>
                </Box>

                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{
                    border: theme => `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                }}>
                    <IconButton onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setMonth(newDate.getMonth() - numberofMonth);
                        setCurrentDate(newDate);
                    }}><Iconify icon="mingcute:left-fill" /></IconButton>
                    <Typography variant="body1">{monthRangeContentOfButton}</Typography>
                    <IconButton onClick={() => {
                        const newDate = new Date(currentDate);
                        newDate.setMonth(newDate.getMonth() + numberofMonth);
                        setCurrentDate(newDate);
                    }}><Iconify icon="mingcute:right-fill" /></IconButton>
                </Stack>
            </Stack>

            <Box sx={{
                position: 'relative',
                height: '440px',
            }}>
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    gap: 3,
                    position: 'absolute',
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'space-around',
                    }}>
                        {
                            weekDays.map((day) => (
                                <Typography key={day} variant="caption" align="center">{day}</Typography>
                            ))
                        }
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        justifyContent: 'space-around',
                    }}>
                        {
                            Array.from({ length: startRestPeriod }, (_, i) => (
                                <CalendarDateItem size="large" displayAttribute="month" key={i} disabled />
                            ))
                        }
                        {
                            Array.from({ length: 7 - startRestPeriod }, (_, i) => {
                                const date = new Date(startOfMonth(currentDate));
                                date.setDate(i + 1);

                                return (
                                    <CalendarDateItem
                                        key={i}
                                        date={date}
                                        size="large" displayAttribute="month"
                                        selected={date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear()}
                                        isActive={date.getDay() === 0 || date.getDay() === 6}
                                        isToday={date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()}
                                        onClick={() => {
                                            setSelectedDate(date);
                                            handlechangeSelectedDate?.(date);
                                        }}
                                    />
                                );
                            })
                        }
                    </Box>

                    {
                        Array.from({ length: Math.floor((numberOfDaysForMonths - (7 - startRestPeriod)) / 7) }, (_, w_i) => (
                            <Box key={`week-key-${w_i}`} sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                justifyContent: 'space-around',
                            }}>
                                {
                                    Array.from({ length: 7 }, (__, i) => {
                                        const date = new Date(startOfMonth(currentDate));
                                        date.setDate(7 - startRestPeriod + w_i * 7 + i + 1);
                                        return (
                                            <CalendarDateItem
                                                key={i}
                                                date={date}
                                                size="large" displayAttribute="month"
                                                selected={date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear()}
                                                isActive={date.getDay() === 0 || date.getDay() === 6}
                                                isToday={date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()}
                                                onClick={() => {
                                                    setSelectedDate(date);
                                                    handlechangeSelectedDate?.(date);
                                                }}
                                            />
                                        );
                                    })
                                }
                            </Box>
                        ))
                    }

                    {
                        endRestPeriod !== 0 &&
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                            justifyContent: 'space-around',
                        }}>
                            {
                                Array.from({ length: endRestPeriod }, (__, i) => {
                                    const date = new Date(startOfMonth(currentDate));
                                    date.setDate(numberOfDaysForMonths - endRestPeriod + i + 1);
                                    return (
                                        <CalendarDateItem
                                            key={i}
                                            date={date}
                                            size="large" displayAttribute="month"
                                            selected={date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear()}
                                            isActive={date.getDay() === 0 || date.getDay() === 6}
                                            isToday={date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()}
                                            onClick={() => {
                                                setSelectedDate(date);
                                                handleChangeDate?.(date);
                                            }}
                                        />
                                    );
                                })
                            }
                            {
                                Array.from({ length: 7 - endRestPeriod }, (_, i) => (
                                    <CalendarDateItem size="large" displayAttribute="month" key={i} disabled />
                                ))
                            }
                        </Box>
                    }

                    {isShowWeekDay && weekDays.map((day) => (
                        <Typography key={day} variant="caption" align="center">{day}</Typography>
                    ))}
                </Box>
            </Box>

            <Box>
                <Typography variant="caption" align="center">{currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</Typography>
            </Box>
        </Box>
    );
}
