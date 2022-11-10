module.exports = app => {
    // *** TIPOS ***
    const saveTipos = (req, res) => {
        const tiposProduto = { ...req.body }

        if (req.params.id) tiposProduto.id = req.params.id

        try {
            if (tiposProduto.nome.length == 0) throw "Nome inválido"

        } catch (err) {
            return res.status(400).send(err.msg)
        }
        if (tiposProduto.id) {
            app.db('tiposProduto')
                .update(tiposProduto)
                .where({ id: tiposProduto.id })
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('tiposProduto')
                .insert(tiposProduto)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const deleteTiposProduto = async (req, res) => {

        const tamanhos = await app.db('tamanhos')
        .where({ id_tipo: req.params.id })
        try{

            if(tamanhos.length > 0) throw "ERRO: Tipo possuí tamanhos vinculados"
        }catch (err) {
            return res.status(400).send(err)
        }

        await app.db('tiposProduto')
            .where({ id: req.params.id })
            .del()
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const getAllTiposProdutos = (req, res) => {
        app.db('tiposProduto')
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
    // ***  FIM TIPOS ***

    // *** TAMANHOS ***
    const saveTamanhos = (req, res) => {
        const tamanhosProduto = { ...req.body }
        if (req.params.id) tamanhosProduto.id = req.params.id

        try {
            if (tamanhosProduto.descricao.length == 0) throw "Nome inválido"

        } catch (err) {
            return res.status(400).send(err.msg)
        }
        if (tamanhosProduto.id) {
            app.db('tamanhos')
                .update(tamanhosProduto)
                .where({ id: tamanhosProduto.id })
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('tamanhos')
                .insert(tamanhosProduto)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const deleteTamanhosProduto = async (req, res) => {
        await app.db('tamanhos')
            .where({ id: req.params.id })
            .del()
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const getAllTamanhosProdutos = (req, res) => {
        app.db('tamanhos')
            .join('tiposProduto', 'tiposProduto.id', '=', 'tamanhos.id_tipo')
            .select('tamanhos.descricao' , 'tamanhos.sigla' ,'tamanhos.id' , 'tamanhos.id_tipo','tiposProduto.nome')
            .then(tamanhos => res.json(tamanhos))
            .catch((err) => res.status(500).send(err))
    }

    const getTamanhosProdutoById = (req, res) => {
        app.db('tamanhos')
            .select()
            .where({ id: req.params.id })
            .first()
            .then(tamanhos => res.json(tamanhos))
            .catch(err => res.status(500).send(err))
    }
    // ***  FIM TAMANHOS ***

    return { saveTipos, deleteTiposProduto, getAllTiposProdutos, getTiposProdutoById, saveTamanhos, deleteTamanhosProduto, getAllTamanhosProdutos, getTamanhosProdutoById }

}