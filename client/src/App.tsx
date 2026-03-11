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
import CasablancaPage from "./pages/CasablancaPage";
import BangkokPage from "./pages/BangkokPage";
import BarcelonaPage from "./pages/BarcelonaPage";
import AdminDashboardNew from "./pages/AdminDashboardNew";
import ChatWidget from "./components/ChatWidget";
import APropos from "./pages/APropos";
import BilletterieService from "./pages/services/BilletterieService";
import HotelService from "./pages/services/HotelService";
import LocationVehiculeService from "./pages/services/LocationVehiculeService";
import AssuranceVoyageService from "./pages/services/AssuranceVoyageService";
import VisaService from "./pages/services/VisaService";
import HadjOumraService from "./pages/services/HadjOumraService";
import BlogArticlePage from "./pages/BlogArticlePage";

function Router() {
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
        <Route path="/destination/casablanca" component={CasablancaPage} />
        <Route path="/destination/bangkok" component={BangkokPage} />
        <Route path="/destination/barcelona" component={BarcelonaPage} />
        <Route path="/admin" component={AdminDashboardNew} />
        <Route path="/a-propos" component={APropos} />
        <Route path="/services/billetterie" component={BilletterieService} />
        <Route path="/services/hotel" component={HotelService} />
        <Route path="/services/location-vehicule" component={LocationVehiculeService} />
        <Route path="/services/assurance-voyage" component={AssuranceVoyageService} />
        <Route path="/services/visa" component={VisaService} />
        <Route path="/services/hadj-oumra" component={HadjOumraService} />
        <Route path="/blog/:slug" component={BlogArticlePage} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <ChatWidget />
    </>
  );
}

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
