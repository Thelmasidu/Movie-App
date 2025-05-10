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
  useTheme,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StarIcon from "@mui/icons-material/Star";
import { TvShowsContext } from "../../contexts/tvShowsContext";
import { BaseTvShowProps } from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";

interface TvShowCardProps {
  show: BaseTvShowProps;
  action: (s: BaseTvShowProps) => React.ReactNode;
}

const TvShowCard: React.FC<TvShowCardProps> = ({ show, action }) => {
  const theme = useTheme();
  const { favouriteShows } = useContext(TvShowsContext);
  const isFavourite = favouriteShows.includes(show.id);

  return (
    <Card
      sx={{
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[3],
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            {show.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600}>
            {show.name}
          </Typography>
        }
        subheader={
          <Box display="flex" alignItems="center">
            <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{show.first_air_date}</Typography>
          </Box>
        }
        action={
          isFavourite && (
            <Tooltip title="Favourite">
              <IconButton sx={{ color: theme.palette.error.main }}>
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
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500/${show.poster_path}`
            : img
        }
        alt={show.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Popularity Score: {show.popularity.toFixed(1)}
        </Typography>
        <Box mt={1} display="flex" alignItems="center">
          <StarIcon
            fontSize="small"
            sx={{ mr: 0.5, color: theme.palette.warning.main }}
          />
          <Typography variant="body2" color="text.secondary">
            {show.vote_average} / 10
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        {action(show)}
        <Link to={`/tv-shows/${show.id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
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

export default TvShowCard;
