import { BrowserRouter, Routes, Route, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/lib/theme";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CursorGlow } from "@/components/site/CursorGlow";
import { PageTransition } from "@/components/site/PageTransition";
import { FloatingSocial } from "@/components/site/FloatingSocial";
import { PageLoader } from "@/components/site/PageLoader";
import { RouteLoader } from "@/components/site/RouteLoader";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { ScrollReset } from "@/components/site/ScrollReset";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import ContactPage from "@/pages/ContactPage";
import BookAppointmentPage from "@/pages/BookAppointmentPage";
import GetAQuotePage from "@/pages/GetAQuotePage";
import AdminPage from "@/pages/AdminPage";
import AuthPage from "@/pages/AuthPage";
import NotFoundPage from "@/pages/NotFoundPage";

function RecoveryRedirect() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    const hash = window.location.hash;
    if ((hash.includes("type=recovery") || hash.includes("type=email")) && pathname !== "/auth") {
      navigate("/auth" + hash, { replace: true });
    }
  }, []);
  return null;
}

function Layout() {
  return (
    <>
      <RecoveryRedirect />
      <ScrollReset />
      <PageLoader />
      <RouteLoader />
      <CursorGlow />
      <Header />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <Footer />
      <FloatingSocial />
      <ScrollToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <I18nProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/book-appointment" element={<BookAppointmentPage />} />
              <Route path="/get-a-quote" element={<GetAQuotePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </I18nProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
