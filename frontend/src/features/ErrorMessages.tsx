import { Callout } from "@shared/ui";

type Props = {
  errors: string[] | null;
  warnings: string[] | null;
};

export const ErrorMessages = (props: Props) => {
  return (
    <>
      {props.errors && (
        <Callout variant="error" class="my-2">
          <pre>{props.errors.join("\n")}</pre>
        </Callout>
      )}
      {props.warnings && (
        <Callout variant="warning" class="my-2">
          <pre>{props.warnings.join("\n")}</pre>
        </Callout>
      )}
    </>
  );
};
