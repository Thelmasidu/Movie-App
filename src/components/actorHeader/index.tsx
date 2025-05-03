import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ActorsDetails } from "../../types/interfaces";
import { Avatar } from "@mui/material";
import { red } from "@mui/material/colors";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
};

interface FavoriteActor {
  id: number;
}

const ActorHeader: React.FC<ActorsDetails> = (actor) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: FavoriteActor) => fav.id === actor.id));
  }, [actor.id]);

  return (
    <Paper elevation={0} variant="outlined" sx={styles.root}>
      {isFavorite && (
        <Avatar sx={{ bgcolor: red[500] }}>
          <FavoriteIcon />
        </Avatar>
      )}

      <Typography variant="h4" fontWeight="bold" component="h3">
        {actor.name}
      </Typography>
    </Paper>
  );
};

export default ActorHeader;
