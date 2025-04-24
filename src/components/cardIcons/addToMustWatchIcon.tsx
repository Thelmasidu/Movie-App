import React, { useContext } from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { MoviesContext } from "../../contexts/moviesContext";
import { BaseMovieProps } from "../../types/interfaces";

const AddToMustWatchIcon: React.FC<{ movie: BaseMovieProps }> = ({ movie }) => {
  const { addToMustWatch } = useContext(MoviesContext);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    addToMustWatch(movie);
  };

  return (
    <PlaylistAddIcon
      color="primary"
      fontSize="large"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    />
  );
};

export default AddToMustWatchIcon;
