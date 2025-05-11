import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Fab,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import { fetchActors } from "../api/tmdb-api";
import { DiscoverActors, Actors, ActorsSortOption } from "../types/interfaces";

import PageTemplate from "../components/templateActorsListPage";
import Spinner from "../components/spinner";
import Pagination from "../components/pagination";
import AddActorToFavouritesIcon from "../components/cardIcons/addActorToFavouritesIcon";
import { sortActors } from "../utils/actorSortUtils";

const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "popularity-desc", label: "Popularity (High-Low)" },
  { value: "popularity-asc", label: "Popularity (Low-High)" },
  { value: "gender-asc", label: "Gender (Female → Male)" },
  { value: "gender-desc", label: "Gender (Male → Female)" },
];

const ActorsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<ActorsSortOption>("popularity-desc");
  const [filterName, setFilterName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const { data, error, isLoading, isError } = useQuery<DiscoverActors, Error>(
    ["actors", page],
    () => fetchActors(page),
    { keepPreviousData: true }
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  let actors: Actors[] = data ? data.results : [];

  // Filter actors by name
  if (filterName) {
    actors = actors.filter((actor) =>
      actor.name.toLowerCase().includes(filterName.toLowerCase())
    );
  }

  // Sort actors
  actors = sortActors(actors, sortBy);

  return (
    <div>
      {/* Modal trigger */}
      <Fab
        color="primary"
        onClick={() => setOpenModal(true)}
        aria-label="filter-sort"
        sx={{ position: "fixed", bottom: matches ? 20 : 70, right: 20 }}
      >
        <FilterAltIcon />
      </Fab>

      {/* Actors list template */}
      <PageTemplate
        actors={actors}
        title="Actors List"
        page={page}
        totalPages={data ? data.total_pages : 1}
        action={(actor: Actors) => <AddActorToFavouritesIcon {...actor} />}
        onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNext={() =>
          setPage((prev) => (data && prev < data.total_pages ? prev + 1 : prev))
        }
      />

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={data ? data.total_pages : 1}
        onPageChange={setPage}
      />

      {/* MUI Filter & Sort Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Filter & Sort Actors</DialogTitle>
        <DialogContent>
          <TextField
            label="Search by name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            fullWidth
            margin="dense"
          />
          <TextField
            select
            label="Sort by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as ActorsSortOption)}
            fullWidth
            margin="dense"
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Apply</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ActorsPage;