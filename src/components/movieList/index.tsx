import React from "react";
import MovieCard from "../movieCard";
import Grid from "@mui/material/Grid";
import { BaseMovieProps } from "../../types/interfaces";

interface MovieListProps {
  movies: BaseMovieProps[];
  action: (movie: BaseMovieProps) => React.ReactNode
}
const MovieList: React.FC<MovieListProps> = ({ movies, action }) => {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
          <MovieCard
          movie={{ ...movie, genre_ids: movie.genre_ids ?? [] }}
          action={(m) => action(m)}
          />
          </Grid>
      ))}
    </Grid>
  )
};

export default MovieList;
