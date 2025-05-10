import type { Meta, StoryObj } from "@storybook/react";
import ThemeSelector from "../components/themeSelector";
import ThemeContextProvider from "../contexts/themeContext";

const meta = {
  title: "Components/ThemeSelector",
  component: ThemeSelector,
  decorators: [
    (Story: React.FC) => (
      <ThemeContextProvider>
        <Story />
      </ThemeContextProvider>
    ),
  ],
}satisfies Meta<typeof ThemeSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  name: "Default",
};

Basic.args = {
  theme: "light",
  onThemeChange: (theme: string) => console.log(`Theme changed to: ${theme}`),
};
Basic.parameters = {
  layout: "fullscreen",
};
Basic.decorators = [(Story: React.FC) => <div style={{ padding: "20px" }}><Story /></div>];
Basic.storyName = "Default Theme Selector";
