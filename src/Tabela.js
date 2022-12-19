import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
export default function Tabela({ produtos,selecionar }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Código</th>
                    <th>Nome </th>
                    <th>Marca</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map((item, i) => (
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{item.codigo}</td>
                        <td>{item.nome}</td>
                        <td>{item.marca}</td>
                        <td onClick={()=>{selecionar(i)}} className='d-flex justify-content-center'><Button variant="success">Selecionar</Button></td>
                    </tr>)
                )}


            </tbody>
        </Table>

    )
}