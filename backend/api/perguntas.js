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
                .update(pergunta, ['id'])
                .where({ id: pergunta.id })
                .then((id) => res.json(id))
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

        if (req.params.id) reg.id_alterar = req.params.id

        const perguntas_complemento = await app.db('pergunta_complemento')
            .where({ id_pergunta: reg.id_pergunta })
            .select()

        if (perguntas_complemento.length != 0 && reg.complementos.length == 0) {
            await app.db('pergunta_complemento')
                .where({ id_pergunta: reg.id_alterar })
                .del()

            return res.status(204).send()

        }


        const id_pergunta = reg.id_pergunta
        const fieldsToInsert = reg.complementos.map(field =>
            ({ id_complemento: field.id, id_pergunta, qtdPermitida: field.qtdPermitida, preco_promo: field.preco_promo }));

        // await app.db('pergunta_complemento')
        //     .insert(fieldsToInsert)
        //     .then(() => res.status(204).send())
        //     .catch((err) => res.status(500).send(err))

        if (reg.id_alterar) {
            await app.db('pergunta_complemento')
                .where({ id_pergunta: reg.id_alterar })
                .del()
            await app.db('pergunta_complemento')
                .insert(fieldsToInsert)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            await app.db('pergunta_complemento')
                .insert(fieldsToInsert)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const deletePergunta = async (req, res) => {

        await app.db('perguntas')
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

    const getPerguntaByIdComp = async (req, res) => {

        const pergunta = await app.db('perguntas')
            .where({ id: req.params.id })
            .first()


        const pergunta_complementos = await app.db('pergunta_complemento')
            .join('complemento', 'pergunta_complemento.id_complemento', '=', 'complemento.id')
            .join('perguntas', 'pergunta_complemento.id_pergunta', '=', 'perguntas.id')

            .where({ id_pergunta: pergunta.id })
            .select('perguntas.id', 'complemento.id', 'pergunta_complemento.qtdPermitida', 'pergunta_complemento.preco_promo', "complemento.nome", 'complemento.preco_venda', 'perguntas.tipo', 'perguntas.pergunta', 'perguntas.obrigatorio', 'perguntas.max', 'perguntas.min')
        if (pergunta_complementos.length != 0) {
            return res.json(pergunta_complementos)
        }
        else {
            let arr = []
            arr.push(pergunta)
            return res.json(arr)

        }
    }

    const getPerguntaByIdObs = async (req, res) => {

        const pergunta_obs = await app.db('pergunta_observacao')
            .join('perguntas', 'pergunta_observacao.id_pergunta', '=', 'perguntas.id')

            .where({ id_pergunta: req.params.id })
            .select('perguntas.id', 'perguntas.tipo', 'perguntas.pergunta', 'perguntas.obrigatorio', 'perguntas.max', 'perguntas.min', 'pergunta_observacao.descricao', 'pergunta_observacao.tipo as tipoObs')
            .then(perguntas => res.json(perguntas))
            .catch((err) => res.status(500).send(err))
    }


    const savePerguntaObservacao = async (req, res) => {

        const reg = { ...req.body }
        if (req.params.id) reg.id_alterar = req.params.id

        // const perguntas_observacao = await app.db('pergunta_observacao')
        //     .where({ id_pergunta: reg.id_pergunta })
        //     .select()

        if (reg.observacoes.length == 0) {
            await app.db('pergunta_observacao')
                .where({ id_pergunta: reg.id_pergunta })
                .del()

            return res.status(204).send()

        }


        const id_pergunta = reg.id_pergunta
        const fieldsToInsert = reg.observacoes.map(field =>
            ({ id_pergunta, descricao: field.descricao, tipo: field.tipo }));



        // await app.db('pergunta_complemento')
        //     .insert(fieldsToInsert)
        //     .then(() => res.status(204).send())
        //     .catch((err) => res.status(500).send(err))

        if (reg.id_alterar) {
            await app.db('pergunta_observacao')
                .where({ id_pergunta: reg.id_alterar })
                .del()
            await app.db('pergunta_observacao')
                .insert(fieldsToInsert)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            await app.db('pergunta_observacao')
                .insert(fieldsToInsert)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const getPerguntaById = async (req, res) => {
        await app.db('perguntas')
            .where({ id: req.params.id })
            .first()
            .then(pergunta => res.json(pergunta))
            .catch((err) => res.status(500).send(err))

    }
    // ***  FIM PERGUNTAS ***

    return { savePergunta, savePerguntaComplemento, getAllPerguntas, getPerguntaByIdComp, deletePergunta, savePerguntaObservacao, getPerguntaByIdObs, getPerguntaById }
}