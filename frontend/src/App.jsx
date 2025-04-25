import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from './store/store';

import Navbar from './components/Navbar';
import Home from './components/Home';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import Room from './components/Room';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Features from './components/Features';
import Pro from './components/Pro';
import CreateRoomType from './components/CreateRoomType';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Cookies from './components/Cookies';
import LegalNotice from './components/LegalNotice';
import FaqPage from './components/FaqPage';
import SupportPage from './components/SupportPage';
import CareersPage from './components/CareersPage';





function App() {
  return (
    <Provider store={store}>
      <PayPalScriptProvider options={{
        "client-id": "ASftGstPXdnIn8upNFkSyrVNpm7yXl2t8S-W0DSL0qhiI7pbwes-AarwOzx3f2xQ-Wevm6ThPTmx3ad0",
        currency: "EUR",
        intent: "capture"
      }}>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pro" element={<Pro />} />
              <Route path="/create-room-type" element={<CreateRoomType />} />
              <Route path="/room-design" element={<Room />} />
              <Route path="/caracteristiques" element={<Features />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/tarifs" element={<Pricing />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/success" element={<PaymentSuccess />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/mentions-legales" element={<LegalNotice />} />
              <Route path="/faq" element={<FaqPage />} />

              <Route path="/support" element={<SupportPage />} />
              <Route path="/carrieres" element={<CareersPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </PayPalScriptProvider>
    </Provider>
  );
}

export default App;