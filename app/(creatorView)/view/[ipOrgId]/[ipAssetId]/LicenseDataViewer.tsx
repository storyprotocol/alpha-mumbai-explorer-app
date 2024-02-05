type License = {
  title: string,
  usage: string,
  scope: string,
  duration: string,
  durationType: string,
  additional: string,
  additionalRightType: string,
};

const getLicenseByOrgID = (id: string | undefined): License => {
  switch (id) {
    case '0x01d046141B0368B31C1e4a6AC43BD24AD1a21769':
      return {} as License
    case '0x588AE01213C3B30bB5F7EA2155260a5Ea575174c':
      // fall-through
    default:
      return {
        title: 'Non-Commercial License',
        usage: 'License is valid for worldwide adaptation.',
        scope: 'Global',
        duration: 'License has no expiration date and continues indefinitely.',
        durationType: 'Perpetual',
        additional: 'Licensee can distribute the adapted movie to theaters, streaming platforms, and other distribution channels.',
        additionalRightType: 'Distribution',
      } as License;
  }
}

type LicenseDataViewerProps = {
  orgID: string
}
const LicenseDataViewer = ({ orgID }: LicenseDataViewerProps) => {
    const licenseData: License = getLicenseByOrgID(orgID);
    return <div className='border rounded-xl px-7 py-8 bg-[rgb(253,253,253)]'>
      <h1 className='leading-8 mb-12 text-xl sm:text-[26px] max-[360px]:text-[16px] max-[360px]:font-bold font-sans'>{licenseData.title}</h1>
      <div className="" >
        <div className="flex leading-[153%]">
          <h2 className="flex w-32 text-[#444] text-sm font-bold">Usage Scope</h2><div className='sm:ml-28 ml-16 mb-12 w-96'><strong className="font-bold text-sm">{licenseData.scope}:</strong> <span>{licenseData.usage}</span></div>
        </div>
        <div className="flex leading-[153%]">
          <h2 className="flex w-32 text-[#444] text-sm font-bold">License Duration</h2><div className='sm:ml-28 ml-16 mb-12 w-96'><strong className="font-bold text-sm">{licenseData.durationType}:</strong> <span>{licenseData.duration}</span></div>
        </div>
        <div className="flex leading-[153%]">
          <h2 className="flex w-32 text-[#444] text-sm font-bold">Additional Rights</h2><div className='sm:ml-28 ml-16 mb-12 w-96'><strong className="font-bold text-sm">{licenseData.additionalRightType}:</strong> <span>{licenseData.additional}</span></div>
        </div>
      </div>
    </div>
};

export default LicenseDataViewer;
