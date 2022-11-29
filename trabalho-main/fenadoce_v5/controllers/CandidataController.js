import dbKnex from '../dados/db_config.js'

export const candidataIndex = async (req, res) => {
  try {
    // obtém da tabela de candidatas todos os registros
    const casas = await dbKnex.select("*").from("casas")
    res.status(200).json(casas)
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const candidataStore = async (req, res) => {

  // informações que podem ser obtidas do arquivo enviado
  console.log(req.file.originalname);
  console.log(req.file.filename);
  console.log(req.file.mimetype);
  console.log(req.file.size);

  const foto = req.file.path; // obtém o caminho do arquivo no server

  if ((req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/png") || req.file.size > 1024 * 1024) {
    fs.unlinkSync(foto); // exclui o arquivo do servidor
    res
      .status(400)
      .json({ msg: "Formato inválido da imagem ou imagem muito grande" });
    return;
  }

  // atribui via desestruturação
  const { tipo, data, endereco, admins_id } = req.body

  // se não informou estes atributos
  if (!tipo || !data || !endereco|| !foto || !admins_id) {
    res.status(400).json({ id: 0, msg: "Erro... informe nome, data, clube, admin_id e foto da candidata" })
    return
  }

  try {
    const novo = await dbKnex('casas').insert({ tipo, data, endereco, foto, admins_id })

    // novo[0] => retorna o id do registro inserido                     
    res.status(201).json({ id: novo[0], msg: "Ok! Inserido com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const candidataUpdate = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  // atribui via desestruturação
  const { tipo, data, endereco } = req.body

  if (!tipo || !data || !endereco) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe tipo, data e endereço do imóvel"
      })
    return
  }

  try {
    await dbKnex("casas").where({ id })
      .update({ tipo, data, endereco })

    res.status(200).json({ id, msg: "Ok! Alterado com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }

}

export const candidataDelete = async (req, res) => {
  //  const id = req.params.id;
  const { id } = req.params;

  console.log(req.admin_id)
  console.log(req.admin_nome)

  try {
    await dbKnex("casas").where({ id }).del()
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}



export const candidataTotalVotos = async (req, res) => {
  try {
    // obtém da tabela de candidatas todos os registros
    const consulta = await dbKnex("casas")
            .sum({total: "votos"})
            .max({maior: "votos"})
    const {total, maior} = consulta[0]        
    res.status(200).json({total, maior})
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}
