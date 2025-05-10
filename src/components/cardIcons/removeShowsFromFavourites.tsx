import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { BaseTvShowProps } from "../../types/interfaces";
import { TvShowsContext } from "../../contexts/tvShowsContext";

const RemoveShowsFromFavouritesIcon: React.FC<BaseTvShowProps> = (show) => {
  const context = useContext(TvShowsContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeShowsFromFavourites(show);
  };

  return (
    <IconButton aria-label="remove from favorites" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveShowsFromFavouritesIcon;
