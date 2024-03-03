import { RouteSectionProps } from "@solidjs/router";
import { Component } from "solid-js";

const Layout: Component<RouteSectionProps> = (props) => {
  return <div class="prose prose-xl">{props.children}</div>;
};

export default Layout;
