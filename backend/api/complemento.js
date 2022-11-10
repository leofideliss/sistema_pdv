module.exports = app =>{
  // *** COMPLEMENTO ***
  const saveComplemento = (req, res) => {
    const complemento = { ...req.body }

    if (req.params.id) complemento.id = req.params.id

    try {
        if (complemento.nome.length == 0) throw "Nome inválido"

    } catch (err) {
        return res.status(400).send(err)
    }
    if (complemento.id) {
        app.db('complemento')
            .update(complemento)
            .where({ id: complemento.id })
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    } else {
        app.db('complemento')
            .insert(complemento)
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }
}

const deleteComplemento = async (req, res) => {

    // const produtos = await app.db('')
    // .where({ id_complemento: req.params.id })
    // try{

    //     if(s.length > 0) throw "ERRO: Complemento possuí s vinculados"
    // }catch (err) {
    //     return res.status(400).send(err)
    // }

    await app.db('complemento')
        .where({ id: req.params.id })
        .del()
        .then(() => res.status(204).send())
        .catch((err) => res.status(500).send(err))
}

const getAllComplementos = (req, res) => {
    app.db('complemento')
        .select()
        .then(complementos => res.json(complementos))
        .catch((err) => res.status(500).send(err))
}

const getComplementoById = (req, res) => {
    app.db('complemento')
        .select()
        .where({ id: req.params.id })
        .first()
        .then(complementos => res.json(complementos))
        .catch(err => res.status(500).send(err))
}
// ***  FIM COMPLEMENTO ***


    return {saveComplemento,deleteComplemento,getAllComplementos,getComplementoById}
}