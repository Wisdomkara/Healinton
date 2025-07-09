
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Premium from "./pages/Premium";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import HealthInsurance from "./pages/HealthInsurance";
import Community from "./pages/Community";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            <Route path="/auth" element={<Layout><Auth /></Layout>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
            <Route path="/premium" element={<Layout><Premium /></Layout>} />
            <Route path="/about" element={<Layout><AboutUs /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/health-insurance" element={<Layout><HealthInsurance /></Layout>} />
            <Route path="/community" element={<Layout><Community /></Layout>} />
            <Route path="/accessibility" element={<Layout><Accessibility /></Layout>} />
            <Route path="*" element={<Layout><NotFound /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
