import {
  ProCard,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormItem,
  ProFormText,
} from "@ant-design/pro-components";
import DynamicFareCard from "./DynamicFareCard";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import FareInputNumber from "./FareInputNumber";

export default () => {
  const [form] = ProForm.useForm();

  const handleBaseFareAction = (action: "plus" | "minus") => {
    const baseFare = form.getFieldValue("baseFare") ?? 0;
    form.setFieldValue(
      "baseFare",
      action === "plus" ? baseFare + 1 : baseFare - 1
    );
  };

  return (
    <ProCard title="Demo" style={{ width: 400 }}>
      <ProForm
        form={form}
        onFinish={async (values) => {
          console.log(values);
        }}
        layout="horizontal"
        labelCol={{ flex: "100px" }}
        initialValues={{
          area: 4902216.49,
          baseFare: 2,
          dynamicFare: {
            distance: [
              {
                start: 5,
                end: 10,
                fare: 5,
              },
            ],
            timeRange: [
              {
                start: "3:00",
                end: "4:00",
                fare: 5,
              },
            ],
          },
        }}
      >
        <ProFormText
          name="name"
          label="范围名称"
          rules={[{ required: true, message: "请输入范围名称" }]}
          width={240}
        />
        <ProFormText
          label="配送面积"
          name="area"
          readonly
          addonAfter="km²"
          width={400}
          required
        />
        <ProFormItem label="起送价" name="baseFare">
          <FareInputNumber style={{ width: 150 }} min={2} max={16} />
        </ProFormItem>
        <DynamicFareCard form={form} />
      </ProForm>
    </ProCard>
  );
};
