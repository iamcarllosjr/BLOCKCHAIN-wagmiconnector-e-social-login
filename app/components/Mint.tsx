"use client";
import Image from "next/image";
import Rabbit from "../../../public/evil-rabbit-2.png";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import LegionOfRabbits from "./utils/ABI.json";

type MintProps = {
  accounts: string;
};

const legionOfRabbitsAddress = "0x8FeB148B4F50aCb7311c1f17CE0404aC69B90a68";

const Mint = ({ accounts }: MintProps) => {
  const isConnected = Boolean(accounts);
  const mintAmount = 1;

  const handleMint = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const mintNFT = new ethers.Contract(
          legionOfRabbitsAddress,
          LegionOfRabbits.abi,
          signer
        );

        const mintTxn = await mintNFT.safeMint(mintAmount);

        alert("Mintagem em processo, aguarde um momento");

        await mintTxn.wait();
        const minted = mintTxn.hash;
        alert(`NFT mintado, confira o hash ${minted}`);

        console.log("NFT mintado, confira o hash", mintTxn.hash);
      }
    } catch (error) {
      alert("Você excedeu o limite permitido por Wallet");
    }
  };
  return (
    <>
      {isConnected ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", delay: 0.5 }}
          className="flex items-center justify-center pt-24"
        >
          <div className="w-1/2 h-auto bg-tranparent rounded-lg shadow-neon backdrop-blur-sm p-7">
            <div className="flex items-center justify-center gap-3">
              <div className="items-center hidden sm:inline-flex ">
                <Image
                  width={250}
                  src={Rabbit}
                  alt="Rabbit"
                  className="hover:scale-110 transition-all duration-300"
                ></Image>
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-white text-2xl text-center tracking-wider font-semibold">
                  Legion Of Rabbits is a new coletion in Web3.
                </h1>
                <button onClick={handleMint} className="button-mint">MINT NOW</button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", delay: 0.6 }}
          className="mt-[70px] gap-1 flex items-center justify-center text-center text-3xl tracking-wider text-white font-bold"
        >
          <span className="bg-[#3a2682] p-1"> You must be</span>
          connected to mint
        </motion.p>
      )}
    </>
  );
};

export default Mint;
