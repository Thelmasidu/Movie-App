import React, { useState } from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { fetchTvShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/tvFilterUI";
import { DiscoverTvShows, BaseTvShowProps } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddShowsToFavouritesIcon from "../components/cardIcons/addShowsToFavouriteIcon";
import { Box, Typography } from "@mui/material";
import Pagination from "../components/pagination";

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

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>("popularity.desc");

  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>(
    ["tv", page, sortBy],
    () => fetchTvShows(page, sortBy),
    { keepPreviousData: true }
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

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

  const shows = data ? data.results : [];
  const displayedTvShows = filterFunction(shows);

  return (
    <>
      <PageTemplate
        title="Discover Tv Shows"
        shows={displayedTvShows}
        page={page}
        totalPages={data?.total_pages}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNext={() => setPage((prev) => prev + 1)}
        action={(show: BaseTvShowProps) => (
          <AddShowsToFavouritesIcon {...show} />
        )}
      />

      {/* Filters */}
      <TvShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        onSortChange={sortChangeHandler}
        currentSort={sortBy}
      />

      {/* Pagination */}
      <Box display="flex" justifyContent="center" alignItems="center" mt={3}>
        <Pagination
          currentPage={page}
          totalPages={data ? data.total_pages : 1}
          onPageChange={setPage}
        />
        <Typography sx={{ ml: 2 }}>Page {page}</Typography>
      </Box>
    </>
  );
};

export default HomePage;
