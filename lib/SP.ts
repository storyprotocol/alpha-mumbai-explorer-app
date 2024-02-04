'use client';
import { StoryClient, StoryConfig } from '@story-protocol/core-sdk';
import { privateKeyToAccount } from 'viem/accounts';
import { Hex, http } from 'viem';
import { polygonMumbai } from 'wagmi/chains';

const config: StoryConfig = {
  chain: polygonMumbai,
  transport: http(process.env.RPC_PROVIDER_URL),
  account: privateKeyToAccount(process.env.WALLET_PRIVATE_KEY as Hex),
};

const storyClient = StoryClient.newClient(config);

export default storyClient;
