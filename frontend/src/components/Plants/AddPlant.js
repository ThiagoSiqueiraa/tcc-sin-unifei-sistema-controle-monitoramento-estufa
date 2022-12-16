import { useState } from "react"
import { Button, Form } from "react-bootstrap"

function AddPlant() {
    const [name, setName] = useState('')
    const [pin, setPin] = useState('')
    const [icon, setIcon] = useState('')

    return (
        <div className="addsidebar show">
        <div className="add-wrapper">
          <h2 class="header-title">Nova Planta</h2>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>
                NOME <span class="text-danger">*</span>
              </Form.Label>
              <Form.Control
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPin">
              <Form.Label>Genética</Form.Label>
              <Form.Control
                type="text"
                value={pin}
                onChange={e => setPin(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIcon">
              <Form.Label>Fase</Form.Label>
              <Form.Control
                type="text"
                value={icon}
                onChange={e => setIcon(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" onClick={() => console.log('teste')} variant="primary">
              Adicionar
            </Button>
          </Form>
        </div>
      </div>
    )
}

export default AddPlant