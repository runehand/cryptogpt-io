import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

import { useMetaMask } from 'src/hooks/use-metamask';

// Define token addresses (use mainnet addresses)
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const CRGPT_ADDRESS = '0x50739bd5b6aff093ba2371365727c48a420a060d'
const DOT_ADDRESS = '0x7083609fce4d1d8dc0c979aab8c869ea2c873402'
const AVAX_ADDRESS = '0x85f138bfEE4ef8e540890CFb48F620571d67Eda3'
const SOL_ADDRESS = '0xD31a59c85aE9D8edEFeC411D448f90841571b89c'

// ABI for ERC20 token balance
const ERC20_ABI = [
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)',
];

export function useTokenBalances() {
    const { currentAccount, provider } = useMetaMask();
    const [balances, setBalances] = useState({
        eth: '0',
        usdt: '0',
        usdc: '0',
        crgpt: '0',
        dot: '0',
        sol: '0',
        avax: '0',
    });

    useEffect(() => {
        const fetchBalances = async () => {
            if (!currentAccount || !provider) return;

            const ethersProvider = new ethers.BrowserProvider(provider);
            const signer = await ethersProvider.getSigner();

            // Fetch ETH balance
            const ethBalance = await ethersProvider.getBalance(currentAccount);
            const formattedEthBalance = ethers.formatEther(ethBalance);

            // Function to fetch ERC20 token balance
            const getTokenBalance = async (tokenAddress) => {
                const contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
                const balance = await contract.balanceOf(currentAccount);
                const decimals = await contract.decimals();
                return ethers.formatUnits(balance, decimals);
            };

            // Fetch token balances
            const [usdt, usdc, crgpt, dot, sol, avax] = await Promise.all([
                getTokenBalance(USDT_ADDRESS).catch(() => '0'),
                getTokenBalance(USDC_ADDRESS).catch(() => '0'),
                getTokenBalance(CRGPT_ADDRESS).catch(() => '0'),
                getTokenBalance(DOT_ADDRESS).catch(() => '0'),
                getTokenBalance(SOL_ADDRESS).catch(() => '0'),
                getTokenBalance(AVAX_ADDRESS).catch(() => '0'),
            ]);

            setBalances({
                eth: formattedEthBalance,
                usdt,
                usdc,
                crgpt,
                dot,
                sol,
                avax,
            });
        };

        fetchBalances();
    }, [currentAccount, provider]);

    return balances;
}