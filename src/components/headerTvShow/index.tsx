import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { ShowT } from "../../types/interfaces";
import { IconButton } from "@mui/material";
import { styles } from "./HeaderTvShow.styled";

const TvShowHeader: React.FC<ShowT> = (props) => {
  return (
    <Paper elevation={3} sx={styles.root}>
      <Typography variant="h4" component="h3" sx={styles.title}>
        {props.name}
        {props.homepage && (
          <IconButton
            href={props.homepage}
            target="_blank"
            color="primary"
            size="large"
          >
            <HomeIcon />
          </IconButton>
        )}
      </Typography>

      <Typography variant="subtitle1" sx={styles.tagline}>
        {props.tagline}
      </Typography>
    </Paper>
  );
};

export default TvShowHeader;
