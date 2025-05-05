import * as React from "react";
import { Actors } from "../../types/interfaces";
import { Grid } from "@mui/material";
import ActorsCard from "../actorsCard";

interface ActorsProps {
  actors: Actors[];
  action: (m: Actors) => React.ReactNode;
}

const ActorsList: React.FC<ActorsProps> = (props) => {
  const actors = props.actors;

  return (
    <Grid container spacing={2}>
      {actors.map((p) => (
        <Grid item key={p.id} xs={12} sm={6} md={6} lg={3}>
          <ActorsCard actor={p} action={props.action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorsList;