"use client"
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import Mint from '@/app/components/Mint';
import { useState } from 'react';

export default function Home() {
  const [accounts, setAccounts] = useState("");

  return (
    <main className='h-screen bg-[url(../../public/planet-02.png)] bg-bottom bg-cover'>
        <div className='h-[88vh]'>
        <Header accounts={accounts} setAccounts={setAccounts} />
        <Mint accounts={accounts} />
        </div>
        <Footer />
    </main>
  )
}
