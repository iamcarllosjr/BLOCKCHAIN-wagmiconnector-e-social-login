"use client"
import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SunMedium, BellDot, HelpCircle, GripHorizontal } from "lucide-react";

type AccountsProps = {
  accounts: string;
  setAccounts: any;
}

const Header = ({accounts, setAccounts}: AccountsProps) => {
  const isConnected = Boolean(accounts);

  useEffect(() => {
    getCurrentWallet();
    addWalletListener();
  });

  //function for connect Wallet
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* Metamask is Installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      /* Metamask is not installed */
      console.log("Please install Metamask");
    }
  };

  //function to keep the same account when reloading the page
  const getCurrentWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccounts(accounts[0]);
        } else {
          console.log("Connect to Metamask using the Connect Button ");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  //Function so that when disconnecting from the wallet, change the state of the button on the page
  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts: any[]) => {
        setAccounts(accounts[0]);
      });
    } else {
      /* Metamask is not installed */
      setAccounts("");
      console.log("Please connect to wallet address");
    }
  };

  return (
    <motion.header 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{ease: "easeIn", delay: 0.3}}
    className="flex md:justify-between sm:justify-around justify-center px-3 pt-3 w-full bg-trasparent backdrop-blur-sm">
      <div className="flex items-center gap-4 tracking-wider">
        <Link href="#home">
          {/* IMAGE */}
        </Link>

        <div className="lg:flex text-white gap-4 hidden">
          <Link href="#home" className="links">
            Home
          </Link>
          <Link href="#exchange" className="links">
            About
          </Link>
          <Link href="#liquidity" className="links">
            Team
          </Link>
          <Link href="orders" className="links">
            Features
          </Link>
        </div>
      </div>

      <div className="items-center gap-4 justify-center flex">
        {isConnected ? (
          <button className="button-neon">Connected</button>
        ) : (
          <button className="button-neon" onClick={connectWallet}>Connect to Wallet</button>
        )
        }
        
        <button className="icons">
          <SunMedium size={20} />
        </button>
        <button className="icons">
          <BellDot size={20} />
        </button>
        <button className="icons">
          <HelpCircle size={20} />
        </button>
        <button className="icons">
          <GripHorizontal size={20} />
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
