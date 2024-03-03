import { ErrorMessages } from "@features/ErrorMessages";
import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { fileUrlQuery, listFilesQuery, sendFileMutation } from "@shared/api";
import { AlertDialogContext, z } from "@shared/lib";
import { Button, Input, Label } from "@shared/ui";
import { Title } from "@solidjs/meta";
import type { JSX } from "solid-js";
import { createResource, For, Show, useContext } from "solid-js";

const schema = z.object({
  file: z.instanceof(File, { message: "ファイルが必要です" }),
});

type Data = {
  file: File;
};

const Upload = () => {
  const { alert } = useContext(AlertDialogContext);

  // ファイル一覧の取得
  const [files] = createResource(listFilesQuery);

  // フォームの作成
  const { form, errors, warnings, setData, unsetField } = createForm<Data>({
    extend: [validator({ schema })],
    onSubmit: async (values) => {
      const file = values.file;
      const result = await sendFileMutation(file);
      alert(`Form submitted! ${JSON.stringify(result)}`);
    },
  });

  // ファイル入力の変更を検知してフォームの状態を更新
  const handleFileChange: JSX.EventHandler<HTMLInputElement, Event> = (
    event,
  ) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      // ファイルをセット
      setData("file", files[0]);
    } else {
      // フィールドを空にする
      unsetField("file");
    }
  };

  // ファイルのダウンロード
  const downloadFile = async (file: string) => {
    const result = await fileUrlQuery(file);
    const url = result.data?.fileUrl;
    if (url) {
      console.log(url);
      window.open(url, "_blank");
    } else {
      alert("ファイルのダウンロードに失敗しました");
    }
  };

  return (
    <div>
      <Title>Forms</Title>
      <form ref={form} enctype="multipart/form-data">
        <div class="my-2 flex w-80 flex-col">
          <Label for="file">File</Label>
          <Input
            type="file"
            placeholder="File"
            id="file"
            onInput={(e) => handleFileChange(e)}
          />
          <ErrorMessages errors={errors().file} warnings={warnings().file} />
        </div>

        <Button type="submit" class="mt-2">
          Upload
        </Button>
      </form>

      <Show when={files()}>
        {(files) => (
          <div class="mt-4">
            <h2 class="mb-2 text-xl font-bold">Files</h2>
            <ul>
              <For each={files().data?.listFiles}>
                {(file) => (
                  <li>
                    <button onClick={() => downloadFile(file)}>{file}</button>
                  </li>
                )}
              </For>
            </ul>
          </div>
        )}
      </Show>
    </div>
  );
};

export default Upload;
