import React from "react";
import { usePagination } from "ahooks";
import { Button, Table } from "antd";
import PageLayout from "../../common/PageLayout";
import {
  getUsers,
  GetUsersRequest,
  GetUsersResponse,
} from "../../common/servers";

import type { User } from "../../common/data";
import type { ColumnType } from "antd/es/table";
import renderTime from "../../common/renderTime";

const Management: React.FC = () => {
  const { data, loading, pagination } = usePagination<
    GetUsersResponse,
    [GetUsersRequest]
  >((params) => getUsers(params));

  const renderSex = (): ColumnType<User>['render'] = () 

  const renderOperator: ColumnType<User>["render"] = (_, reord) => {
    return <Button type="link">删除</Button>;
  };

  return (
    <PageLayout
      breadcrumbProps={{ items: [{ title: "用户" }, { title: "用户管理" }] }}
    >
      <Table<User>
        rowKey="id"
        dataSource={data?.list}
        loading={loading}
        pagination={pagination}
        scroll={{
          x: 2000,
        }}
        columns={[
          {
            title: "用户名",
            dataIndex: "name",
            width: 100,
          },
          {
            title: "账号",
            dataIndex: "account",
            width: 100,
          },
          {
            title: "手机号码",
            dataIndex: "phone",
            width: 130,
          },
          // {
          //   title: "密码",
          //   dataIndex: "password",
          //   width: 130,
          // },
          {
            title: "邮箱地址",
            dataIndex: "email",
            width: 220,
          },
          {
            title: "性别",
            dataIndex: "sex",
            render: renderSex,
            width: 80,
          },
          {
            title: "生日",
            render: renderTime,
            width: 120,
          },
          {
            title: "身份证号码",
            dataIndex: "identityNumber",
            width: 200,
          },
          {
            title: "现居地址",
            dataIndex: "address",
            width: 240,
          },
          {
            title: "注册时间",
            dataIndex: "createdTime",
            width: 120,
            render: renderTime,
          },
          {
            title: "修改时间",
            dataIndex: "modifiedTime",
            width: 120,
            render: renderTime,
          },
          {
            title: "操作",
            render: renderOperator,
            fixed: "right",
            width: 100,
          },
        ]}
      />
    </PageLayout>
  );
};

export default Management;
