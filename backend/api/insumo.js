module.exports = app => {
    // *** CATEGORIAS ***
    const saveCategoria = (req, res) => {
        const categoriaInsumo = { ...req.body }

        if (req.params.id) categoriaInsumo.id = req.params.id

        try {
            if (categoriaInsumo.nome.length == 0) throw "Nome inválido"

        } catch (err) {
            return res.status(400).send(err.msg)
        }
        if (categoriaInsumo.id) {
            app.db('categoriaInsumo')
                .update(categoriaInsumo)
                .where({ id: categoriaInsumo.id })
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('categoriaInsumo')
                .insert(categoriaInsumo)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const deleteCategoriaInsumo = async (req, res) => {
        await app.db('categoriaInsumo')
            .where({ id: req.params.id })
            .del()
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const getAllCategoriaInsumos = (req, res) => {
        app.db('categoriaInsumo')
            .select()
            .then(categorias => res.json(categorias))
            .catch((err) => res.status(500).send(err))
    }

    const getCategoriaInsumoById = (req, res) => {
        app.db('categoriaInsumo')
            .select()
            .where({ id: req.params.id })
            .first()
            .then(categorias => res.json(categorias))
            .catch(err => res.status(500).send())
    }
    // ***  FIM CATEGORIAS ***


    // *** INSUMOS ***


    const saveInsumo = (req, res) => {
        const insumo = { ...req.body }

        if (req.params.id) insumo.id = req.params.id

        try {
            if (insumo.nome.length == 0) throw "Nome inválido"

        } catch (err) {
            return res.status(400).send(err.msg)
        }
        if (insumo.id) {
            app.db('insumo')
                .update(insumo)
                .where({ id: insumo.id })
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('insumo')
                .insert(insumo)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const deleteInsumo = async (req, res) => {
        await app.db('insumo')
            .where({ id: req.params.id })
            .del()
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }


    const getAllInsumos = (req, res) => {
        app.db('insumo')
            .join('categoriaInsumo', 'insumo.id_categoria', '=', 'categoriaInsumo.id')
            .select('insumo.id ', 'insumo.nome as nomeInsumo', 'categoriaInsumo.nome as nomeCategoria', 'insumo.preco', 'insumo.medida')
            .then(insumos => res.json(insumos))
            .catch((err) => res.status(500).send(err))
    }

    const getInsumoById = (req, res) => {
        app.db('insumo')
            .select()
            .where({ id: req.params.id })
            .first()
            .then(categorias => res.json(categorias))
            .catch(err => res.status(500).send())
    }


    // *** FIM INSUMOS ***
    return {
        saveCategoria, getAllCategoriaInsumos, getCategoriaInsumoById, deleteCategoriaInsumo,
        saveInsumo, getAllInsumos, getInsumoById, deleteInsumo
    }
}