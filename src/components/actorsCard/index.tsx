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
  Chip,
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import { Actors } from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png";

interface ActorsCardProps {
  actor: Actors;
  action: (p: Actors) => React.ReactNode;
}

const ActorsCard: React.FC<ActorsCardProps> = ({ actor, action }) => {
  const { favourites } = useContext(MoviesContext);
  const isFavourite = favourites.includes(actor.id);

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            {actor.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600}>
            {actor.name}
          </Typography>
        }
        subheader={
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon fontSize="small" />
            <Typography variant="body2">
              {actor.known_for_department}
            </Typography>
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
        height="400"
        image={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
            : img
        }
        alt={actor.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Popularity: {actor.popularity.toFixed(1)}
        </Typography>

        {actor.known_for && actor.known_for.length > 0 && (
          <Box mt={1}>
            <Typography variant="subtitle2" gutterBottom>
              Known For:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {actor.known_for.map((item, index) => (
                <Tooltip
                  key={index}
                  title={`${item.title || item.original_title || "Untitled"} (${
                    item.media_type
                  })`}
                >
                  <Chip
                    label={item.title || item.original_title || "Untitled"}
                    size="small"
                    sx={{ mb: 0.5 }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        {action(actor)}
        <Link to={`/actors/${actor.id}`} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              fontWeight: 500,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
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

export default ActorsCard;
