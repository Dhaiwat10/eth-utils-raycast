import { Action, ActionPanel, Form, showToast, Toast } from "@raycast/api";
import { ethers } from "ethers";

const ChecksumAction = () => {
  const handleSubmit = async (values: { inputAddress: string }) => {
    try {
      // check is not empty
      if (values.inputAddress.length === 0) {
        showToast(Toast.Style.Failure, "Address cannot be empty");
        return;
      }

      // check length is 42 and starts with 0x
      if (values.inputAddress.length !== 42 || values.inputAddress.slice(0, 2) !== "0x") {
        showToast(Toast.Style.Failure, "Address is not valid");
        return;
      }

      // return checksum
      ethers.utils.getAddress(values.inputAddress);
      showToast(Toast.Style.Success, "Address has been checksummed.");
    } catch (error) {
      showToast(Toast.Style.Failure, "Error", String(error));
    }
  };

  return <Action.SubmitForm title="Checksum Address" onSubmit={handleSubmit} />;
};

const Command = () => {
  return (
    <Form
      actions={
        <ActionPanel>
          <ChecksumAction />
        </ActionPanel>
      }
    >
      <Form.Description text="Convert an Ethereum address to a checksummed address." />
      <Form.TextField id="inputAddress" title="Address" placeholder="0x123..." />
    </Form>
  );
};

export default Command;
