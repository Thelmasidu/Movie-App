import type { Meta } from "@storybook/react";
import ActorList from "../components/actorsList";
import SampleActorData from "./sampleActorData";
import { MemoryRouter } from "react-router";

import AddActorToFavouritesIcon from "../components/cardIcons/addActorToFavouritesIcon";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";

const meta: Meta<typeof ActorList> = {
  title: "Actors Page/ActorList",
  component: ActorList,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
    (Story) => (
      <MoviesContextProvider>
        <Story />
      </MoviesContextProvider>
    ),
  ],
};

export default meta;

export const DefaultActorList = () => {
  const mockActors = [
    { ...SampleActorData, id: 1 },
    { ...SampleActorData, id: 2 },
    { ...SampleActorData, id: 3 },
    { ...SampleActorData, id: 4 },
    { ...SampleActorData, id: 5 },
  ];

  return (
    <Grid container spacing={1}>
      <ActorList
        actors={mockActors}
        action={(actor) => <AddActorToFavouritesIcon {...actor} />}
      />
    </Grid>
  );
};

DefaultActorList.storyName = "Default";