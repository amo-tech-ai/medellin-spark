import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Perks from "./pages/Perks";
import Programs from "./pages/Programs";
import Blog from "./pages/Blog";
import Startups from "./pages/Startups";
import StartupProfile from "./pages/StartupProfile";
import SkillsExperience from "./pages/SkillsExperience";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import PitchDeck from "./pages/PitchDeck";
import PitchDeckWizard from "./pages/PitchDeckWizard";
import Dashboard from "./pages/Dashboard";
import DashboardEvents from "./pages/DashboardEvents";
import DashboardSettings from "./pages/DashboardSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/perks" element={<Perks />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/startups" element={<Startups />} />
              <Route path="/startup-profile" element={<StartupProfile />} />
              <Route path="/skills-experience" element={<SkillsExperience />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pitch-deck" element={<PitchDeck />} />
              <Route path="/pitch-deck-wizard" element={<PitchDeckWizard />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/events" element={<DashboardEvents />} />
              <Route path="/dashboard/settings" element={<DashboardSettings />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
