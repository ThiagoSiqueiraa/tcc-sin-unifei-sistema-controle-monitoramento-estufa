import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function ModalUI({ show, handleContinue, handleClose, cancel }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ativar modo automático</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você está ativando o modo automático, o sistema irá controlar o
          acionamento de seus sistemas elétricos, com base em suas
          configurações, você confirma esta ação?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={cancel}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleContinue}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalUI
