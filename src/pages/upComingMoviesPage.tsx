import React, { useEffect, useState } from "react";  
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState([]);
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
  selectFavourite={() => {}}
/>
  );
};

export default UpcomingMoviesPage;
