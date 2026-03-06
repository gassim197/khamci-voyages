import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ThankYou from "./pages/ThankYou";
import FlightsPage from "./pages/FlightsPage";
import HotelsPage from "./pages/HotelsPage";
import CarsPage from "./pages/CarsPage";
import ParisPage from "./pages/ParisPage";
import DubaiPage from "./pages/DubaiPage";
import NewYorkPage from "./pages/NewYorkPage";
import StickyQuoteCTA from "./components/StickyQuoteCTA";
import QuickQuoteModal from "./components/QuickQuoteModal";
import WhatsAppButton from "./components/WhatsAppButton";

function Router() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/thank-you" component={ThankYou} />
        <Route path="/vols" component={FlightsPage} />
        <Route path="/hotels" component={HotelsPage} />
        <Route path="/voitures" component={CarsPage} />
        <Route path="/destination/paris" component={ParisPage} />
        <Route path="/destination/dubai" component={DubaiPage} />
        <Route path="/destination/new-york" component={NewYorkPage} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <StickyQuoteCTA onQuoteClick={() => setIsQuoteModalOpen(true)} />
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        source="sticky"
      />
      <WhatsAppButton />
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
