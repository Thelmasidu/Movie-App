import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseTvShowProps } from "../../types/interfaces";
import { Tooltip } from "@mui/material";
import { TvShowsContext } from "../../contexts/tvShowsContext";

const AddShowsToFavouritesIcon: React.FC<BaseTvShowProps> = (show) => {
  const context = useContext(TvShowsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavouriteShows(show);
  };
  return (
    <Tooltip title="Add show to favorites">
      <IconButton aria-label="Add to favorites" onClick={onUserSelect}>
        <FavoriteIcon
          color={show.favourite ? "error" : "primary"}
          fontSize="large"
        />
      </IconButton>
    </Tooltip>
  );
};

export default AddShowsToFavouritesIcon;
