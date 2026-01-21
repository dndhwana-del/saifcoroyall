import { useState, useCallback, lazy, Suspense } from "react";
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
import { AudioProvider } from "./components/AudioProvider";
import FilmGrain from "./components/FilmGrain";
import MashrabiyaReveal from "./components/MashrabiyaReveal";

const queryClient = new QueryClient();

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioProvider>
          {/* Cinematic Preloader */}
          <Preloader onComplete={handlePreloaderComplete} />
          
          {/* Film Grain Overlay - Cinematic texture */}
          <FilmGrain />
          
          {/* Dynamic Mashrabiya Pattern Reveal */}
          <MashrabiyaReveal />
          
          {/* Custom Luxury Cursor */}
          <LuxuryCursor />
          
          {/* Smooth Scroll Provider - buttery scroll physics */}
          <SmoothScrollProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SmoothScrollProvider>
        </AudioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
