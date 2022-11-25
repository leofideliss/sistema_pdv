module.exports = app => {
    // *** OBSERVAÇÃO ***
    const saveObservacao = (req, res) => {
        const observacao = { ...req.body }
        if (req.params.descricao) observacao.descricao_alterar = req.params.descricao

        try {
            if (observacao.descricao.length == 0) throw "Descrição inválida"

        } catch (err) {
            return res.status(400).send(err)
        }
        if (observacao.descricao_alterar) {
            app.db('observacao')
                .update({ descricao: observacao.descricao }, ['id'])
                .where({ descricao: observacao.descricao_alterar })
                .then((id) => res.json(id))
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
        await app.db('observacao')
            .where({ descricao: req.params.descricao })
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
    const saveObsCatProd = async (req, res) => {
        const reg = { ...req.body }
        const id_obs = reg.id_obs
        const fieldsToInsert = reg.id_categoria_prod.map(field =>
            ({ id_catProd: field, id_obs }));
        console.log(fieldsToInsert)
        if (req.params.descricao) reg.descricao_alterar = req.params.descricao

        if (reg.descricao_alterar) {
            const obs = await app.db('observacao')
                .where({ descricao: reg.descricao_cat })
                .first()

            await app.db('obs_catProd')
                .where({ id_obs: obs.id })
                .del()

            app.db('obs_catProd')
                .insert(fieldsToInsert)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('obs_catProd')
                .insert(fieldsToInsert)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const getAllObsCatProd = async (req, res) => {
        await app.db('obs_catProd')
            .join('observacao', 'obs_catProd.id_obs', '=', 'observacao.id')
            .join('categoriaProduto', 'obs_catProd.id_catProd', '=', 'categoriaProduto.id')
            .select('observacao.id', 'observacao.descricao as descricao', 'categoriaProduto.nome as categoria')
            .then(obs => res.json(obs))
            .catch(err => res.status(500).send(err))

    }

    const getObsCatProdByDesc = async (req, res) => {

        const obs = await app.db('observacao')
            .where({ descricao: req.params.descricao })
            .first()


        await app.db('obs_catProd')
            .join('categoriaProduto', 'obs_catProd.id_catProd', '=', 'categoriaProduto.id')
            .where({ id_obs: obs.id })
            .select('categoriaProduto.id', 'categoriaProduto.nome')
            .then(categorias => res.json(categorias))
            .catch(err => res.status(500).send(err))



    }

    return { saveObservacao, deleteObservacao, getAllObservacaos, getObservacaoById, saveObsCatProd, getAllObsCatProd, getObsCatProdByDesc }
}