import React, { useState } from "react"
import { Toast } from "react-bootstrap";

interface NotificationProps {
  title: string;
  description: string;
}

export const Notification: React.FC<NotificationProps> = ({title, description}) => {
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  return (
    <Toast show={show} onClose={toggleShow} delay={3000} autohide>
      <Toast.Header>
        {title}
      </Toast.Header>
      <Toast.Body>
        {description}
      </Toast.Body>
    </Toast>
  )

}