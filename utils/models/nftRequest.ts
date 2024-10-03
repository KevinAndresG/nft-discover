export interface NFTRequest {
  contract: Contract;
  tokenId: string;
  tokenType: string;
  name: null;
  description: null;
  tokenUri: string;
  image: Image;
  raw: Raw;
  collection: Collection;
  mint: Mint;
  owners: null;
  timeLastUpdated: Date;
  balance: string;
  acquiredAt: AcquiredAt;
}

export interface AcquiredAt {
  blockTimestamp: null;
  blockNumber: null;
}

export interface Collection {
  name: string;
  slug: string;
  externalUrl: string;
  bannerImageUrl: string;
}

export interface Contract {
  address: string;
  name: string;
  symbol: string;
  totalSupply: null;
  tokenType: string;
  contractDeployer: string;
  deployedBlockNumber: number;
  openSeaMetadata: OpenSeaMetadata;
  isSpam: boolean;
  spamClassifications: string[];
}

export interface OpenSeaMetadata {
  floorPrice: null;
  collectionName: string;
  collectionSlug: string;
  safelistRequestStatus: string;
  imageUrl: string;
  description: string;
  externalUrl: string;
  twitterUsername: null;
  discordUrl: null;
  bannerImageUrl: string;
  lastIngestedAt: Date;
}

export interface Image {
  cachedUrl: null;
  thumbnailUrl: null;
  pngUrl: null;
  contentType: null;
  size: null;
  originalUrl: null;
}

export interface Mint {
  mintAddress: null;
  blockNumber: null;
  timestamp: null;
  transactionHash: null;
}

export interface Raw {
  tokenUri: string;
  metadata: unknown;
  error: null;
}
