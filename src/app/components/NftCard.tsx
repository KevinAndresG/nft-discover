"use client";

import { type OwnedNft } from "alchemy-sdk";
// import Image from "next/image";
import React from "react";
interface NftCardProps {
  nft: OwnedNft;
}
const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  return (
    <div className="rounded-lg bg-white p-4 shadow-lg">
      <img
        width={120}
        height={120}
        src={nft.image.thumbnailUrl ?? "/nft-placeholder.svg"}
        alt={nft.name ?? "NFT"}
        className="object-cover"
      />
      <h2 className="mt-2 w-1/2 truncate text-lg font-bold">{nft.name}</h2>
      <p className="w-1/2 truncate">
        Collection: {nft.contract.name ?? "Unknown"}
      </p>
      <p className="w-1/2 truncate text-sm">Token ID: {nft.tokenId}</p>
    </div>
  );
};

export default NftCard;
