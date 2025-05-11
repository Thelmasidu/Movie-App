import { MemoryRouter } from "react-router";
import { Meta } from "@storybook/react";
import TvShowDetail from "../components/tvShowDetails";
import MoviesContextProvider from "../contexts/moviesContext";
import SampleTvShow, { tvCastMembers } from "./sampleTvDetailData";
import type { StoryObj } from "@storybook/react";

const meta: Meta<typeof TvShowDetail> = {
  title: "Tv Show Details Page/TvShowDetails",
  component: TvShowDetail,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{<Story />}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{<Story />}</MoviesContextProvider>,
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: { show: SampleTvShow, cast: tvCastMembers },
};
Basic.storyName = "Default";