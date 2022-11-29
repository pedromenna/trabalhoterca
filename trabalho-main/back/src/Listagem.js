import { inAxios, webServiceURL } from "./config_axios";
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './Listagem.css'

function Listagem() {

  const [imoveis, setimoveis] = useState([])
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [tipo, settipo] = useState("");
  const [foto, setFoto] = useState("");
  const [data, setdata] = useState(0);
  const [endereco, setendereco] = useState("");
  const [nomeCli, setNomeCli] = useState("");
  const [emailCli, setEmailCli] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = (id, tipo, foto, data, endereco) => {
    setId(id)
    settipo(tipo)
    setFoto(webServiceURL + foto)
    setdata(data)
    setendereco(endereco)
    setShow(true);
  }

  const getimoveis = async () => {
    try {
      const lista = await inAxios.get("candidatas")
      setimoveis(lista.data)
    } catch (erro) {
      console.log(`Erro no acesso ao Servidor ${erro}`)
    }
  }

  useEffect(() => {
    getimoveis()
  }, [])

  const confirmarVoto = async () => {

    if (nomeCli == "" || emailCli == "") {
      alert("Por favor, informe os dados para confirmar o aluguel.")
      return
    }

    try {
      const voto = await inAxios.post("alugueis", { casas_id: id, tipo: nomeCli, email: emailCli })
      alert(voto.data.msg)
    } catch (erro) {
      console.log(`Erro no acesso ao Servidor ${erro}`)
    }

    setNomeCli("")
    setEmailCli("")

    setShow(false)
  }

  return (
    <div className="container py-3">
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-4">
        {imoveis.map((imoveis) => (
          <div className="col">
            <img src={`${webServiceURL}${imoveis.foto}`} alt="Candidata" className="w-100 img-fluid" />
            <h4 className="mt-1">{imoveis.tipo}
              <button className="btn btn-success fw-bold py-2 px-4 float-end"
                onClick={() => handleShow(imoveis.id, imoveis.tipo, imoveis.foto, imoveis.data, imoveis.endereco)}>
                Alugar
              </button>
            </h4>
            <h5 className="mb-5">{imoveis.endereco} - {imoveis.data} - Pelotas </h5>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Imobiliária Satolep</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                <img src={foto} alt={tipo} className="img-fluid" />
              </div>
              <div className="col-6">
                <h2>{tipo}</h2>
                <h5>Endereço: {endereco}</h5>
                <h5>Liberada Apartir de: {data} </h5>
                <h5>Cidade: Pelotas </h5>
                <h4 className="text-dark mt-5">Informe seus dados:</h4>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="floatingName" placeholder="Nome"
                    value={nomeCli} onChange={(e) => setNomeCli(e.target.value)} />
                  <label for="floatingName">Nome completo</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="floatingEmail" placeholder="E-mail"
                    value={emailCli} onChange={(e) => setEmailCli(e.target.value)} />
                  <label for="floatingEmail">E-mail para contato</label>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarVoto}>
            Confirmar Aluguel
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Listagem