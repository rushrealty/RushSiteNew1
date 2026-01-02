import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import HowToBuy from './pages/HowToBuy';
import Mortgage101 from './pages/Mortgage101';
import GetYourOffer from './pages/GetYourOffer';
import NewConstruction from './pages/NewConstruction';
import Assurance from './pages/Assurance';
import AvailableCommunities from './pages/AvailableCommunities';
import CommunityDetail from './pages/CommunityDetail';
import WigginsMill from './pages/WigginsMill';
import About from './pages/About';
import Team from './pages/Team';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/available-communities" element={<AvailableCommunities />} />
          <Route path="/available-communities/wiggins-mill" element={<WigginsMill />} />
          <Route path="/available-communities/:communityId" element={<CommunityDetail />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/how-to-buy" element={<HowToBuy />} />
          <Route path="/mortgage-101" element={<Mortgage101 />} />
          <Route path="/get-offer" element={<GetYourOffer />} />
          <Route path="/new-construction" element={<NewConstruction />} />
          <Route path="/assurance" element={<Assurance />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
