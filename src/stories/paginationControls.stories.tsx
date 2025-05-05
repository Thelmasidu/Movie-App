import type { Meta, StoryObj } from "@storybook/react";
import PaginationControls from "../components/pagination";
import { useState } from "react";

const meta: Meta<typeof PaginationControls> = {
  title: "Components/PaginationControls",
  component: PaginationControls,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof PaginationControls>;

const Template = () => {
  const [page, setPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <PaginationControls
      currentPage={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export const Default: Story = {
  render: Template,
  name: "Default Pagination",
};