import React, { useEffect, useState } from "react";
import {
  Favorite as FavoriteIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { Box, Typography, Link, IconButton, Paper } from "@mui/material";
import { MovieDetailsProps } from "../../types/interfaces";

interface FavoriteMovie {
  id: number;
}

const MovieHeader: React.FC<MovieDetailsProps> = (movie) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((fav: FavoriteMovie) => fav.id === movie.id));
  }, [movie.id]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
      variant="outlined"
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Link href={movie.homepage} target="_blank" rel="noopener noreferrer">
          <IconButton color="primary">
            <HomeIcon fontSize="large" />
          </IconButton>
        </Link>
        {isFavorite && (
          <IconButton color="error" sx={{ ml: 2 }}>
            <FavoriteIcon fontSize="large" />
          </IconButton>
        )}
      </Box>
      <Typography
        variant="h4"
        component="h3"
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        {movie.title}
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ textAlign: "center" }}
      >
        {movie.tagline}
      </Typography>
    </Paper>
  );
};

export default MovieHeader;
