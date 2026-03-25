import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import TheArchitect from "./pages/TheArchitect";
import Insights from "./pages/Insights";
import Contact from "./pages/Contact";
import AIAvatar from "./pages/AIAvatar";
import Engagements from "./pages/Engagements";
import Journal from "./pages/Journal";
import Store from "./pages/Store";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CookieSettings from "./pages/CookieSettings";

// Handle GitHub Pages SPA redirect from 404.html
function useGitHubPagesRedirect() {
  useEffect(() => {
    const search = window.location.search;
    if (search.startsWith("?/")) {
      const path = search.slice(2).replace(/~and~/g, "&");
      const newUrl = window.location.pathname + path + window.location.hash;
      window.history.replaceState(null, "", newUrl);
    }
  }, []);
}

function Router() {
  useGitHubPagesRedirect();
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/the-architect"} component={TheArchitect} />
      <Route path={"/insights"} component={Insights} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/ai-avatar"} component={AIAvatar} />
      <Route path={"/engagements"} component={Engagements} />
      <Route path={"/journal"} component={Journal} />
      <Route path={"/journal/:slug"} component={Journal} />
      <Route path={"/store"} component={Store} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/terms-of-use"} component={TermsOfUse} />
      <Route path={"/cookie-settings"} component={CookieSettings} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
