import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import { MovieListPageTemplateProps } from "../../types/interfaces";

const MovieListPageTemplate: React.FC<MovieListPageTemplateProps> = ({
  movies,
  title,
  action,
  page,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Header
          title={title}
          page={page}
          totalPages={totalPages}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </Grid>
      <Grid item container spacing={1}>
        <MovieList action={action} movies={movies} />
      </Grid>
    </Grid>
  );
};

export default MovieListPageTemplate;
