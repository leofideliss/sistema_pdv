module.exports = app => {
    // *** OBSERVAÇÃO ***
    const saveObservacao = (req, res) => {
        const observacao = { ...req.body }
        if (req.params.id) observacao.id = req.params.id

        try {
            if (observacao.descricao.length == 0) throw "Nome inválido"

        } catch (err) {
            return res.status(400).send(err)
        }
        if (observacao.id) {
            app.db('observacao')
                .update(observacao)
                .where({ id: observacao.id })
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('observacao')
                .insert({ descricao: observacao.descricao }, ['id'])
                .then((id) => res.json(id))
                .catch((err) => res.status(500).send(err))
        }

    }

    const deleteObservacao = async (req, res) => {

        // const produtos = await app.db('')
        // .where({ id_observacao: req.params.id })
        // try{

        //     if(s.length > 0) throw "ERRO: observacao possuí s vinculados"
        // }catch (err) {
        //     return res.status(400).send(err)
        // }
        console.log(req.params.id)
        await app.db('observacao')
            .where({ id: req.params.id })
            .del()
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const getAllObservacaos = (req, res) => {
        app.db('observacao')
            .select()
            .then(observacaos => res.json(observacaos))
            .catch((err) => res.status(500).send(err))
    }

    const getObservacaoById = (req, res) => {
        app.db('observacao')
            .select()
            .where({ id: req.params.id })
            .first()
            .then(observacaos => res.json(observacaos))
            .catch(err => res.status(500).send(err))
    }
    // ***  FIM OBSERVAÇÃO ***

    // OBSERVAÇÃO / CATEGORIAS  RELAÇÃO NxN
    const saveObsCatProd = (req, res) => {
        const reg = { ...req.body }
        const id_obs = reg.id_obs
        const fieldsToInsert = reg.id_categoria_prod.map(field =>
            ({ id_catProd: field, id_obs }));

        app.db('obs_catProd')
            .insert(fieldsToInsert)
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const getAllObsCatProd = async (req, res) => {
       await app.db('obs_catProd')
        .join('observacao', 'obs_catProd.id_obs', '=', 'observacao.id')
        .join('categoriaProduto', 'obs_catProd.id_catProd', '=', 'categoriaProduto.id')
        .select('observacao.id', 'observacao.descricao as descricao', 'categoriaProduto.nome as categoria')
            .then(obs => res.json(obs))
            .catch(err => res.status(500).send(err))

    }

    return { saveObservacao, deleteObservacao, getAllObservacaos, getObservacaoById, saveObsCatProd, getAllObsCatProd }
}