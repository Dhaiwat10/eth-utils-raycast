import { Form } from "@raycast/api";
import { useEffect, useState } from "react";
import { toBaseUnitBN, toTokenUnitsBN } from "../utils/bigNumber";

export default function Command() {
  const [value, setValue] = useState("1");

  const handleValueChange = (val: string, base: number) => {
    setValue(toBaseUnitBN(val, base).toFixed());
  };

  useEffect(() => {
    if (value === "NaN") {
      setValue("0");
    }
  }, [value]);

  return (
    <Form>
      <Form.Description text="Simple unit converter for Ether units." />
      <Form.TextField
        id="wei"
        title="wei"
        placeholder="Enter wei"
        value={toTokenUnitsBN(value, 0).toFixed()}
        onChange={(val) => handleValueChange(val, 0)}
      />

      <Form.TextField
        id="gwei"
        title="gwei"
        placeholder="Enter gwei"
        value={toTokenUnitsBN(value, 9).toFixed()}
        onChange={(val) => handleValueChange(val, 9)}
      />

      <Form.TextField
        id="ether"
        title="ether"
        placeholder="Enter ether"
        value={toTokenUnitsBN(value, 18).toFixed()}
        onChange={(val) => handleValueChange(val, 18)}
      />
    </Form>
  );
}
