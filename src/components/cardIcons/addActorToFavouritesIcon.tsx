import React, { MouseEvent, useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Actors } from "../../types/interfaces";
import { Tooltip } from "@mui/material";

const AddPersonToFavouritesIcon: React.FC<Actors> = (actor) => {
  const context = useContext(ActorsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addActorsToFavourite(actor);
  };
  return (
    <Tooltip title="Add Person to favorites">
      <IconButton aria-label="Add to favorites" onClick={onUserSelect}>
        <FavoriteIcon
          color={actor.favourite ? "error" : "primary"}
          fontSize="large"
        />
      </IconButton>
    </Tooltip>
  );
};

export default AddPersonToFavouritesIcon;
