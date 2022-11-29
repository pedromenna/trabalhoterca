import { inAxios, webServiceURL } from "../config_axios";
import { useState, useEffect } from "react";

import "./ListaCandidatas.css";

const Listacasas = () => {
  const [casas, setcasas] = useState([]);

  const obtercasas = async () => {
    const lista = await inAxios.get("candidatas");

    setcasas(lista.data);
  };

  useEffect(() => {
    obtercasas();
  }, []);

  const excluir = async (id, tipo) => {
    if (!window.confirm(`Confirma a exclusão do imóvel "${tipo}"?`)) {
      return;
    }
    try {
      await inAxios.delete(`candidatas/${id}`);
      setcasas(casas.filter((cand) => cand.id !== id));
    } catch (error) {
      alert(`Não foi possível excluir este imóvel: ${error}`);
    }
  };

  const alterar = async (id, tipo, endereco, data, index) => {
    const novotipo = prompt(`Qual o tipo correto do Imóvel "${tipo}"?`);
    if (novotipo === null || novotipo === "") {
      return;
    }
    try {
      await inAxios.put(`candidatas/${id}`, { tipo: novotipo, endereco, data });
      const candsAlteracao = [...casas];
      candsAlteracao[index].tipo = novotipo;
      setcasas(candsAlteracao);
    } catch (error) {
      alert(`Erro... Não foi possível alterar o tipo: ${error}`);
    }
  };

  return (
    <div className="container">
      <h2>Lista de Imóveis cadastrados</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Tipo</th>
            <th>Endereço</th>
            <th>Disponivel</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {casas.map((casas, index) => (
            <tr>
              <td>
                <img
                  src={webServiceURL + casas.foto}
                  alt={casas.tipo}
                  className="img-cand"
                />
              </td>
              <td>{casas.tipo}</td>
              <td>{casas.endereco}</td>
              <td>Liberada {casas.data}</td>
              <td className="text-center">
                <h4>
                  <i
                    class="bi bi-pencil-square text-success"
                    onClick={() =>
                      alterar(
                        casas.id,
                        casas.tipo,
                        casas.endereco,
                        casas.data,
                        index
                      )
                    }
                  ></i>
                  &ensp;
                  <i
                    className="bi bi-person-dash-fill text-danger"
                    onClick={() => excluir(casas.id, casas.tipo)}
                  ></i>
                </h4>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listacasas;
