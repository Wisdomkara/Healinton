
import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import { CartProvider } from '@/contexts/CartContext';
import Layout from '@/components/Layout';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Premium from './pages/Premium';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HealthInsurance from './pages/HealthInsurance';
import Community from './pages/Community';
import Accessibility from './pages/Accessibility';
import DrugsPage from './pages/DrugsPage';
import AdminOrders from './pages/AdminOrders';
import AdminSettings from './pages/AdminSettings';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

const App = () => {
  // Create QueryClient inside the component to avoid SSR issues
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="auth" element={<Auth />} />
                <Route path="blog" element={<Blog />} />
                <Route path="blog/:id" element={<BlogPost />} />
                <Route path="premium" element={<Premium />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="terms" element={<TermsOfService />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="health-insurance" element={<HealthInsurance />} />
                <Route path="community" element={<Community />} />
                <Route path="accessibility" element={<Accessibility />} />
                <Route path="drugs" element={<DrugsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
