import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import { Actors } from "../../types/interfaces";

const RemovePersonFromFavouritesIcon: React.FC<Actors> = (actor) => {
  const context = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.removeActorsFromFavourite(actor);
  };

  return (
    <IconButton aria-label="remove from favorites" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemovePersonFromFavouritesIcon;
