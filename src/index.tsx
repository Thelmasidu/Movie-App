import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import TvShowsPage from "./pages/tvShowsPage";
import MoviePage from "./pages/movieDetailsPage";
import ActorsPage from "./pages/actorsPage";
import SearchPage from "./pages/searchInputPage";
import TvShowPage from "./pages/tvShowDetailPage";
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
              <Routes>
                <Route
                  path="/movies/favourites"
                  element={<FavouriteMoviesPage />}
                />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route
                  path="/movies/upcoming"
                  element={<UpcomingMoviesPage />}
                />
                <Route path="/movies/search" element={<SearchPage />} />
                <Route
                  path="/movies/similar-movies/:id"
                  element={<SimilarMoviesPage />}
                />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/tv-shows/:id" element={<TvShowPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/tv-shows" element={<TvShowsPage />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/actors" element={<ActorsPage />} />
                <Route path="/actors/:id" element={<ActorDetailsPage />} />
              </Routes>
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
