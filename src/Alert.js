import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';


export default function Alerta({mensagem,tipo,setShowAlert}) {
  //const [show, setShow] = useState(true);

  
    return (
      <Alert className='m-4' variant={tipo} onClose={() => setShowAlert(false)} dismissible>
        {tipo==="danger"?<Alert.Heading>Erro ao cadastrar!</Alert.Heading>:<Alert.Heading>Sucesso!</Alert.Heading>}
        <p>
         {mensagem}
        </p>
      </Alert>
    );
  
  
}

