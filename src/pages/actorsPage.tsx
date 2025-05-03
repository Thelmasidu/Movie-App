import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchActors } from "../api/tmdb-api";
import { DiscoverActors, Actors } from "../types/interfaces";

import PageTemplate from "../components/templateActorsListPage";
import Spinner from "../components/spinner";
import Pagination from "../components/pagination";
import AddPersonToFavouritesIcon from "../components/cardIcons/addActorToFavouritesIcon";

const ActorsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverActors, Error>(
    ["actors", page],
    () => fetchActors(page),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const actors = data ? data.results : [];

  return (
    <div>
      <PageTemplate
        actors={actors}
        title="Actors List"
        page={page}
        totalPages={data ? data.total_pages : 1}
        action={(actor: Actors) => <AddPersonToFavouritesIcon {...actor} />}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNext={() =>
          setPage((prev) => (data && prev < data.total_pages ? prev + 1 : prev))
        }
      />
      <Pagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ActorsPage;
