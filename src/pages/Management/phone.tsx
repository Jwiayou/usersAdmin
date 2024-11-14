import React from "React";
import { Input, InputProps } from "antd";

const PhoneInput: React.FC<
  Omit<InputProps, "onChange"> & { onChange: (value: string) => void }
> = ({ onChange, ...props }) => {
  const handleChange: InputProps["onChange"] = (event) => {
    const value = event.target.value;
    if (!/^[0-9]*$/.test(value)) {
    }
    onChange?.(value);
  };
  return <Input onChange={handleChange} {...props} />;
};

export default PhoneInput;
