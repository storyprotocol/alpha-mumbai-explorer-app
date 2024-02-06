import { Suspense } from 'react';
import storyClient from '@/lib/SP';

import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AssetDetailCard, { Fallback as FallbackDetailsCard } from './AssetDetailCard';
import LicenseDataViewer from './LicenseDataViewer';

import { Metadata } from 'next';
import { convertToPreviewUrl } from '@/utils/urlUtils';

type Params = {
  ipAssetId: string;
  ipOrgId: string;
};
type Props = {
  params: Params;
};

export async function generateMetadata({ params: { ipAssetId } }: Props): Promise<Metadata> {
  const { ipAsset } = await storyClient.ipAsset.get({ ipAssetId });
  type MediaInfo = {
    mediaUrl: string;
    description: string;
  };
  const resp = await fetch(ipAsset.mediaUrl);
  const result = (await resp.json()) as MediaInfo;
  const { mediaUrl, description } = result;

  return {
    title: `Story Protocol - ${ipAsset.name}`,
    openGraph: {
      title: `Story Protocol - ${ipAsset.name}`,
      description: description,
      images: [convertToPreviewUrl(mediaUrl)],
    },
  };
}

export default async function AssetDetailPage({ params: { ipAssetId } }: { params: Params }) {
  const { ipAsset } = await storyClient.ipAsset.get({ ipAssetId });

  return (
    <div className="flex flex-col w-full ">
      <div className="flex shrink-0 pt-6">
        <img className="ml-8 h-6 max-w-20" src="/story_logo.svg" alt="Story Protocol" />
      </div>
      <div className="flex px-10 py-9 w-full max-w-[1280px] flex-col items-left gap-6 mx-auto">
        <div className="flex flex-row gap-4 items-center mb-3">
          <h1 className="text-[26px] leading-2xl font-bold leading-none">{ipAsset.name}</h1>
        </div>
        <Suspense fallback={<FallbackDetailsCard />}>
          <AssetDetailCard ipAsset={ipAsset} />
        </Suspense>

        <div className="grid grid-cols-12 gap-6">
          <div className="flex col-span-12">
            <Tabs defaultValue="licenses" className="w-full">
              <TabsList>
                <TabsTrigger value="licenses">Licenses</TabsTrigger>
              </TabsList>
              <TabsContent value="licenses">
                <Suspense fallback={<SkeletonTable />}>
                  <LicenseDataViewer orgID={ipAsset.ipOrgId} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
