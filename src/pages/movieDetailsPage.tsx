import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { getMovie, fetchMovieCredits } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMoviePage";
import MovieDetails from "../components/movieDetails";
import { MovieDetailsProps, CastMember } from "../types/interfaces";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();

  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
    isError: isMovieError,
  } = useQuery<MovieDetailsProps, Error>(
    ["movie", id],
    () => getMovie(id || ""),
    { enabled: !!id }
  );

  const {
    data: credits,
    error: creditsError,
    isLoading: creditsLoading,
    isError: isCreditsError,
  } = useQuery<{ cast: CastMember[] }, Error>(
    ["credits", id],
    () => fetchMovieCredits(id || ""),
    { enabled: !!id }
  );

  if (movieLoading || creditsLoading) return <Spinner />;

  if (isMovieError) return <h1>{movieError?.message}</h1>;
  if (isCreditsError) return <h1>{creditsError?.message}</h1>;

  return (
    <>
      {movie && credits ? (
        <PageTemplate movie={movie}>
          <MovieDetails movie={movie} cast={credits.cast} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details...</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
