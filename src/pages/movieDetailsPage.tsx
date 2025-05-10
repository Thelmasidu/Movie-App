import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { fetchMovieCredits, getMovie } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { MovieCredits, MovieDetailsProps } from "../types/interfaces";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: movie,
    error: movieError,
    isLoading: movieLoading,
    isError: movieIsError,
  } = useQuery<MovieDetailsProps, Error>(["movie", id], () =>
    getMovie(id || "")
  );
  const {
    data: credits,
    error: creditsError,
    isLoading: creditsLoading,
    isError: creditsIsError,
  } = useQuery<MovieCredits, Error>(["movieCredits", id], () =>
    fetchMovieCredits(id || "")
  );

  if (movieLoading || creditsLoading) {
    return <Spinner />;
  }

  if (movieIsError) {
    return <h1>{movieError?.message}</h1>;
  }

  if (creditsIsError) {
    return <h1>{creditsError?.message}</h1>;
  }

  return (
    <>
      {movie && credits && (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} cast={credits.cast} />
          </PageTemplate>
        </>
      )}
    </>
  );
};

export default MovieDetailsPage;
