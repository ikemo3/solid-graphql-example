// starsQueryをモック化
import { StarsQuery } from "@shared/lib/generated/graphql";
import { render, screen } from "@solidjs/testing-library";
import { StarList } from "@widgets/StarList";
import { ExecutionResult } from "graphql";
import { describe, expect, vi } from "vitest";

vi.mock("@shared/api", async () => {
  const starsQuery = vi.fn();
  const stars = [
    {
      id: "1",
      name: "星1",
      constellation: {
        id: "1",
        name: "星座1",
      },
      createdAt: new Date("2021-01-01T00:00:00.000Z"),
      updatedAt: new Date("2021-01-01T00:00:00.000Z"),
    },
    {
      id: "2",
      name: "星2",
      constellation: {
        id: "2",
        name: "星座2",
      },
      createdAt: new Date("2021-01-01T00:00:00.000Z"),
      updatedAt: new Date("2021-01-01T00:00:00.000Z"),
    },
  ];
  const result: ExecutionResult<StarsQuery> = { data: { stars } };

  starsQuery.mockReturnValue(result);
  return { starsQuery };
});

describe("StarList", () => {
  test("星の一覧が表示されること", async () => {
    render(() => <StarList />);

    // 星の一覧が表示されることを確認
    expect(screen.getByText("星1")).toBeInTheDocument();
    expect(screen.getByText("星2")).toBeInTheDocument();
  });
});
