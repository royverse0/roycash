/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ModelsView } from './components/ModelsView';
import { PublishersView } from './components/PublishersView';
import { AdvertisersView } from './components/AdvertisersView';
import { TrackingView } from './components/TrackingView';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { S2SSimulatorModal } from './components/S2SSimulatorModal';
import { CalculatorModal } from './components/CalculatorModal';
import { LegalModal } from './components/LegalModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [s2sModalOpen, setS2sModalOpen] = useState(false);
  const [calcModalOpen, setCalcModalOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenS2S={() => setS2sModalOpen(true)}
        onOpenCalc={() => setCalcModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView 
            setActiveTab={setActiveTab} 
            onOpenS2S={() => setS2sModalOpen(true)} 
            onOpenCalc={() => setCalcModalOpen(true)} 
          />
        )}
        {activeTab === 'models' && (
          <ModelsView 
            setActiveTab={setActiveTab} 
            onOpenS2S={() => setS2sModalOpen(true)} 
          />
        )}
        {activeTab === 'publishers' && (
          <PublishersView 
            setActiveTab={setActiveTab} 
            onOpenCalc={() => setCalcModalOpen(true)} 
          />
        )}
        {activeTab === 'advertisers' && (
          <AdvertisersView 
            setActiveTab={setActiveTab} 
            onOpenS2S={() => setS2sModalOpen(true)} 
          />
        )}
        {activeTab === 'tracking' && (
          <TrackingView 
            onOpenS2S={() => setS2sModalOpen(true)} 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'about' && (
          <AboutView 
            setActiveTab={setActiveTab} 
          />
        )}
        {activeTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab}
        onOpenLegal={(type) => setLegalModalState(type)}
        onOpenS2S={() => setS2sModalOpen(true)}
      />

      {/* Modals */}
      <S2SSimulatorModal 
        isOpen={s2sModalOpen} 
        onClose={() => setS2sModalOpen(false)} 
      />

      <CalculatorModal 
        isOpen={calcModalOpen} 
        onClose={() => setCalcModalOpen(false)} 
      />

      <LegalModal 
        isOpen={Boolean(legalModalState)} 
        type={legalModalState} 
        onClose={() => setLegalModalState(null)} 
      />
    </div>
  );
}
