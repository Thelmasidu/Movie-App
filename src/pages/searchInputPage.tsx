import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { fetchMultiSearchResults } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import {
  MovieResult,
  MultiSearchResponse,
  MultiSearchResult,
  TVShowResult,
  ListedMovie,
  BaseTvShowProps,
  Actors,
} from "../types/interfaces";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import AddShowsToFavouritesIcon from "../components/cardIcons/addShowsToFavouriteIcon";
import MovieCard from "../components/movieCard";
import { Box, Grid, Typography } from "@mui/material";
import TvShowCard from "../components/tvShowCard";
import { useState } from "react";
import Pagination from "../components/pagination";
import PeopleCard from "../components/actorsCard";
import AddPersonToFavouritesIcon from "../components/cardIcons/addActorToFavouritesIcon";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const mediaType = searchParams.get("media_type") || "";
  const includeAdult = searchParams.get("include_adult") === "true";
  const language = searchParams.get("language") || "en-US";

  const [page, setPage] = useState(1);

  const { data, isLoading, error, isError } = useQuery<
    MultiSearchResponse,
    Error
  >(
    ["search", query, mediaType, includeAdult, language, page],
    () =>
      fetchMultiSearchResults(query, page, includeAdult, language, mediaType),
    {
      enabled: !!query,
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const mediaTypeRenderMap: Record<
    string,
    (result: MultiSearchResult) => JSX.Element | null
  > = {
    movie: (result) => {
      const movie = result as MovieResult;
      return (
        <MovieCard
          movie={movie}
          action={(movie: ListedMovie) => <AddToFavouritesIcon {...movie} />}
        />
      );
    },
    tv: (result) => {
      const tvShow = result as TVShowResult;
      return (
        <TvShowCard
          show={tvShow}
          action={(tvShow: BaseTvShowProps) => (
            <AddShowsToFavouritesIcon {...tvShow} />
          )}
        />
      );
    },
    person: (result) => {
      const actor = result as Actors;
      return (
        <PeopleCard
          actor={actor}
          action={(actor: Actors) => <AddPersonToFavouritesIcon {...actor} />}
        />
      );
    },
  };

  const renderResult = (result: MultiSearchResult) => {
    const renderFn = mediaTypeRenderMap[result.media_type];
    return renderFn ? renderFn(result) : null;
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={4}
        mb={4}
      >
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
        >
          Search Results for "{query}"
        </Typography>
      </Box>
      {data && data.results.length > 0 ? (
        <Grid item container spacing={1}>
          {data.results.map((result) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={result.id}>
              {renderResult(result)}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
          width="100%"
        >
          <Typography variant="h5" color="text.secondary">
            No results found.
          </Typography>
        </Box>
      )}
      <Pagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
    </Box>
  );
};

export default SearchPage;
