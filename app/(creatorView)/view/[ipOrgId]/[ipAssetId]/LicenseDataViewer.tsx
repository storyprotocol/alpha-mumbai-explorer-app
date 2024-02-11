import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

type License =
  | {
      title: string;
      description: string;
      canDo: string[];
      cantDo: string[];
    }
  | undefined;
type ID = typeof NON_COMMERCIAL_LICENSE_ID | typeof COMMERCIAL_LICENSE_ID;
export const NON_COMMERCIAL_LICENSE_ID = '0x01d046141b0368b31c1e4a6ac43bd24ad1a21769';
export const COMMERCIAL_LICENSE_ID = '0x588ae01213c3b30bb5f7ea2155260a5ea575174c';

// eslint-disable-next-line no-unused-vars
type LicenseMap = { [K in ID]: License };
const licenseTemplateMap: LicenseMap = {
  [NON_COMMERCIAL_LICENSE_ID]: {
    title: 'Social Remixing',
    description:
      'Let the world build on the creation. This license allows for endless free remixing while tracking all the uses of the work and giving you full credit.',
    canDo: [
      'Remix this work',
      'Include this in your own work(s)',
      'Must credit the creator appropriately',
      'Distribute your remix anywhere',
    ],
    cantDo: ['Resell this original work', 'Commercialize the remix', 'Claim credit for your remix as an original work'],
  },
  [COMMERCIAL_LICENSE_ID]: {
    title: 'Commercial Activity',
    description:
      'Retain control over use of the work, while allowing anyone to appropriately use the work for economic terms you set',
    canDo: ['Purchase the right to use', 'Credit the creator', 'Display or publish the work in any medium'],
    cantDo: [
      'Claim the work as your own',
      'Create remixes (or other compositions based on this work)',
      'Resell this work',
    ],
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
      <div className="mb-8">
        <h1 className="leading-8 text-xl mb-2 md:text-[26px] font-sans font-medium">{licenseData.title}</h1>
        <p className="text-sm">{licenseData.description}</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col">
          <h2 className="flex mb-3 text-[#444] lg:text-lg text-md font-medium">Others may:</h2>
          <ul>
            {licenseData.canDo.map((item, index) => (
              <li key={index} className="text-sm flex flex-row gap-1 items-start mb-1">
                <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <h2 className="flex mb-3 text-[#444] lg:text-lg text-md font-medium">Others may not:</h2>
          <ul>
            {licenseData.cantDo.map((item, index) => (
              <li key={index} className="text-sm flex flex-row gap-1 items-start mb-1">
                <XMarkIcon className="w-5 h-5 text-red-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LicenseDataViewer;
