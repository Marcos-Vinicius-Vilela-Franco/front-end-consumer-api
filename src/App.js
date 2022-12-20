import { useEffect, useState } from 'react';
import './App.css';
import Fromulario from './Fromulario';
import Tabela from './Tabela';
import Alerta from './Alert';

function App() {

  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  const [showAlert, setShowAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState('');
  const [tipoAlert, setTipoAlert] = useState('');
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);


  //obtendo dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value })
  }

  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          setMsgAlert(retorno_convertido.mensagem);
          setTipoAlert("danger");
          setShowAlert(true);
        } else {
          setProdutos([...produtos, retorno_convertido]);
          setMsgAlert(retorno_convertido.mensagem);
          setTipoAlert("success");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 4000)

        }
        limparForm()
      })
  }

  //remover produto
  const remover = () => {
    fetch('http://localhost:8080/remover/' + objProduto.codigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        setMsgAlert(retorno_convertido.mensagem);
        setTipoAlert("success");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000)


        //cópia de vetor de produtos
        let vetorTemp = [...produtos];

        //ímdice
        let indice= vetorTemp.findIndex((p)=>{
            return p.codigo === objProduto.codigo;
        });

        //remover procuto do vetorTemp

        vetorTemp.splice(indice,1);

        //atualizar vetor de produtos
        setProdutos(vetorTemp);

        //limpar formulario
        limparForm();


      })
  }

  //limpar fomulário
  const limparForm = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //selecionar produto
  const selecionarProduto = (i) => {
    setObjProduto(produtos[i]);
    setBtnCadastrar(false);
  }

  return (
    <div className="App container vh-100">
      {showAlert ? <Alerta mensagem={msgAlert} tipo={tipoAlert} setShowAlert={setShowAlert} /> : ''}
      <Fromulario button={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparForm} remover={remover}/>
      <Tabela produtos={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
