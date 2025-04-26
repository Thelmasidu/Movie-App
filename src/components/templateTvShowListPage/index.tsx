import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import TvShowList from "../tvList";
import { TvShowListPageTemplateProps } from "../../types/interfaces";

const TvShowListPageTemplate: React.FC<TvShowListPageTemplateProps> = ({
  shows,
  title,
  action,
  page,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <Grid container sx={{ p: 2 }}>
      <Grid item xs={12}>
        <Header
          title={title}
          page={page}
          totalPages={totalPages}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </Grid>
      <Grid item container spacing={1}>
        <TvShowList action={action} shows={shows} />
      </Grid>
    </Grid>
  );
};

export default TvShowListPageTemplate;
