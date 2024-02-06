import { Url } from 'next/dist/shared/lib/router/router';
import { parse } from 'url';

export const DEFAULT_IFPS_GATEWAY = 'https://cloudflare-ipfs.com/ipfs/';
export const DEFAULT_ARWEAVE_GATE_WAY = 'https://arweave.net/';

export function addHTTPSPrefix(url: Url): Url {
  const urlObj = parse(url.toString().trim());
  if (!urlObj.protocol) {
    return `https://${url}`;
  }
  return url;
}

export function convertToPreviewUrl(url: string): string {
  const arweaveScheme = /^ar:\/\//i;
  const ipfsScheme = /^ipfs:\/\//i;
  const arweaveGateway = process.env.ARWEAVE_GATEWAY || DEFAULT_ARWEAVE_GATE_WAY;
  const ipfsGateway = process.env.IPFS_GATEWAY || DEFAULT_IFPS_GATEWAY;
  if (arweaveScheme.test(url?.trim())) {
    return url.replace(arweaveScheme, arweaveGateway);
  }
  if (ipfsScheme.test(url?.trim())) {
    return url.replace(ipfsScheme, ipfsGateway);
  }
  return url;
}
