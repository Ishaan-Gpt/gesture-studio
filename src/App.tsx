import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoadingAnimation from "./components/LoadingAnimation";
import GestureControl from "./components/GestureControl";
import { GestureProvider } from "./context/GestureContext";

const queryClient = new QueryClient();

import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Also hide when page is fully loaded
    if (document.readyState === 'complete') {
      // Wait for animation to finish via callback
    } else {
      window.addEventListener('load', () => {
        // Wait for animation to finish via callback
      });
    }

    return () => {
      window.removeEventListener('load', () => { });
    };
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <GestureProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}
            <GestureControl />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </GestureProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
