import { AlertDialogContext } from "@shared/lib";
import { Button, Card, CardContent, Col, Grid, Textarea } from "@shared/ui";
import { createClipboard } from "@solid-primitives/clipboard";
import { Title } from "@solidjs/meta";
import { createSignal, For, Match, Switch, useContext } from "solid-js";

const ClipboardPage = () => {
  let textarea: HTMLTextAreaElement;
  const context = useContext(AlertDialogContext);
  const [data, setData] = createSignal("Hello");
  const [clipboard, refresh] = createClipboard(data);

  const handleReadClipboard = async () => {
    refresh();
    context.alert("クリップボードのデータを読み込みました");
  };

  return (
    <div>
      <Title>Clipboard</Title>

      <Grid cols={1} colsMd={2} class="w-full gap-2">
        <Col>
          <Button onClick={() => setData(textarea.value)}>
            Write to clipboard
          </Button>
          <Textarea class="mt-2" ref={textarea!} />
        </Col>
        <Col>
          <Button onClick={() => handleReadClipboard()}>
            Read from clipboard
          </Button>
        </Col>
      </Grid>

      <Card class="mt-4">
        <CardContent>
          <For each={clipboard()}>
            {(item) => (
              <Switch>
                <Match when={item.type == "text/plain"}>{item.text}</Match>
                <Match when={item.type == "image/png"}>
                  <img
                    class="max-w-80 object-contain"
                    src={URL.createObjectURL(item.blob)}
                  />
                </Match>
              </Switch>
            )}
          </For>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClipboardPage;
