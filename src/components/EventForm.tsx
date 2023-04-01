import { FC, useMemo, useRef } from "react";
import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { formatDate } from "../utils/date";
import type { FormInstance } from 'antd/es/form';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { IEvent } from "../models/IEvent";

interface EventFormProps {
  guests: IUser[];
  onSubmit: (eventData: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props): JSX.Element => {
  const { guests, onSubmit } = props;
  const formRef = useRef<FormInstance>(null);
  const { user } = useTypedSelector(state => state.auth);

  const guestsItems = useMemo(() => guests.map(guest => ({value: guest.username, label: guest.username})), [guests]);

  const handlerSubmit = (values: any) => {
    const date = formatDate(values.date.$d);
    const eventData = {
      date,
      description: values.description,
      guest: values.guest,
      author: user.username
    }

    if (eventData.date && eventData.description && eventData.date && eventData.author) {
      onSubmit(eventData);
    }

    formRef.current?.resetFields();
  }

  return (
    <Form
      ref={formRef}
      onFinish={handlerSubmit}
      layout="vertical"
    >
      <Form.Item
        label="Event description"
        name="description"
        rules={[rules.required("This field is required")]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
        label="Date of event"
        name="date"
        rules={[rules.required("This filed is required"), rules.isDateAfter("You cannot create an event in the past")]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Guest"
        name="guest"
        rules={[rules.required("This filed is required")]}
      >
        <Select
          // defaultValue="lucy"
          // style={{ width: 120 }}
          options={guestsItems}
        />
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default EventForm;