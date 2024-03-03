import { readFile } from "@shared/lib/file";
import { graphql } from "@shared/lib/generated";

import { executeOperation } from "./graphqlOperation";

const BroadcastRandomNumber = graphql(`
  mutation BroadcastRandomNumber {
    broadcastRandomNumber
  }
`);

const broadcastRandomNumberMutation = async () => {
  const result = await executeOperation(BroadcastRandomNumber);
  return result;
};

const SendDate = graphql(`
  mutation SendDate($input: SendDateInput!) {
    sendDate(input: $input) {
      id
      date
    }
  }
`);

const sendDateMutation = async (date: Date) => {
  const result = await executeOperation(SendDate, {
    input: {
      date,
    },
  });

  return result;
};

const SendFile = graphql(`
  mutation SendFile($input: SendFileInput!) {
    sendFile(input: $input) {
      id
      key
    }
  }
`);

const sendFileMutation = async (file: File) => {
  const fileData = await readFile(file);

  const result = await executeOperation(SendFile, {
    input: {
      file: fileData,
      name: file.name,
      contentType: file.type,
    },
  });

  return result;
};

export { broadcastRandomNumberMutation, sendDateMutation, sendFileMutation };
