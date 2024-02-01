'use client'
import React, { useState, useEffect } from 'react';
import { cn } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';

import { IPAsset } from '@story-protocol/core-sdk';
import AssetDisplayComponent from './AssetDisplayComponent';
import Link from 'next/link';

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-5 sm:gap-4">
      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">{label}</dt>
      <dd className="relative w-full truncate mt-1 flex items-center space-x-2 text-sm leading-6 text-gray-700 dark:text-gray-200 sm:col-span-4 sm:mt-0">
        {children}
      </dd>
    </div>
  );
};

const FallbackRow = ({ label }: { label: string }) => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-5 sm:gap-4">
      <dt className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-300">{label}</dt>
      <Skeleton className="relative w-72 mt-1 flex space-x-2 h-6 sm:col-span-4 sm:mt-0" />
    </div>
  );
};

export const Fallback = () => (
  <div className={cn('relative rounded-xl px-6 py-2 bg-[#FFFFFF] dark:bg-[#2C2B35] w-full')}>
    <div className="flex items-center justify-between py-4">
      <Skeleton className="w-[100px] h-8" />
    </div>
    <div className="border-t py-4 border-gray-200 dark:border-gray-900">
      <FallbackRow label="Name" />
      <FallbackRow label="Author(s)" />
      <FallbackRow label="Description" />
      <FallbackRow label="Source" />
      <FallbackRow label="AI Assisted" />
    </div>
  </div>
);

type AssetDetailCardProps = {
  ipAsset: IPAsset
}
type Author = {
  name: string
  portion: number
}
type MagmaMetaData = {
  author: Author[]
  description: string
  mediaUrl: string
  origin: string
  originUrl: string
}
export default function AssetDetailCard({ ipAsset }: AssetDetailCardProps) {
  const [assetInfo, setAssetInfo] = useState({
    author: [],
    description: '',
    mediaUrl: '',
    origin: '',
    originUrl: '#'
  } as MagmaMetaData);
  useEffect(() => {
    if (ipAsset.mediaUrl) {
      fetch(ipAsset.mediaUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const contentType = response.headers.get('content-type');
          if (contentType?.startsWith('image/')) {
            return true;
          }
          return response.json();
        })
        .then((d) => {
          if (d === true) {
            return
          }
          setAssetInfo({
            author: d.author || [],
            description: d.description || '',
            mediaUrl: d.mediaUrl || '',
            origin: d.origin || '',
            originUrl: d.originUrl || '#'
          })
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [ipAsset.mediaUrl]);
  return (
    <div className="grid grid-cols-12 gap-6">
      <AssetDisplayComponent data={ipAsset} />
      <div className="flex h-full border rounded-xl col-span-12 xl:col-span-7">
        <div className={cn('relative rounded-xl py-2 bg-[#FFFFFF] dark:bg-[#2C2B35] w-full')}>
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="font-medium md:text-2xl">Details</h1>
          </div>
          <div className="border-t px-6 py-4 border-gray-200 dark:border-gray-900">
            <Row label="Name">
              <span className="truncate">{ipAsset.name}</span>
            </Row>

            <Row label="Author(s)">
              <div className='flex'>
                {assetInfo.author.map((author, i) => <p key={`author_${i}_${author.name}`}>{`${author.name} ${author.portion}%`}</p>)}
              </div>
            </Row>

            <Row label="Description">
              <p className="truncate" >{assetInfo.description}</p>
            </Row>

            <Row label="Source">
              <div>
                <span className="truncate font-mono text-gray-500">{assetInfo.origin}</span>
                <div className='text-white text-xs py-1 px-3 bg-[rgba(85,56,206,1)] rounded-full'><Link href={assetInfo.originUrl} >View Original</Link></div>
              </div>
            </Row>

            <Row label="AI Assisted">
              <span className="truncate font-mono text-gray-500">No</span>
            </Row>

          </div>
        </div>
      </div>
    </div>
  );
}
