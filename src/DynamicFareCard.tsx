import {
  FormInstance,
  ProCard,
  ProFormDependency,
} from "@ant-design/pro-components";
import { Flex, Divider, Typography, Button } from "antd";
import React from "react";
import SetDynamiceFareButton from "./SetDynamiceFareButton";

interface DynamiceFareCardProps {
  form: FormInstance;
}

const DynamiceFareCard: React.FC<DynamiceFareCardProps> = ({
  form,
  ...props
}) => {
  return (
    <ProCard
      title="动态起步价"
      extra={<SetDynamiceFareButton form={form} />}
      bordered
      size="small"
    >
      <ProFormDependency name={["dynamicFare"]}>
        {({ dynamicFare }) => (
          <>
            {dynamicFare?.distance?.map((item: any, index: number) => (
              <Flex justify="space-between" key={index}>
                <Typography.Text type="secondary">
                  {item.start} - {item.end}km
                </Typography.Text>
                <Typography.Text type="secondary">
                  加价 {item.fare} 元
                </Typography.Text>
              </Flex>
            ))}

            <Divider style={{ marginBlock: 10 }} />

            {dynamicFare?.timeRange?.map((item: any, index: number) => (
              <Flex justify="space-between" key={index}>
                <Typography.Text type="secondary">
                  {item.start} - {item.end}
                </Typography.Text>
                <Typography.Text type="secondary">
                  加价 {item.fare} 元
                </Typography.Text>
              </Flex>
            ))}
          </>
        )}
      </ProFormDependency>
    </ProCard>
  );
};

export default DynamiceFareCard;
