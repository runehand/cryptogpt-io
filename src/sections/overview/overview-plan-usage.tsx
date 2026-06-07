'use client';

import React, { useState, useEffect } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Card, Button, Typography, CircularProgress } from '@mui/material';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

import PlanUsageModal from './PlanUsageModal';
import PlanUsageModalChart from './PlanUsageModalChart';

interface PlanUsageItem {
	type: string;
	limit_value: string;
	value: number;
	percentage: number;
	unit?: string;
}

const OverviewPlanUsage: React.FC = () => {

	const { user } = useAuthContext();

	const [open, setOpen] = useState(false);
	const [usageData, setUsageData] = useState<PlanUsageItem[]>([]);
	const [pUsageData, setPUsageData] = useState<PlanUsageItem | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsageData = async () => {
			if (!user?.id) {
				console.error('User ID not available');
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const response = await axios.get(`${endpoints.dashboard.plan_usage}?user_id=${user.id}`);
				setUsageData(response.data);
				if (response.data.length > 0) {
					setPUsageData(response.data[0]);
					console.log(response.data[0])
				}
			} catch (error) {
				console.error('Error fetching usage data:', error);
				// Set default data in case of error
				setUsageData([
					{ type: 'Storage', value: 0, limit_value: '512.00 MB', unit: 'MB', percentage: 0 },
					{ type: 'RAG Calls', value: 0, limit_value: '500', percentage: 0 },
					{ type: 'Tokens', value: 0, limit_value: '500K', percentage: 0 },
					{ type: 'Vectors', value: 0, limit_value: '10K', percentage: 0 },
					{ type: 'Transcription Hours', value: 0, limit_value: '10', percentage: 0 },
				]);
			} finally {
				setLoading(false);
			}
		};

		fetchUsageData();
	}, [user]);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval> | undefined;
		if (usageData.length > 0) {
			interval = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % usageData.length);
			}, 2500);
		}
		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [usageData, setCurrentIndex]);

	useEffect(() => {
		if (usageData.length > 0) {
			setPUsageData(usageData[currentIndex]);
		}
	}, [currentIndex, usageData]);

	if (loading) {
		return (
			<Card sx={{ color: 'text.primary', p: 2, borderRadius: 2, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<CircularProgress />
			</Card>
		);
	}

	if (!user?.id) {
		return <Card sx={{ p: 3, borderRadius: 2, height: '100%' }}><Typography>Please log in to view plan usage.</Typography></Card>;
	}

	if (!pUsageData) {
		return <Card sx={{ p: 3, borderRadius: 2, height: '100%' }}><Typography>No usage data available.</Typography></Card>;
	}

	return (
		<Card sx={{ color: 'text.primary', p: 3, borderRadius: 2, height: '100%' }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
				<ArrowBackIosIcon
					sx={{ color: 'grey.500', cursor: 'pointer' }}
					onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + usageData.length) % usageData.length)}
				/>
				<Box sx={{ textAlign: 'center' }}>
					<Typography variant="subtitle2" fontWeight="bold" mb={2}>
						Plan Usage
					</Typography>
					<Typography variant="h5" fontWeight="bold">
						{pUsageData.type}
					</Typography>
				</Box>
				<ArrowForwardIosIcon
					sx={{ color: 'grey.500', cursor: 'pointer' }}
					onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % usageData.length)}
				/>
			</Box>

			<PlanUsageModalChart value={pUsageData.value} limit_value={pUsageData.limit_value} percentage={pUsageData.percentage} />

			<Button
				variant="contained"
				fullWidth
				color="primary"
				sx={{ mt: 2, bgcolor: theme => theme.palette.primary.main, color: "text.primary" }}
				onClick={() => setOpen(true)}
			>
				View Usage
			</Button>
			<PlanUsageModal
				open={open}
				onClose={() => setOpen(false)}
				usageData={usageData}
			/>
		</Card>
	);
};

export default OverviewPlanUsage;
