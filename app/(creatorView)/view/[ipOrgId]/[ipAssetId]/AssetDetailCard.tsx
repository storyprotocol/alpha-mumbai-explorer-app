import React, { Suspense } from 'react';
import Link from 'next/link';
import { cn } from '@/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { addHTTPSPrefix } from '@/utils/urlUtils';
import { IPAsset } from '@story-protocol/core-sdk';
import AssetDisplayComponent from './AssetDisplayComponent';

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => {
  return (
    <div className="py-4 sm:grid sm:grid-cols-5 sm:gap-4">
      <dt className="text-sm font-bold leading-6 text-[#444] dark:text-gray-300">{label}</dt>
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

type Author = {
  name: string;
  percentage: number;
};
type Tag = {
  key: string;
  value: string | number | boolean;
};
type MagmaMetaData = {
  authors: Author[];
  description: string;
  mediaUrl: string;
  origin: string;
  originUrl: string;
  tags: Tag[];
};
const AssetDetailComponent = async ({ ipAsset }: AssetDetailCardProps) => {
  let assetInfo = {
    authors: [],
    description: '',
    mediaUrl: '',
    origin: '',
    originUrl: '#',
    tags: [],
  } as MagmaMetaData;

  if (ipAsset.mediaUrl) {
    let resp;
    try {
      resp = await fetch(ipAsset.mediaUrl);
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }

    const contentType = resp.headers.get('content-type');

    if (contentType?.endsWith('/json')) {
      const d = await resp.json();
      assetInfo = {
        authors: d.authors?.sort((a: Author, b: Author) => b.percentage - a.percentage) || [],
        description: d.description || '',
        mediaUrl: d.mediaUrl || '',
        origin: d.origin || '',
        originUrl: d.originUrl || '#',
        tags: d.tags || [],
      };
    }
  }

  return (
    <>
      <Row label="Name">
        <span className="truncate">{ipAsset.name}</span>
      </Row>

      <Row label={`Author${assetInfo.authors.length > 1 ? 's' : ''}`}>
        <div className="flex flex-col">
          {assetInfo.authors.length === 1 && (
            <p key={`author_0_${assetInfo.authors[0]?.name}`} className="text-[$444] font-normal">
              {assetInfo.authors[0]?.name}
            </p>
          )}
          {assetInfo.authors.length > 1 &&
            assetInfo.authors.map((author, i) => (
              <p
                key={`author_${i}_${author.name}`}
                className="text-[#444] font-normal mb-3"
              >{`${author.name} (${author.percentage}%)`}</p>
            ))}
        </div>
      </Row>

      <Row label="Description">
        <p className="truncate">{assetInfo.description}</p>
      </Row>

      <Row label="Source">
        <div className="flex w-full">
          <span className="truncate">{assetInfo.origin}</span>
          <div className="w-[90px] leading-6 ml-3 text-white text-[11px] font-normal text-center bg-[rgba(85,56,206,1)] rounded-full">
            <Link target="_blank" href={addHTTPSPrefix(assetInfo.originUrl)}>
              View Original
            </Link>
          </div>
        </div>
      </Row>

      <Row label="tags">
        <div className="flex overflow-x-auto">
          {assetInfo.tags.map((tag, i) => (
            <div
              key={i}
              className="flex flex-shrink-0 flex-col w-[118px] bg-white content-center px-2 py-[7px] border mr-[6px] mb-2 rounded-xl"
            >
              <p className="text-center text-[10.691px] text-[#444]">{tag.key}</p>
              <p className="text-center text-[10.691px] text-[#444] leading-">{tag.value}</p>
            </div>
          ))}
        </div>
      </Row>
    </>
  );
};
type AssetDetailCardProps = {
  ipAsset: IPAsset;
};
export default function AssetDetailCard({ ipAsset }: AssetDetailCardProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      <AssetDisplayComponent data={ipAsset} />
      <div className="flex h-full border rounded-xl col-span-12 xl:col-span-7">
        <div className={cn('relative rounded-xl py-2 bg-[rgb(253,253,253)] dark:bg-[#2C2B35] w-full')}>
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="font-medium md:text-xl">Details</h1>
          </div>
          <div className="border-t px-6 py-4 border-gray-200 dark:border-gray-900">
            <Suspense fallback={<Fallback />}>
              <AssetDetailComponent ipAsset={ipAsset} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
