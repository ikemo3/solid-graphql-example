import { cn } from "@shared/lib/utils";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

const Input: Component<ComponentProps<"input">> = (props) => {
  const [, rest] = splitProps(props, ["type", "class"]);
  return (
    <input
      type={props.type}
      class={cn(
        // text-sm → text-base に変更(iOSのSafari対応)
        "border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-base file:border-0 file:bg-transparent file:text-base file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        props.class,
      )}
      {...rest}
    />
  );
};

export { Input };
