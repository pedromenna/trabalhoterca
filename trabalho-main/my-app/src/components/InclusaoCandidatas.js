import { useState } from "react";
import { inAxios } from "../config_axios";

const InclusaoCandidatas = () => {
  // declara as variáveis de estado (e os métodos para manipulá-las)
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [data, setData] = useState("");
  const [foto, setFoto] = useState(null);
  const [admins_id, setAdmin] = useState("");

  const enviarDados = async (e) => {
    e.preventDefault();

    // como deve ser enviado um arquivo também, deve ser desta forma
    const formData = new FormData();
    formData.append("tipo", tipo);
    formData.append("endereco", endereco);
    formData.append("data", data);
    formData.append("foto", foto);
    formData.append("admins_id", admins_id);

    try {
      const inc = await inAxios.post("candidatas", formData);
      alert(`Ok! Inserida com sucesso. Código: ${inc.data.id}`);
    } catch (erro) {
      alert(`Erro: ${erro}`);
    }
  };

  return (
    <form className="container" onSubmit={enviarDados}>
      <h2>Inclusão de Imóveis</h2>
      <div className="mb-3">
        <label htmlFor="tipo" className="form-label">
          Tipo do Imóvel:
        </label>
        <input
          type="text"
          className="form-control"
          id="tipo"
          placeholder=""
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="endereco" className="form-label">
          endereco:
        </label>
        <input
          type="text"
          className="form-control"
          id="endereco"
          placeholder=""
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="data" className="form-label">
            Data de liberação:
          </label>
          <input
            type="date"
            className="form-control"
            id="data"
            placeholder=""
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <div className="col-md-8">
          <label htmlFor="foto" className="form-label">
            Foto:
          </label>
          <input
            type="file"
            className="form-control"
            id="foto"
            placeholder="Foto da candidata"
            onChange={(e) => setFoto(e.target.files[0])}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="admin_id" className="form-label">
            admins id:
          </label>
          <input
            type="text"
            className="form-control"
            id="admins_id"
            placeholder=""
            value={admins_id}
            onChange={(e) => setAdmin(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-dark btn-lg px-5">
        Enviar
      </button>
      <button type="reset" className="btn btn-danger btn-lg px-5 ms-3">
        Limpar
      </button>
    </form>
  );
};

export default InclusaoCandidatas;
