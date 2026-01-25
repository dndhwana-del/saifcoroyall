import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LuxuryCursor from "./components/LuxuryCursor";
import Preloader from "./components/Preloader";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import PageTransition from "./components/PageTransition";

const queryClient = new QueryClient();

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Cinematic Preloader */}
        <Preloader onComplete={handlePreloaderComplete} />
        
        {/* Custom Luxury Cursor */}
        <LuxuryCursor />
        
        {/* Smooth Scroll Provider - buttery scroll physics */}
        <SmoothScrollProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </BrowserRouter>
        </SmoothScrollProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
