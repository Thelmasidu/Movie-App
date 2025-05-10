import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import TvListPageTemplate from "../components/templateTvShowListPage";
import PeopleListPageTemplate from "../components/templateActorsListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import {
  fetchActorDetails,
  fetchTvShowDetails,
  getMovie,
} from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import RemoveShowsFromFavouritesIcon from "../components/cardIcons/removeShowsFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import RemoveActorFromFavouritesIcon from "../components/cardIcons/removeActorFromFavourites";
import { TvShowsContext } from "../contexts/tvShowsContent";
import { ActorsContext } from "../contexts/actorsContext";

const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { favouriteShows: showId } = useContext(TvShowsContext);
  const { favouriteActors: actorId } = useContext(ActorsContext);

  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const favouriteTvShowQueries = useQueries(
    showId.map((showId) => {
      return {
        queryKey: ["tv-show", showId],
        queryFn: () => fetchTvShowDetails(showId.toString()),
      };
    })
  );

  const favouriteActorsQueries = useQueries(
    actorId.map((actorId) => {
      return {
        queryKey: ["people", actorId],
        queryFn: () => fetchActorDetails(actorId.toString()),
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading =
    favouriteMovieQueries.some((m) => m.isLoading) ||
    favouriteTvShowQueries.some((s) => s.isLoading) ||
    favouriteActorsQueries.some((p) => p.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  const allShowFavourites = favouriteTvShowQueries.map((q) => q.data);
  const allPeopleFavourites = favouriteActorsQueries.map((q) => q.data);

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={allFavourites}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
        }}
        page={0}
        onPrevious={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <TvListPageTemplate
        title="Favourite Tv Shows"
        shows={allShowFavourites}
        action={(show) => {
          return (
            <>
              <RemoveShowsFromFavouritesIcon {...show} />
            </>
          );
        }}
        page={0}
        onPrevious={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <PeopleListPageTemplate
        title="Favourite People"
        actors={allPeopleFavourites}
        action={(actors) => {
          return (
            <>
              <RemoveActorFromFavouritesIcon {...actors} />
            </>
          );
        }}
        page={0}
        onPrevious={function (): void {
          throw new Error("Function not implemented.");
        }}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
};

export default FavouriteMoviesPage;
