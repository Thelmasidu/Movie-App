import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchPeople } from "../api/tmdb-api";
import { DiscoverPeople, People } from "../types/interfaces";

import PageTemplate from "../components/templatePeopleListPage";
import Spinner from "../components/spinner";
import Pagination from "../components/pagination";
import AddPersonToFavouritesIcon from "../components/cardIcons/AddPersonToFavouritesIcon";

const PeoplePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>(
    ["people", page],
    () => fetchPeople(page),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const people = data ? data.results : [];

  return (
    <div>
      <PageTemplate
        people={people}
        title="People List"
        page={page}
        totalPages={data ? data.total_pages : 1}
        action={(person: People) => <AddPersonToFavouritesIcon {...person} />}
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

export default PeoplePage;
