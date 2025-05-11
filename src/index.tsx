import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import HomePage from "./pages/homePage";
import TvShowsPage from "./pages/tvShowsPage";
import MoviePage from "./pages/movieDetailsPage";
import ActorsPage from "./pages/actorsPage";
import SearchPage from "./pages/searchInputPage";
import TvShowPage from "./pages/tvShowDetailPage"; // Correct route for TV show detail
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upComingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import TvShowsContextProvider from "./contexts/tvShowsContent";
import SimilarMoviesPage from "./pages/similarMoviesPage";
import ThemeContextProvider from "./contexts/themeContext";
import StorybookSupportPage from "./pages/StorybookSupportPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ActorsContextProvider from "./contexts/actorsContext";

// 🆕 Fantasy Movie components
import CreateFantasyMovie from "./components/fantasyMovie/CreateFantasyMovie";
import FantasyMovieList from "./components/fantasyMovie/FantasyMovieList";
import FantasyMovieDetail from "./components/fantasyMovie/FantasyMovieDetail";

// ✅ React Query client setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <TvShowsContextProvider>
              <ActorsContextProvider>
              <Routes>
                {/* Core Routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/tv-shows" element={<TvShowsPage />} />
                <Route path="/tv-shows/:id" element={<TvShowPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/search" element={<SearchPage />} />
                <Route path="/movies/similar-movies/:id" element={<SimilarMoviesPage />} />

                {/* Reviews */}
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />

                {/* Actor Pages */}
                <Route path="/actors" element={<ActorsPage />} />
                <Route path="/actors/:id" element={<ActorDetailsPage />} />

                {/* Support */}
                <Route path="/storybook/support" element={<StorybookSupportPage />} />

                {/* Fantasy Movies */}
                <Route path="/fantasy" element={<FantasyMovieList />} />
                <Route path="/fantasy/create" element={<CreateFantasyMovie />} />
                <Route path="/fantasy/:id" element={<FantasyMovieDetail />} />

                {/* Redirect unmatched routes */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              </ActorsContextProvider>
            </TvShowsContextProvider>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
