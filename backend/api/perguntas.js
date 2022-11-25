module.exports = app => {
    // *** PERGUNTAS ***
    const savePergunta = (req, res) => {
        const pergunta = { ...req.body }

        if (req.params.id) pergunta.id = req.params.id

        try {
            if (pergunta.pergunta.length == 0) throw "Nome inválido"

        } catch (err) {
            return res.status(400).send(err.msg)
        }
        if (pergunta.id) {
            app.db('perguntas')
                .update(pergunta)
                .where({ id: pergunta.id })
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('perguntas')
                .insert(pergunta, ['id'])
                .then((id) => res.json(id))
                .catch((err) => res.status(500).send(err))
        }
    }

    const savePerguntaComplemento = async (req, res) => {
        const reg = { ...req.body }
        const id_pergunta = reg.id_pergunta
        const fieldsToInsert = reg.complementos.map(field =>
            ({ id_complemento: field.id, id_pergunta, qtdPermitida: field.qtdPermitida, preco_promo: field.preco_promo }));

        console.log(fieldsToInsert)
        await app.db('pergunta_complemento')
            .insert(fieldsToInsert)
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
        // if (req.params.descricao) reg.descricao_alterar = req.params.descricao

        // if (reg.descricao_alterar) {
        //     const obs = await app.db('observacao')
        //         .where({ descricao: reg.descricao_cat })
        //         .first()

        //     await app.db('obs_catProd')
        //         .where({ id_obs: obs.id })
        //         .del()

        //     app.db('obs_catProd')
        //         .insert(fieldsToInsert)
        //         .then(() => res.status(204).send())
        //         .catch((err) => res.status(500).send(err))
        // } else {
        //     app.db('obs_catProd')
        //         .insert(fieldsToInsert)
        //         .then(() => res.status(204).send())
        //         .catch((err) => res.status(500).send(err))
        // }
    }

    const deleteTiposProduto = async (req, res) => {

        const tamanhos = await app.db('tamanhos')
            .where({ id_tipo: req.params.id })
        try {

            if (tamanhos.length > 0) throw "ERRO: Tipo possuí tamanhos vinculados"
        } catch (err) {
            return res.status(400).send(err)
        }

        await app.db('tiposProduto')
            .where({ id: req.params.id })
            .del()
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const getAllPerguntas = (req, res) => {
        app.db('perguntas')
            .select()
            .then(tipo => res.json(tipo))
            .catch((err) => res.status(500).send(err))
    }

    const getTiposProdutoById = (req, res) => {
        app.db('tiposProduto')
            .select()
            .where({ id: req.params.id })
            .first()
            .then(tipo => res.json(tipo))
            .catch(err => res.status(500).send(err))
    }

    const getPerguntaById = async (req, res) => {

        const pergunta = await app.db('perguntas')
            .where({ id: req.params.id })
            .first()


        const pergunta_complementos = await app.db('pergunta_complemento')
            .join('complemento', 'pergunta_complemento.id_complemento', '=', 'complemento.id')
            .join('perguntas', 'pergunta_complemento.id_pergunta', '=', 'perguntas.id')
            .where({ id_pergunta: pergunta.id })
            .select('perguntas.id', 'complemento.id', 'pergunta_complemento.qtdPermitida', 'pergunta_complemento.preco_promo', "complemento.nome", 'complemento.preco_venda','perguntas.tipo' ,'perguntas.pergunta','perguntas.obrigatorio','perguntas.max','perguntas.min',)
        if (pergunta_complementos.length != 0) {
            return res.json(pergunta_complementos)
        }
        else {
            let arr = []
            arr.push(pergunta)
            return res.json(arr)

        }


    }
    // ***  FIM PERGUNTAS ***

    return { savePergunta, savePerguntaComplemento, getAllPerguntas, getPerguntaById }
}