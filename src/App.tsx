import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DevModeRedirect } from "./components/DevModeRedirect";
import { MobileNav } from "./components/MobileNav";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Events from "./pages/Events";
import Perks from "./pages/Perks";
import Programs from "./pages/Programs";
import Blog from "./pages/Blog";
import Startups from "./pages/Startups";
import StartupProfile from "./pages/StartupProfile";
import SkillsExperience from "./pages/SkillsExperience";
import Founders from "./pages/Founders";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import PitchDeck from "./pages/PitchDeck";
import PitchDeckWizard from "./pages/PitchDeckWizard";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import DashboardEvents from "./pages/DashboardEvents";
import DashboardSettings from "./pages/DashboardSettings";
import DashboardPitchDecks from "./pages/DashboardPitchDecks";
import DashboardJobs from "./pages/DashboardJobs";
import OutlineEditor from "./pages/presentations/OutlineEditor";
import SlideEditor from "./pages/presentations/SlideEditor";
import PresentationViewer from "./pages/presentations/PresentationViewer";
import NotFound from "./pages/NotFound";
import EventDetail from "./pages/EventDetail";
import JobDetail from "./pages/JobDetail";
import PerkDetail from "./pages/PerkDetail";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1 pb-16 md:pb-0">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/auth" element={<DevModeRedirect><Auth /></DevModeRedirect>} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:id" element={<EventDetail />} />
                  <Route path="/perks" element={<Perks />} />
                  <Route path="/perks/:id" element={<PerkDetail />} />
                  <Route path="/programs" element={<Programs />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/startups" element={<Startups />} />
                  <Route path="/founders" element={<Founders />} />
                  <Route path="/startup-profile" element={<StartupProfile />} />
                  <Route path="/skills-experience" element={<SkillsExperience />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/jobs/:id" element={<JobDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/pitch-deck" element={<PitchDeck />} />
                  <Route path="/pitch-deck-wizard" element={<PitchDeckWizard />} />
                  <Route path="/profile/:id?" element={<Profile />} />

                {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/events" element={<DashboardEvents />} />
          <Route path="/dashboard/pitch-decks" element={<DashboardPitchDecks />} />
          <Route path="/dashboard/jobs" element={<DashboardJobs />} />
                <Route path="/dashboard/settings" element={<DashboardSettings />} />

                {/* Presentation Editor Routes */}
                <Route path="/presentations/:id/outline" element={<OutlineEditor />} />
                <Route path="/presentations/:id/edit" element={<SlideEditor />} />
                <Route path="/presentations/:id/view" element={<PresentationViewer />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <MobileNav />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
        </TooltipProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
