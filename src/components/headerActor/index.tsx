import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ActorsDetails } from "../../types/interfaces";
import { Container } from "@mui/material";

const ActorHeader: React.FC<ActorsDetails> = (actor) => {
  return (
    <Container>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
          marginTop: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" component="h3">
          {actor.name}
        </Typography>
      </Paper>
    </Container>
  );
};

export default ActorHeader;
