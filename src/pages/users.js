import React, { useEffect, useState } from 'react'
import { GridComponent, ColumnsDirective, ColumnDirective, Inject } from '@syncfusion/ej2-react-grids';
import { Toolbar} from '@syncfusion/ej2-react-grids';
import { getUsers } from "../services/users.services"
import { EditUserForm } from "./components/edit-user-form"
import { Card } from "react-bootstrap"

const Users = () => {

    let searchSettings = { fields: ['nombres', 'primer_apellido', 'segundo_apellido'] }
    const [state, setState] = useState({
        reload: false,
        loading: false
    })
    const [dataUsers, setDataUsers] = useState([])

    useEffect(() => {
        setState(old => ({ ...old, loading: true }))
        const getUsersData = async () => {
            try {
                const users = await getUsers()
                setDataUsers(users.data)
                setState(old => ({ ...old, loading: false }))
            } catch (error) {
                console.log(error)
            }
        }
        getUsersData()
    }, [state.reload])

    const columnaApellidos = [
        {
            field: 'primer_apellido',
            headerText: 'Apellido Paterno',
            width: '30%',
            headerTextAlign: 'Center'
        },
        {
            field: 'segundo_apellido',
            headerText: 'Apellido Materno',
            width: '30%',
            headerTextAlign: 'Center'
        }
    ]

    const [rowData, setRowData] = useState({});

    return (

        <Card className="mt-3">
            <Card.Body>
                <GridComponent
                    dataSource={dataUsers}
                    className='table'
                    rowSelected={setRowData}
                    toolbar={['Search']}
                    searchSettings={searchSettings}>
                    <ColumnsDirective>
                        <ColumnDirective field='usuario_id' headerText='Id' width='20%' headerTextAlign='Center' textAlign='Center' />
                        <ColumnDirective field='usuario_login' headerText='Login' width='25%' headerTextAlign='Center' />
                        <ColumnDirective field='nombres' headerText='Nombres' width='30%' headerTextAlign='Center' />
                        <ColumnDirective columns={columnaApellidos} headerText='Apellidos' width='40%' headerTextAlign='Center' />
                        <ColumnDirective field='codigo_estado' headerText='Estado' width='15%' headerTextAlign='Center' />
                        <ColumnDirective field='fecha_actualizacion' headerText='Actualizacion' width='25%' headerTextAlign='Center' />
                    </ColumnsDirective>
                    <Inject services={[Toolbar]} />
                </GridComponent>

                <EditUserForm rowData={rowData} setRowData={setRowData} state={state} setState={setState} />
            </Card.Body>
        </Card >
    )
}

export default Users
