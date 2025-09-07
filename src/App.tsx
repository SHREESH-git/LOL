import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import FooterTranslated from "@/components/FooterTranslated";
import ScrollToTop from "@/components/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import MoodTracker from "./pages/MoodTracker";
import AIChat from "./pages/AIChat";
import BookingSession from "./pages/BookingSession";
import Resources from "./pages/Resources";
import PeerSupport from "./pages/PeerSupport";
import PomodoroWellnessCoach from "./pages/PomodoroWellnessCoach";
import Journal from "./pages/Journal";
import Activities from "./pages/Activities";
import LocalSupport from "./pages/LocalSupport";
import Assessment from "./pages/Assessment";
import Donation from "./pages/Donation";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AboutUs from "./pages/AboutUs";
import MyProfile from "./pages/MyProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import AccessibilityStatement from "./pages/Accessibility";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/signin";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!hideNavbar && <Navigation />}
      <FloatingActionButton />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/ai-chat" element={<AIChat />} />
        <Route path="/booking" element={<BookingSession />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/community" element={<PeerSupport />} />
        <Route path="/pomodoro" element={<PomodoroWellnessCoach />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/local-support" element={<LocalSupport />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/accessibility" element={<AccessibilityStatement />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FooterTranslated />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;