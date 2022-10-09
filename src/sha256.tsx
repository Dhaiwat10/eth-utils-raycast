import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Command = () => {
  const [input, setInput] = useState("");
  const [verifyMode, setVerifyMode] = useState(false);
  const [sha256, setSha256] = useState("");
  const [verificationHash, setVerificationHash] = useState("");

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

  const updateVerificationHash = (val: string) => {
    try {
      setVerificationHash(val);

      // check if hash is valid
      if (val.length !== 66 || val.slice(0, 2) !== "0x") {
        showToast(Toast.Style.Failure, "Hash is not valid");
        return;
      }

      // check if hash matches
      if (val === sha256) {
        showToast(Toast.Style.Success, "Hash matches");
      } else {
        showToast(Toast.Style.Failure, "Hash does not match");
      }
    } catch (error) {
      showToast(Toast.Style.Failure, "Error", String(error));
    }
  };

  useEffect(() => {
    if (verifyMode) {
      updateVerificationHash(verificationHash);
    }
  }, [input, verificationHash]);

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
      <Form.Checkbox label="Verify Mode" id="verifyMode" value={verifyMode} onChange={setVerifyMode} />
      {verifyMode && (
        <Form.TextField
          id="hashInput"
          title="Enter Hash"
          placeholder="0x7a21..."
          value={verificationHash}
          onChange={updateVerificationHash}
        />
      )}
      {!verifyMode && <Form.Description title="Generated Hash" text={input.length === 0 ? "-" : sha256} />}
    </Form>
  );
};

export default Command;
