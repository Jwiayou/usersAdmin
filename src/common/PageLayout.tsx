import React, { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { Breadcrumb, BreadcrumbProps } from "antd";

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-bottom: 12px;
`;

const PageLayout: React.FC<
  PropsWithChildren<{
    breadcrumbProps?: BreadcrumbProps;
  }>
> = ({ breadcrumbProps, children }) => {
  return (
    <>
      {breadcrumbProps && <StyledBreadcrumb {...breadcrumbProps} />}
      {children}
    </>
  );
};

export default PageLayout;
