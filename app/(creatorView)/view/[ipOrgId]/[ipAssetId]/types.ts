export type Params = {
  ipAssetId: string;
  ipOrgId: string;
};
export type Props = {
  params: Params;
};

export type Author = {
  name: string;
  percentage: number;
};
export type Tag = {
  key: string;
  value: string | number | boolean;
};
export type MagmaMetaData = {
  artworkName: string;
  description: string;
  authors: Author[];
  licenseParam: {
    isCommercial: boolean;
  };
  mediaUrl: string;
  origin: string;
  originUrl: string;
  tags: Tag[];
};
