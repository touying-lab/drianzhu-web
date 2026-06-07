import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import TheArchitect from "./pages/TheArchitect";
import Insights from "./pages/Insights";
import InsightsVideos from "./pages/InsightsVideos";
import VideoEditor from "./pages/VideoEditor";
import Contact from "./pages/Contact";
import AIAvatar from "./pages/AIAvatar";
import Engagements from "./pages/Engagements";
import Journal from "./pages/Journal";
import Store from "./pages/Store";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CookieSettings from "./pages/CookieSettings";

// Handle GitHub Pages SPA redirect from 404.html before Wouter reads the URL.
function restoreGitHubPagesRedirect() {
  const { search, hash } = window.location;

  if (!search.startsWith("?/")) {
    return;
  }

  const redirect = search.slice(2);
  const queryStart = redirect.indexOf("&");
  const rawPath = queryStart === -1 ? redirect : redirect.slice(0, queryStart);
  const rawQuery = queryStart === -1 ? "" : redirect.slice(queryStart + 1);
  const path = `/${rawPath.replace(/~and~/g, "&").replace(/^\/+/, "")}`;
  const query = rawQuery ? `?${rawQuery.replace(/~and~/g, "&")}` : "";

  window.history.replaceState(null, "", `${path}${query}${hash}`);
}

restoreGitHubPagesRedirect();

function Router() {
  return (
<WouterRouter>
  <Switch>
    <Route path={"/"} component={Home} />
      <Route path={"/the-architect"} component={TheArchitect} />
      <Route path={"/insights"} component={Insights} />
      <Route path={"/insights/edit/007drianzhu"} component={VideoEditor} />
      <Route path={"/insights/videos"} component={InsightsVideos} />
      <Route path={"/insights/videos/:collectionSlug"} component={InsightsVideos} />
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
</WouterRouter>  );
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
