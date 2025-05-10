import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import { ListedMovie } from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png";
import { useTheme } from "@mui/material/styles"; 
interface MovieCardProps {
  movie: ListedMovie;
  action: (m: ListedMovie) => React.ReactNode;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, action }) => {
  const { favourites } = useContext(MoviesContext);
  const theme = useTheme();
  const isFavourite = favourites.includes(movie.id);

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {movie.title.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600}>
            {movie.title}
          </Typography>
        }
        subheader={
          <Box display="flex" alignItems="center">
            <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{movie.release_date}</Typography>
          </Box>
        }
        action={
          isFavourite && (
            <Tooltip title="Favourite">
              <IconButton sx={{ color: red[500] }}>
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          )
        }
      />

      <CardMedia
        component="img"
        height="500"
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
        alt={movie.title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Popularity Score: {movie.popularity.toFixed(1)} / 100
        </Typography>
        <Box mt={1} display="flex" alignItems="center">
          <StarIcon fontSize="small" sx={{ mr: 0.5, color: "#fbc02d" }} />
          <Typography variant="body2" color="text.secondary">
            {movie.vote_average} / 10
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        {action(movie)}
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              bgcolor: theme.palette.primary.main,
              "&:hover": {
                bgcolor: theme.palette.primary.dark,
              },
            }}
          >
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
