import React from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'

function Message() {
  return (
    <ToastContainer position="top-end">
      <Toast bg="info">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Notificação do sistema</strong>
          <small>2 minutos atrás</small>
        </Toast.Header>
        <Toast.Body>
          O ventilador foi desligado porque alcançou a temperatura máxima.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Message
