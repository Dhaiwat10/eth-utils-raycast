import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { ethers } from "ethers";
import { useState } from "react";

const Command = () => {
  const [input, setInput] = useState("");
  const [sha256, setSha256] = useState("");

  const handleConvert = (val: string) => {
    try {
      setInput(val);
      // string -> bytes -> sha256
      const hash = ethers.utils.sha256(ethers.utils.toUtf8Bytes(val));
      setSha256(hash);
    } catch (error) {
      showToast(Toast.Style.Failure, "Error", String(error));
    }
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Hash" content={input.length === 0 ? "" : sha256} />
        </ActionPanel>
      }
    >
      <Form.Description text="Generate SHA256 Hash" />
      <Form.TextField
        id="inputValue"
        title="Input String/Number"
        placeholder="hello world"
        value={input}
        onChange={handleConvert}
      />
      <Form.Description title="Generated Hash" text={input.length === 0 ? "-" : sha256} />
    </Form>
  );
};

export default Command;
