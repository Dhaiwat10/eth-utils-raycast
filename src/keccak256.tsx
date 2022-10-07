import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { ethers } from "ethers";
import { useState } from "react";

const Command = () => {
  const [input, setInput] = useState("");
  const [keccak256, setKeccak256] = useState("");

  const handleConvert = (val: string) => {
    try {
      setInput(val);
      const hash = ethers.utils.id(val);
      setKeccak256(hash);
    } catch (error) {
      showToast(Toast.Style.Failure, "Error", String(error));
    }
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.CopyToClipboard title="Copy Hash" content={keccak256} />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="inputValue"
        title="Input String/Number"
        placeholder="hello world"
        value={input}
        onChange={handleConvert}
      />
      <Form.Description title="Generated Hash" text={input.length === 0 ? "-" : keccak256} />
    </Form>
  );
};

export default Command;
