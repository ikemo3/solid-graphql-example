import { Footer } from "@features/Footer";
import { render, screen } from "@solidjs/testing-library";

describe("Footer", () => {
  test("renders correctly", () => {
    render(() => <Footer />);

    // "Footer Content Here" "が表示されているか
    expect(screen.getByText("Footer Content Here")).toBeInTheDocument();
  });
});
