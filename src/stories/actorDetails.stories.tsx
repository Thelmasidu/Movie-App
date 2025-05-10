import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "react-query";
import ActorDetailsPage from "../components/actorDetails"; // Update with correct import path
import { MemoryRouter } from "react-router";
import ActorsContextProvider from "../contexts/actorsContext";
import { actorDetails } from "./sampleActorData";

const queryClient = new QueryClient();

const meta: Meta<typeof ActorDetailsPage> = {
  title: "Actor Details Page/ActorDetails",
  component: ActorDetailsPage,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <ActorsContextProvider>
            <Story />
          </ActorsContextProvider>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { actor: actorDetails[0] },
};
Basic.storyName = "Default";

export const FlorencePugh: Story = {
  ...Basic,
  args: { actor: actorDetails[0] },
  storyName: "Florence Pugh",
};

export const PedroPascal: Story = {
  ...Basic,
  args: { actor: actorDetails[1] },
  storyName: "Pedro Pascal",
};
