import React, { useState } from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatchIcon";

const UpcomingMoviesPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery(
    ["upcomingMovies", currentPage],
    getUpcomingMovies,
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
    }
  );

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {(error as Error).message}</h2>;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (data && currentPage < data.total_pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={data.results}
      action={(movie) => <AddToMustWatchIcon movie={movie} />}
      page={currentPage}
      totalPages={data.total_pages}
      onPrevious={handlePrevious}
      onNext={handleNext}
    />
  );
};

export default UpcomingMoviesPage;
