/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { BaseMovieProps } from "../../types/interfaces";
import { useTheme } from "@mui/material/styles";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
  const genreId = Number(value);
  const genreIds = movie.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  onSortChange: (newSort: string) => void;
  currentSort: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
  onFilterValuesChange,
  titleFilter,
  genreFilter,
  onSortChange,
  currentSort,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Fab
        color="secondary"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.secondary.main),
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
          },
        }}
      >
        <FilterAltIcon />
      </Fab>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            width: 300,
            padding: 2,
          },
        }}
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

export default MovieFilterUI;
