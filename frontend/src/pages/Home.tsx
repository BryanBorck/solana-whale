import { useEffect, useState } from 'react';
import {
    useConnection, 
    useWallet
} from "@solana/wallet-adapter-react";
import {
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Home() {

    const [balance, setBalance] = useState(0);
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    useEffect(() => {
        if (!connection || !publicKey) {
        return;
        }

        connection.onAccountChange(
        publicKey,
        (updatedAccountInfo) => {
            setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
        },
        "confirmed",
        );

        connection.getAccountInfo(publicKey).then((info) => {
        if (info) {
            setBalance(info.lamports);
        }
        });
    }, [connection, publicKey]);

    return (
        <>
            <WalletMultiButton />
            <div className='w-[100%] h-24 bg-red-600 text-black'>
            <p>{publicKey ? `Balance: ${balance / LAMPORTS_PER_SOL} SOL` : "aaa"}</p>
            </div>
        </>
    );
};