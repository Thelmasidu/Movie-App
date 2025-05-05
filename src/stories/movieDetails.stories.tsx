import type { Meta, StoryObj } from '@storybook/react';
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import { CastMember } from '../types/interfaces';

const sampleCast: CastMember[] = [
  {
    adult: false,
    gender: 2,
    id: 101,
    known_for_department: "Acting",
    name: "Chris Evans",
    original_name: "Chris Evans",
    popularity: 20.1,
    profile_path: "/3bOGNsHlrswhyW79uvIHH1V43JI.jpg",
    cast_id: 1,
    character: "Steve Rogers / Captain America",
    credit_id: "52fe4cddb9cc5b0c070f2c41",
    order: 0,
  },
];

const meta = {
    title: "Movie Details Page/MovieDetails",
    component: MovieDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
      ],
} satisfies Meta<typeof MovieDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
  args: {
    movie: SampleMovie,
    cast: sampleCast,
  },
};

Basic.storyName = "Default";