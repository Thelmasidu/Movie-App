/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import FilterCard from "../filterTvShowsCard/Index";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { BaseTvShowProps } from "../../types/interfaces";

export const titleFilter = (show: BaseTvShowProps, value: string): boolean => {
  return show.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (show: BaseTvShowProps, value: string) => {
  const genreId = Number(value);
  const genreIds = show.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

const styles = {
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
};

interface TvShowFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortChange: (newSort: string) => void;
  currentSort: string;
}

const TvShowFilterUI: React.FC<TvShowFilterUIProps> = ({
  onFilterValuesChange,
  titleFilter,
  genreFilter,
  onSortChange,
  currentSort,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Fab
        color="secondary"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <FilterAltIcon />
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          onSortChange={onSortChange}
          currentSort={currentSort}
        />
      </Drawer>
    </>
  );
};

export default TvShowFilterUI;
