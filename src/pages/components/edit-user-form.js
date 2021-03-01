import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, InputGroup, FormControl } from "react-bootstrap"
import { useForm } from "react-hook-form";
import moment from 'moment';
import {updateUser} from "../../services/users.services"

export const EditUserForm = ({ rowData, setRowData, state, setState }) => {

    let fecha_actualizacion = moment(new Date()).format("YYYY-MM-DD h:mm:ss");
    const [userData, setUserData] = useState({})
    const [active, setActive] = useState(false)
    const { nombres, usuario_id, segundo_apellido, telefono_laboral, password_asterisk, usuario_login, primer_apellido, email_laboral, extension_asterisk, codigo_estado } = userData || {}
    const { register, handleSubmit, errors, reset } = useForm();

    useEffect(() => {
        setActive(false)
        reset()
        setUserData(rowData.data)
    }, [rowData.data, reset])

    const onSubmit = async data => {
        const dataTemp = { ...userData, ...data, fecha_actualizacion, accion: "Actualizar", segundo_apellido: data.segundo_apellido, usuario_id, usuario_login  }
        console.log(dataTemp)
        try {
            await updateUser(dataTemp)
            setState(old => ({...old, reload: !state.reload}))
        } catch (error) {
            console.log(error)
        }
    };

    const onChange = () => {
        setActive(true)
    }

    const cancelar = () => {
        setActive(false)
        setUserData({})
        setRowData({})
        reset()
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)} onChange={onChange} >
            <Row>
                <Col lg="6">
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Id</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Id" aria-describedby="inputGroup-sizing-sm" defaultValue={usuario_id} name="usuario_id" ref={register} disabled />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Nombres</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Nombres" aria-describedby="inputGroup-sizing-sm" defaultValue={nombres} name="nombres" ref={register({ maxLength: { value: 50, message: "Solo permite 50 caracteres." } })} />
                    </InputGroup>
                    {errors.nombres && <span style={{color: "red", marginBottom: "16px", fontSize: "15px"}}>{errors.nombres.message}</span>}
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Seg. Apellido</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Seg. Apellido" aria-describedby="inputGroup-sizing-sm" defaultValue={segundo_apellido} name="segundo_apellido" ref={register({ maxLength: { value: 50, message: "Solo permite 50 caracteres." } })} />
                    </InputGroup>
                    {errors.segundo_apellido && <span style={{color: "red", marginBottom: "16px", fontSize: "15px"}}>{errors.segundo_apellido.message}</span>}
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Teléfono laboral</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Teléfono laboral" aria-describedby="inputGroup-sizing-sm" defaultValue={telefono_laboral} name="telefono_laboral" ref={register} />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Contraseña ext.</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Contraseña ext." aria-describedby="inputGroup-sizing-sm" defaultValue={password_asterisk} name="password_asterisk" ref={register({ maxLength: { value: 32, message: "Solo permite 32 caracteres." } })} />
                    </InputGroup>
                        {errors.password_asterisk && <span style={{color: "red", marginBottom: "16px", fontSize: "15px"}}>{errors.password_asterisk.message}</span>}
                </Col>
                <Col lg="6">
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Login</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Login" aria-describedby="inputGroup-sizing-sm" defaultValue={usuario_login} name="usuario_login" ref={register}  disabled/>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Primer apellido</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Primer apellido" aria-describedby="inputGroup-sizing-sm" defaultValue={primer_apellido} name="primer_apellido" ref={register({ maxLength: { value: 50, message: "Solo permite 50 caracteres." } })} />
                    </InputGroup>
                    {errors.primer_apellido && <span style={{color: "red", marginBottom: "16px", fontSize: "15px"}}>{errors.primer_apellido.message}</span>}
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">eMail laboral:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="eMail laboral:" aria-describedby="inputGroup-sizing-sm" defaultValue={email_laboral} name="email_laboral" ref={register} />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Extensión:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Extensión:" aria-describedby="inputGroup-sizing-sm" defaultValue={extension_asterisk} name="extension_asterisk" ref={register} />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Estado:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" defaultValue={codigo_estado} name="codigo_estado" ref={register} />
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button variant="outline-warning" type="submit" disabled={!active} block >
                        Actualizar
                    </Button>
                </Col>
                <Col>
                    <Button variant="danger" type="button" onClick={cancelar} disabled={rowData.data ? false : true} block >
                        Cancelar
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
