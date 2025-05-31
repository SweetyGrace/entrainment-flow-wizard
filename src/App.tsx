import { Toaster } from "@/common/components/Toaster";
import { Toaster as Sonner } from "@/common/components/Sonner";
import { TooltipProvider } from "@/common/components/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import ProgrammeDetails from "./pages/ProgrammeDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <TopNavigation />
          <SideNavigation />
          <div className="ml-20">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/programme/:id" element={<ProgrammeDetails />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
