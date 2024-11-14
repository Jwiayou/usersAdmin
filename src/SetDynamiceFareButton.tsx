import React, { useState } from "react";
import { Button, Collapse, Space, Typography } from "antd";
import {
  ModalForm,
  ModalFormProps,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormItem,
  ProFormList,
} from "@ant-design/pro-components";
import { CollapseProps } from "antd/lib";
import styled from "styled-components";
import FareInputNumber from "./FareInputNumber";

const Label = styled(Typography.Text)`
  line-height: 30px;
`;

const SetDynamiceFareButton: React.FC<ModalFormProps> = ({
  form,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const renderChildren = () => (
    <ProFormList
      name={["dynamicFare", "distance"]}
      max={10}
      creatorButtonProps={{ creatorButtonText: "新增（最多十条）" }}
    >
      {(f, index, action) => (
        <ProFormGroup size={14}>
          <Label>距离:</Label>
          {index === 0 && (
            <ProFormDigit
              name="start"
              min={5}
              max={100}
              addonAfter="km"
              width={120}
              rules={[
                {
                  required: true,
                  message: "请输入开始距离",
                },
              ]}
            />
          )}
          {index > 0 && (
            <>
              <ProFormDependency
                name={[["dynamicFare", "distance", index - 1, "end"]]}
                ignoreFormListField
              >
                {({ dynamicFare }) => {
                  const end = dynamicFare.distance[index - 1].end;
                  form?.setFieldValue(
                    ["dynamicFare", "distance", index, "start"] as any,
                    end
                  );

                  return (
                    <ProFormDigit
                      name="start"
                      min={end}
                      max={end + 100}
                      addonAfter="km"
                      width={120}
                      disabled
                      rules={[
                        {
                          required: true,
                          message: "请输入开始距离",
                        },
                      ]}
                    />
                  );
                }}
              </ProFormDependency>
            </>
          )}
          <ProFormDependency name={["start"]}>
            {({ dynamicFare }) => {
              const start = dynamicFare.distance[index].start;
              return (
                <ProFormDigit
                  name="end"
                  min={start}
                  max={start + 100}
                  addonBefore="至"
                  addonAfter="km"
                  width={120}
                  rules={[
                    {
                      required: true,
                      message: "请输入结束距离",
                    },
                  ]}
                />
              );
            }}
          </ProFormDependency>
          <Label>加价:</Label>
          {index === 0 && (
            <ProFormItem name="fare">
              <FareInputNumber min={1} max={200} style={{ width: 120 }} />
            </ProFormItem>
          )}
          {index > 0 && (
            <ProFormDependency
              name={[["dynamicFare", "distance", index - 1, "fare"]]}
              ignoreFormListField
            >
              {({ dynamicFare }) => {
                const fare = dynamicFare.distance[index - 1].fare;
                return (
                  <ProFormItem name="fare">
                    <FareInputNumber
                      min={Number(fare || 0) + 1}
                      max={Number(fare || 0) + 200}
                      style={{ width: 120 }}
                    />
                  </ProFormItem>
                );
              }}
            </ProFormDependency>
          )}
        </ProFormGroup>
      )}
    </ProFormList>
  );

  const items: CollapseProps["items"] = [
    {
      label: "距离动态加价",
      key: "distance",
      children: renderChildren(),
    },
  ];

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    setIsOpen(false);
  };

  return (
    <ModalForm
      {...props}
      form={form}
      open={isOpen}
      onOpenChange={setIsOpen}
      title="动态起步价"
      submitter={{
        render: () => (
          <Space>
            <Button onClick={handleCancel}>取消</Button>
            <Button onClick={handleSubmit} type="primary">
              提交
            </Button>
          </Space>
        ),
      }}
      trigger={
        <Button onClick={handleClick} size="small" type="link">
          设置
        </Button>
      }
    >
      <ProFormDependency name={["baseFare"]}>
        {({ baseFare }) => (
          <Typography.Text type="secondary">起送价{baseFare}元</Typography.Text>
        )}
      </ProFormDependency>
      <Collapse items={items} bordered={false} />
    </ModalForm>
  );
};

export default SetDynamiceFareButton;
