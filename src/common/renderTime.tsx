import dayjs from "dayjs";
import styled from "@emotion/styled";

const TimeDiv = styled.div`
  color: #999;
`;

const renderTime = (time: string) => {
  if (time) {
    const day = dayjs(time);
    return (
      <>
        <div>{day.format("YYYY-MM-DD")}</div>
        <TimeDiv>{day.format("HH:mm")}</TimeDiv>
      </>
    );
  }
  return "-";
};

export default renderTime;
