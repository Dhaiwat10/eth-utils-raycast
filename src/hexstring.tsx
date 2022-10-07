import { Form } from "@raycast/api";
import { useState } from "react";
import { BigNumber as BN } from "ethers";

const Command = () => {
  const [hexValue, setHexValue] = useState("");
  const [decimalValue, setDecimalValue] = useState("");

  const handleConvert = (val: string, sentFrom: "hex" | "decimal") => {
    try {
      if (val === "") {
        setHexValue("");
        setDecimalValue("");
        return;
      }

      if (sentFrom === "hex") {
        setHexValue(val);
        setDecimalValue(BN.from(val).toString());
      } else {
        setDecimalValue(val);
        setHexValue(BN.from(val).toHexString());
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form>
      <Form.Description text="Hexadecimal to decimal converter." />
      <Form.TextField
        id="hexValue"
        title="Hex Value"
        placeholder="0x123..."
        value={hexValue}
        onChange={(val) => handleConvert(val, "hex")}
      />
      <Form.TextField
        id="decimalValue"
        title="Decimal Value"
        placeholder="123..."
        value={decimalValue}
        onChange={(val) => handleConvert(val, "decimal")}
      />
    </Form>
  );
};

export default Command;
