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
  Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { MoviesContext } from "../../contexts/moviesContext";
import { CastMember } from "../../types/interfaces";
import img from "../../images/film-poster-placeholder.png";

interface PeopleCardProps {
  person: CastMember;
  action: (p: CastMember) => React.ReactNode;
}


const PeopleCard: React.FC<PeopleCardProps> = ({ person, action }) => {
  const { favourites } = useContext(MoviesContext);
  const isFavourite = favourites.includes(person.id);

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
            {person.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="subtitle1" fontWeight={600}>
            {person.name}
          </Typography>
        }
        subheader={
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon fontSize="small" />
            <Typography variant="body2">
              {person.known_for_department}
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
          person.profile_path
            ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
            : img
        }
        alt={person.name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Popularity: {person.popularity.toFixed(1)}
        </Typography>

        {person.known_for && person.known_for == true && (
          <Box mt={1}>
            <Typography variant="subtitle2" gutterBottom>
              Known For:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              
            </Stack>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        {action(person)}
        <Link to={`/people/${person.id}`} style={{ textDecoration: "none" }}>
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

export default PeopleCard;
