import React from "react";
import { Button, InputNumber, InputNumberProps, Space } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const FareInputNumber: React.FC<InputNumberProps> = ({
  onChange,
  value,
  max,
  min,
  ...props
}) => {
  const curValue = Number(value ?? 0);

  const handleChange: InputNumberProps["onChange"] = (value) => {
    onChange?.(value);
  };

  const handleAction = (action: "minus" | "plus") => {
    onChange?.(action === "minus" ? curValue - 1 : curValue + 1);
  };

  const maxDisabled = max !== undefined ? curValue >= Number(max) : undefined;
  const minDisabled = min !== undefined ? curValue <= Number(min) : undefined;

  return (
    <Space>
      <Button
        icon={<PlusOutlined />}
        onClick={() => handleAction("plus")}
        disabled={maxDisabled}
      />
      <InputNumber
        {...props}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        addonAfter="元"
      />
      <Button
        icon={<MinusOutlined />}
        onClick={() => handleAction("minus")}
        disabled={minDisabled}
      />
    </Space>
  );
};

export default FareInputNumber;
