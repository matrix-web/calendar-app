import { Calendar } from "antd";
import { FC } from "react";
import { IEvent } from "../models/IEvent";
import type { Dayjs } from 'dayjs';

interface EventCalendarProps {
  events: IEvent[];
}

const EventCalendar: FC<EventCalendarProps> = (props): JSX.Element => {
  const { events } = props;

  const dateCellRender = (value: Dayjs) => {
    const formattedDate = value.format("YYYY.MM.DD");
    const currentDayEvents = events.filter(ev => ev.date === formattedDate);
    return (
      <div>
        {currentDayEvents.map((ev, idx) => <div key={idx}>{ev.description}</div>)}
      </div>
    );
  };

  return (
    <Calendar 
      dateCellRender={dateCellRender}
    />
  )
}

export default EventCalendar;