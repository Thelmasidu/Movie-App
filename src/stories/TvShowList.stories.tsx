import type { Meta } from "@storybook/react";
import TvList from "../components/tvList";
import SampleTvShow from "./sampleTvData";
import { MemoryRouter } from "react-router";

import AddShowsToFavouritesIcon from "../components/cardIcons/addActorToFavouritesIcon";
import Grid from "@mui/material/Grid";
import TvShowsContextProvider from "../contexts/tvShowsContext";

const meta = {
  title: "TV Shows/List View",
  component: TvList,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
    (Story) => (
      <TvShowsContextProvider>
        <Story />
      </TvShowsContextProvider>
    ),
  ],
} satisfies Meta<typeof TvList>;

export default meta;

export const TvListDefaultView = () => {
  const sampleShows = [
    { ...SampleTvShow, id: 1 },
    { ...SampleTvShow, id: 2 },
    { ...SampleTvShow, id: 3 },
    { ...SampleTvShow, id: 4 },
    { ...SampleTvShow, id: 5 },
  ];

  return (
    <Grid container spacing={1}>
      <TvList
        shows={sampleShows}
        action={(tvShow) => <AddShowsToFavouritesIcon adult={false} gender={0} known_for={[]} known_for_department={""} profile_path={""} {...tvShow} />}
      />
    </Grid>
  );
};

TvListDefaultView.storyName = "Default";
