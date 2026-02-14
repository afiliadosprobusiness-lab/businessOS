import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import RoutePageViewTracker from "@/components/analytics/RoutePageViewTracker";
import WhatsAppClickTracker from "@/components/analytics/WhatsAppClickTracker";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ScheduleDemo from "./pages/ScheduleDemo";
import BookingConfirmed from "./pages/BookingConfirmed";
import BlogIndex from "./pages/BlogIndex";
import BlogPostPage from "./pages/BlogPostPage";
import LandingPage from "./pages/LandingPage";
import SolutionsIndexPage from "./pages/SolutionsIndexPage";
import {
  BLOG_INDEX_ROUTE,
  BLOG_POST_ROUTE,
  DEMO_BOOKING_ROUTE,
  DEMO_CONFIRMATION_ROUTE,
  SOLUTIONS_ROUTE,
} from "@/lib/routes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RoutePageViewTracker />
          <WhatsAppClickTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/es" element={<Index />} />
            <Route path="/en" element={<Index />} />
            <Route path={DEMO_BOOKING_ROUTE} element={<ScheduleDemo />} />
            <Route path={DEMO_CONFIRMATION_ROUTE} element={<BookingConfirmed />} />
            <Route path={BLOG_INDEX_ROUTE} element={<BlogIndex />} />
            <Route path={BLOG_POST_ROUTE} element={<BlogPostPage />} />
            <Route path={SOLUTIONS_ROUTE} element={<SolutionsIndexPage />} />
            <Route path="/:landingSlug" element={<LandingPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
