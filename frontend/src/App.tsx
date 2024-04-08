import { useMemo } from 'react';
import { ThemeProvider } from "@/components/theme-provider"
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Layout from './pages/Layout';
import Test from './pages/Test';
import Explorer from './pages/Explorer';
import Fund from './pages/Fund';
import CreateFund from './pages/CreateFund';

function App() {

  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = useMemo(() => [], []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <WalletModalProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  <Layout
                  />
                }>
                  <Route path="/" element={<Home />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/funds" element={<Explorer />} />
                  <Route path="/funds/:id" element={<Fund />} />
                  <Route path="/create-fund" element={<CreateFund />} />
                  <Route path="*" element={<div>404</div>} />
                </Route>
              </Routes>
            </BrowserRouter>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
  )
}

export default App
