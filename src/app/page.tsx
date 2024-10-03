"use client";

import { type OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { getNftsForOwner } from "utils/alchemy-sdk-script";
import NftCard from "./components/NftCard";

export default function HomePage() {
  const [address, setAddress] = useState("vitalik.eth"); // Dirección por defecto
  const [nfts, setNfts] = useState<OwnedNft[]>([]); // NFTs obtenidos
  const [defNfts, setDefNfts] = useState<OwnedNft[]>([]);

  const [nftNumber, setNftNumber] = useState<string>("");
  const [collectionName, setCollectionName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  // Efecto que carga los NFTs de la dirección por defecto al montar el componente
  useEffect(() => {
    void fetchNFTs(address);
  }, [address]);

  // Función para buscar los NFTs de una dirección que se le pase en este caso vitalik.eth
  const fetchNFTs = async (address: string) => {
    const nftsRequest: OwnedNft[] = await getNftsForOwner(address);
    setNfts(nftsRequest);
  };

  useEffect(() => {
    const filteredNfts = nfts.filter((nft) => {
      const matchesNumber = nft.tokenId.includes(nftNumber);
      const matchesCollection = nft.contract?.name
        ?.toLowerCase()
        .includes(collectionName.toLowerCase());
      const matchesDate = nft.timeLastUpdated >= date;

      return matchesNumber && matchesCollection && matchesDate;
    });
    setDefNfts(filteredNfts);
  }, [nftNumber, collectionName, date, nfts]);

  const handleFormAllFilters = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value, name } = event.target;
    if (name === "nftNumber") {
      setNftNumber(value);
    }
    if (name === "collectionName") {
      setCollectionName(value);
    }
    if (name === "date") {
      setDate(value);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-3xl font-bold">NFT Explorer</h1>

      {/* Formulario de búsqueda */}
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-2/3 rounded border p-2"
          placeholder="Enter wallet address"
        />
        <input
          type="text"
          placeholder="NFT Number"
          value={nftNumber}
          name="nftNumber"
          onChange={handleFormAllFilters}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Collection Name"
          value={collectionName}
          name="collectionName"
          onChange={handleFormAllFilters}
          className="border p-2"
        />
        <input
          type="date"
          value={date}
          name="date"
          onChange={handleFormAllFilters}
          className="border p-2"
        />
      </form>

      {/* Listado de NFTs */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        {defNfts.map((nft, index) => (
          <NftCard key={nft.contract.address + index} nft={nft} />
        ))}
      </div>
    </div>
  );
}
