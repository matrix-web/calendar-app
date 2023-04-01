import { Button, Layout, Modal, Row } from 'antd';
import { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar';
import EventForm from '../components/EventForm';
import { useAction } from '../hooks/useAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { IEvent } from '../models/IEvent';

const Event: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { fetchGuests, fetchEvents, createEvent } = useAction();
  const { events, guests } = useTypedSelector(state => state.event);
  const { user } = useTypedSelector(state => state.auth);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = (eventData: IEvent) => {
    createEvent(eventData);
    handleCancel();
  }

  useEffect(() => {
    fetchGuests();
    fetchEvents(user.username);
  }, []);

  return (
    <Layout>
      <EventCalendar 
        events={events}
      />
      <Row justify="center">
        <Button onClick={showModal}>Add event</Button>
      </Row>
      <Modal 
        title="Add event" 
        open={isModalOpen} 
        footer={null}
        onCancel={handleCancel}
      >
        <EventForm 
          guests={guests} 
          onSubmit={handleSubmit}
        />
      </Modal>
    </Layout>
  )
}

export default Event;