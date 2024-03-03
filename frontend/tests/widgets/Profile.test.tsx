import { AuthContext, AuthContextType } from "@shared/lib";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@solidjs/testing-library";
import { Profile } from "@widgets/Profile";
import { ParentComponent } from "solid-js";

const Provider: ParentComponent = (props) => {
  const user = async () => {
    return { name: "John Doe", picture: "https://example.com/user1.png" };
  };

  const value = { user } as AuthContextType;
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

describe("Profile", () => {
  test("イニシャルが表示されること", async () => {
    render(() => (
      <Provider>
        <Profile />
      </Provider>
    ));

    // ローディング中の表示が終わるまで待つ
    const loading = () => screen.getByText("Loading...");
    await waitForElementToBeRemoved(loading);

    // イニシャルが表示されることを確認
    expect(screen.getByText("JD")).toBeInTheDocument();
  });
});
