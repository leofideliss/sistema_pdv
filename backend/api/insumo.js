module.exports = app => {

    const saveCategoria = (req, res) => {
        const insumo = { ...req.body }

        if (req.params.id) insumo.id = req.params.id

        try {
            if (insumo.nome.length == 0) throw "Nome inválido"

        } catch (err) {
            return res.status(400).send(err.msg)
        }
        if (insumo.id) {
            app.db('categoriaInsumo')
                .update(insumo)
                .where({ id: insumo.id })
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('categoriaInsumo')
                .insert(insumo)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const deleteCategoriaInsumo = async (req,res) =>{
        await app.db('categoriaInsumo')
            .where({ id: req.params.id })
            .del()
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const getAllCategoriaInsumos = (req, res) => {
        app.db('categoriaInsumo')
            .select()
            .then(insumos => res.json(insumos))
            .catch((err) => res.status(500).send(err))
    }

    const getCategoriaInsumoById = (req, res) => {
        app.db('categoriaInsumo')
            .select()
            .where({ id: req.params.id })
            .first()
            .then(insumo => res.json(insumo))
            .catch(err => res.status(500).send())
    }

    return { saveCategoria, getAllCategoriaInsumos, getCategoriaInsumoById ,deleteCategoriaInsumo }
}