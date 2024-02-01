import storyClient from '@/lib/SP';
import React from 'react';
import { ListLicenseResponse } from '@story-protocol/core-sdk';
import IPOrgLicenseDataViewerComponent from './IPOrgLicenseDataViewerComponent';

export default async function IPOrgLicenseDataViewerWrapper({
  ipOrgId,
  ipAssetId,
  // tableOnly,
  // gridOnly,
  pageSize,
  hardcoded,
}: {
  ipOrgId?: string;
  ipAssetId?: string;
  tableOnly?: boolean;
  gridOnly?: boolean;
  pageSize?: number;
  hardcoded?: boolean;
}) {
  if (hardcoded) {
    const licenseData = {
      title: 'Non-Commercial License',
      usage: 'License is valid for worldwide adaptation.',
      scope: 'Global',
      duration: 'License has no expiration date and continues indefinitely.',
      durationType: 'Perpetual',
      additional: 'Licensee can distribute the adapted movie to theaters, streaming platforms, and other distribution channels.',
      additionalRightType: 'Distribution',
    }
    return <div>
      <h1 className='leading-8 mb-12 text-2xl'>{licenseData.title}</h1>
      <div>
        <div className="flex">
          <h2 className="flex w-32">Usage Scope</h2><div className='ml-28 mb-12 w-96'><strong>{licenseData.scope}:</strong> <span>{licenseData.usage}</span></div>
        </div>
        <div className="flex">
          <h2 className="flex w-32">License Duration</h2><div className='ml-28 mb-12 w-96'><strong>{licenseData.durationType}:</strong> <span>{licenseData.duration}</span></div>
        </div>
        <div className="flex">
          <h2 className="flex w-32">Additional Rights</h2><div className='ml-28 mb-12 w-96'><strong>{licenseData.additionalRightType}:</strong> <span>{licenseData.additional}</span></div>
        </div>
      </div>
    </div>
  } 
  try {
    const data: ListLicenseResponse = await storyClient.license.list({ ipOrgId, ipAssetId });
    const licensesData = data?.licenses;

    if (licensesData.length === 0) {
      if (ipAssetId && !ipOrgId) return <div className="mx-8 mt-4">No licenses found for this IP Asset</div>;
      if (!ipAssetId && ipOrgId) return <div className="mx-8 mt-4">No licenses found for this IP Org</div>;
      if (ipAssetId && ipOrgId) return <div className="mx-8 mt-4">No licenses found</div>;
    }

    return (
      <IPOrgLicenseDataViewerComponent
        data={licensesData}
        tableOnly={true}
        // tableOnly={tableOnly}
        // gridOnly={gridOnly}
        pageSize={pageSize}
      />
    );
  } catch (e) {
    console.log('Error:', e);
    return <div>Something went wrong. Unable to fetch licenses.</div>;
  }
}
