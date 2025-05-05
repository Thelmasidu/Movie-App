import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import MovieFilterUI from "../components/movieFilterUI";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Pagination from "../components/pagination";

import { fetchSimilarMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";

import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { genreFilter, titleFilter } from "../components/movieFilterUI";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const SimilarMoviesPage: React.FC = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["similar movies", id, page],
    () => fetchSimilarMovies(`${id}`, page),
    { keepPreviousData: true }
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const sortChangeHandler = (newSort: string): void => {
    setSortBy(newSort);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <>
      <PageTemplate
        title="Similar Movies"
        movies={displayedMovies}
        page={page}
        totalPages={data?.total_pages}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setPage((prev) => prev + 1)}
        action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortChange={sortChangeHandler}
        currentSort={sortBy}
      />

      <Pagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
    </>
  );
};

export default SimilarMoviesPage;
