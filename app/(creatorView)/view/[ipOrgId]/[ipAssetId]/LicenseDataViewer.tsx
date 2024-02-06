type License =
  | {
      title: string;
      usage: string;
      scope: string;
      duration: string;
      durationType: string;
      additional: string;
      additionalRightType: string;
    }
  | undefined;
type ID = typeof NON_COMMERCIAL_LICENSE_ID;
export const NON_COMMERCIAL_LICENSE_ID = '0x01d046141b0368b31c1e4a6ac43bd24ad1a21769';
export const COMMERCIAL_LICENSE_ID = '0x588ae01213c3b30bb5f7ea2155260a5ea575174c';

// eslint-disable-next-line no-unused-vars
type LicenseMap = { [K in ID]: License };
const licenseTemplateMap: LicenseMap = {
  [NON_COMMERCIAL_LICENSE_ID]: {
    title: 'Non-Commercial License',
    usage: 'License is valid for worldwide adaptation.',
    scope: 'Global',
    duration: 'License has no expiration date and continues indefinitely.',
    durationType: 'Perpetual',
    additional:
      'Licensee can distribute the adapted movie to theaters, streaming platforms, and other distribution channels.',
    additionalRightType: 'Distribution',
  },
};
const getLicenseByOrgID = (id: ID | undefined): License | undefined => licenseTemplateMap[id?.toLowerCase() as ID];

type LicenseDataViewerProps = {
  orgID: string;
};
const LicenseDataViewer = ({ orgID }: LicenseDataViewerProps) => {
  const licenseData: License = getLicenseByOrgID(orgID as ID);
  if (!licenseData) return <p className="mx-8 mt-4">No licenses found for this IP Asset</p>;
  return (
    <div className="border rounded-xl px-7 py-8 bg-[rgb(253,253,253)]">
      <h1 className="leading-8 mb-8 text-xl md:text-[26px] font-sans font-medium">{licenseData.title}</h1>
      <div>
        <div className="flex md:flex-row flex-col leading-[153%]">
          <h2 className="flex w-32 mb-3 text-[#444] text-sm font-bold">Usage Scope</h2>
          <div className="md:ml-16 ml-0 mb-10 max-w-96">
            <strong className="font-bold text-sm">{licenseData.scope}:</strong>
            <span> {licenseData.usage}</span>
          </div>
        </div>
        <div className="flex md:flex-row flex-col leading-[153%]">
          <h2 className="flex w-32 mb-3 text-[#444] text-sm font-bold">License Duration</h2>
          <div className="md:ml-16 ml-0 mb-10 max-w-96">
            <strong className="font-bold text-sm">{licenseData.durationType}:</strong>
            <span> {licenseData.duration}</span>
          </div>
        </div>
        <div className="flex md:flex-row flex-col leading-[153%]">
          <h2 className="flex w-32 mb-3 text-[#444] text-sm font-bold">Additional Rights</h2>
          <div className="md:ml-16 ml-0 mb-10 max-w-96">
            <strong className="font-bold text-sm">{licenseData.additionalRightType}:</strong>
            <span> {licenseData.additional}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseDataViewer;
