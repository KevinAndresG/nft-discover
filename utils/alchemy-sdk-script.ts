import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: "demo",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const getNftsForOwner = async (address: string) => {
  try {
    const nftsForOwner = await alchemy.nft.getNftsForOwner(address);
    return nftsForOwner.ownedNfts;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
};

//  Función para obtener los metadatos de un NFT por su contyract y tokenId.
//  poodria hacer la implementacion en cada tarjeta o en el home para enviar solo la metadata y no el objeto entero
export const getNftMetadata = async (
  contractAddress: string,
  tokenId: string,
) => {
  try {
    const response = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
    return response;
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    return null;
  }
};
