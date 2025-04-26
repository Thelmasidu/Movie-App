import React from "react";
import Grid from "@mui/material/Grid";
import { BaseTvShowListProps } from "../../types/interfaces";
import TvShowCard from "../tvShowCard";

const TvShowList: React.FC<BaseTvShowListProps> = ({ shows, action }) => {
  const tvShowCards = shows.map((s) => (
    <Grid key={s.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
      <TvShowCard key={s.id} show={s} action={action} />
    </Grid>
  ));
  return tvShowCards;
};

export default TvShowList;
