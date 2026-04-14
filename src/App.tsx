/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, ReactNode, lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Header, Footer, UrgencyBar, WhatsAppButton } from "./components/layout/Navigation";
import { Loader2 } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy loading pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Trips = lazy(() => import("./pages/Trips"));
const VipClub = lazy(() => import("./pages/VipClub"));
const Advisory = lazy(() => import("./pages/Advisory"));
const Events = lazy(() => import("./pages/Events"));
const Partnerships = lazy(() => import("./pages/Partnerships"));
const Contact = lazy(() => import("./pages/Contact"));
const Links = lazy(() => import("./pages/Links"));
const LinksUteis = lazy(() => import("./pages/LinksUteis"));
const Blog = lazy(() => import("./pages/Blog"));
const Admin = lazy(() => import("./pages/Admin"));
const Ambassador = lazy(() => import("./pages/Ambassador"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const MemberDashboard = lazy(() => import("./pages/MemberDashboard"));
const VipSuccess = lazy(() => import("./pages/VipSuccess"));
const WelcomeAmbassador = lazy(() => import("./pages/WelcomeAmbassador"));
const VerifyMember = lazy(() => import("./pages/VerifyMember"));
const VerifyVip = lazy(() => import("./pages/VerifyVip"));
const PartnerDashboard = lazy(() => import("./pages/PartnerDashboard"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-brand-green animate-spin" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isLinksPage = location.pathname === "/links";

  if (isLinksPage) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      <UrgencyBar />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Toaster position="top-center" />
          <ScrollToTop />
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sobre-nos" element={<About />} />
              <Route path="/viagens" element={<Trips />} />
              <Route path="/clube-vip" element={<VipClub />} />
              <Route path="/assessoria" element={<Advisory />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/parcerias" element={<Partnerships />} />
              <Route path="/embaixador" element={<Ambassador />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/noticias" element={<Blog />} />
              <Route path="/links" element={<Links />} />
              <Route path="/links-uteis" element={<LinksUteis />} />
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/membro" element={
                <ProtectedRoute>
                  <MemberDashboard />
                </ProtectedRoute>
              } />
              <Route path="/vip-sucesso" element={
                <ProtectedRoute>
                  <VipSuccess />
                </ProtectedRoute>
              } />
              <Route path="/bem-vindo-embaixador" element={
                <ProtectedRoute>
                  <WelcomeAmbassador />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<AuthPage mode="login" />} />
              <Route path="/cadastro" element={<AuthPage mode="register" />} />
              <Route path="/verify/:uid" element={<VerifyMember />} />
              <Route path="/verificar/:code" element={<VerifyVip />} />
              <Route path="/parceiro/:id" element={<PartnerDashboard />} />
              <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
              <Route path="/termos-de-uso" element={<TermsOfUse />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  );
}
