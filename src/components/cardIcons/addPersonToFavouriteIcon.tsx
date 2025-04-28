import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { People } from "../../types/interfaces";
import { Tooltip } from "@mui/material";

const AddPersonToFavouritesIcon: React.FC<People> = (person) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavouritePeople(person);
  };
  return (
    <Tooltip title="Add Person to favorites">
      <IconButton aria-label="Add to favorites" onClick={onUserSelect}>
        <FavoriteIcon
          color={person.favourite ? "error" : "primary"}
          fontSize="large"
        />
      </IconButton>
    </Tooltip>
  );
};

export default AddPersonToFavouritesIcon;
