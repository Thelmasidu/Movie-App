import React, { useEffect, useState } from "react";
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
  const [movies, setMovies] = useState<BaseMovieProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUpcomingMovies().then((data) => {
      setMovies(data.results);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToMustWatchIcon movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
