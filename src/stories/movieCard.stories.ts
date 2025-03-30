import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleData";

const meta = {
    title: "Movie Card Page/MovieCard",
    component: MovieCard,
  } satisfies Meta<typeof MovieCard>;
  export default meta;

 type Story = StoryObj<typeof meta>;
 export const Basic: Story = {
    args: {
      movie: SampleMovie, 
      selectFavourite: (movieId: number) => {
        console.log(`Movie ${movieId} selected as favorite`);
      },
    },
  };
  

 Basic.storyName = "Favorite Movie";