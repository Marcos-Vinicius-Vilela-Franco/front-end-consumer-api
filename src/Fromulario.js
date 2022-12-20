import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Formulario({ button, eventoTeclado,cadastrar,obj,cancelar}) {
    return (
        <div className='mt-5 d-flex justify-content-center align-items-center'>
            <div className='m-3 w-50 flex-column shadow-sm p-3 mb-5 bg-light rounded d-flex align-items-center justify-content-center'>
                <h1 className='display-5'>Fromulario</h1>
                <Form className=''>
                    <Row className="p-3">
                        <Form.Group as={Col} controlId="formGridNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control value={obj.nome} onChange={eventoTeclado} type="text" name='nome' placeholder="Nome do Produto" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridMarca">
                            <Form.Label>Marca</Form.Label>
                            <Form.Control value={obj.marca} onChange={eventoTeclado} type="text" name='marca' placeholder="Marca do Produto" />
                        </Form.Group>
                    </Row>
                    {button ? <Form.Label className='p-3'>Ação</Form.Label> : <Form.Label className='p-3'>Ações</Form.Label>}
                    <Form.Group className='mt-3 d-flex justify-content-around'>
                        {
                            button ?
                                <Button variant="success" type="button" onClick={cadastrar}>
                                    Cadastrar
                                </Button> :
                                <>
                                    <Button variant="primary" type="button">
                                        Alterar
                                    </Button>
                                    <Button variant="warning" type="button">
                                        Remover
                                    </Button>
                                    <Button onClick={cancelar} variant="danger" type="button" value='cancelar' >
                                        Cancelar
                                    </Button></>
                        }
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default Formulario;