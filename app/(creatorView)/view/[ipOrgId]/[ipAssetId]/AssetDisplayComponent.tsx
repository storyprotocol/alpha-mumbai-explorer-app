'use client';
import React from 'react';
import Image from 'next/image';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { getRoundedTime } from '@/utils';
import { AssetDetailCardProps } from './types';

export default function AssetDisplayComponent({ ipAsset, assetInfo }: AssetDetailCardProps) {
  return (
    <div className="flex h-52 md:h-72 xl:h-full col-span-12 xl:col-span-5 rounded-xl bg-indigo-100 overflow-hidden justify-center items-center">
      {assetInfo ? (
        <Image
          width={700}
          height={600}
          alt={ipAsset.name}
          loading="lazy"
          decoding="async"
          data-nimg="1"
          src={`${assetInfo.mediaUrl}?date=${getRoundedTime(15)}`}
          unoptimized
        />
      ) : (
        <PuzzlePieceIcon className="w-20 h-20 text-indigo-500" />
      )}
    </div>
  );
}
