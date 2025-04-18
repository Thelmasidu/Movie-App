import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps  } from "../types/interfaces"; 

const AddToMustWatchIcon: React.FC<{ movie: BaseMovieProps }> = ({ movie }) => {
  return (
    <PlaylistAddIcon color="primary" fontSize="large" />
  );
};

const UpcomingMoviesPage: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery(
    "upcomingMovies", 
    getUpcomingMovies, 
    {
      staleTime: 1000 * 60 * 5, 
      cacheTime: 1000 * 60 * 10, 
    }
  );

  
  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {(error as Error).message}</h2>;

  return  (
    <PageTemplate
      title="Upcoming Movies"
      movies={data.results}
      action={(movie) => <AddToMustWatchIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
