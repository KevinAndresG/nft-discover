"use client";

import { type OwnedNft } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { getNftsForOwner } from "utils/alchemy-sdk-script";
import NftCard from "./components/NftCard";
import { type NftData } from "utils/models/nftRequest";

export default function HomePage() {
  const [address, setAddress] = useState("vitalik.eth"); // Dirección por defecto
  const [nfts, setNfts] = useState<OwnedNft[]>([]); // NFTs obtenidos
  const [defNfts, setDefNfts] = useState<OwnedNft[]>([]);

  const [nftNumber, setNftNumber] = useState<string>("");
  const [collectionName, setCollectionName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [noSpam, setNoSpam] = useState(false);
  const [nftFullData, setNftFullData] = useState(0);

  // Efecto que carga los NFTs de la dirección por defecto al montar el componente
  useEffect(() => {
    void fetchNFTs(address, false);
  }, [address]);

  // Función para buscar los NFTs de una dirección que se le pase en este caso vitalik.eth
  const fetchNFTs = async (address: string, noSpam: boolean) => {
    const nftsForOwner: NftData = await getNftsForOwner(address, noSpam);
    setNftFullData(nftsForOwner.totalNfts);
    setNfts(nftsForOwner.nftsForOwner);
  };

  const filterSpam = async () => {
    await fetchNFTs(address, !noSpam);
    setNoSpam(!noSpam);
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
    console.log("filteredNfts: ", filteredNfts);
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
        <div className="flex space-x-4">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-2/3 rounded border p-2 shadow-md outline-none focus:border-cyan-600"
            placeholder="Enter wallet address"
          />
          <button
            className="w-2/6 rounded border border-gray-300 bg-gray-200 p-2 shadow-md transition-colors duration-200 hover:bg-gray-300"
            type="button"
            onClick={filterSpam}
          >
            Filter Spam: {noSpam ? "ON" : "OFF"}
          </button>
        </div>
        <input
          type="text"
          placeholder="NFT Number"
          value={nftNumber}
          name="nftNumber"
          onChange={handleFormAllFilters}
          className="border p-2 shadow-md outline-none focus:border-cyan-600"
        />
        <input
          type="text"
          placeholder="Collection Name"
          value={collectionName}
          name="collectionName"
          onChange={handleFormAllFilters}
          className="border p-2 shadow-md outline-none focus:border-cyan-600"
        />
        <input
          type="date"
          value={date}
          name="date"
          onChange={handleFormAllFilters}
          className="border p-2 shadow-md outline-none focus:border-cyan-600"
        />
      </form>

      {/* Listado de NFTs */}
      <p className="my-4 text-center text-sm">
        NFTS {defNfts.length} / {nftFullData}
      </p>
      {defNfts.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {defNfts.map((nft, index) => (
            <NftCard key={nft.contract.address + index} nft={nft} />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-center text-sm">No NFTs found</p>
      )}
    </div>
  );
}
