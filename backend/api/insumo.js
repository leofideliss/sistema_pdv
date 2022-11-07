module.exports = app => {

    const save = (req, res) => {
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

    const deleteInsumo = async (req,res) =>{
        await app.db('categoriaInsumo')
            .where({ id: req.params.id })
            .del()
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const getAllInsumos = (req, res) => {
        app.db('categoriaInsumo')
            .select()
            .then(insumos => res.json(insumos))
            .catch((err) => res.status(500).send(err))
    }

    const getInsumoById = (req, res) => {
        app.db('categoriaInsumo')
            .select()
            .where({ id: req.params.id })
            .first()
            .then(insumo => res.json(insumo))
            .catch(err => res.status(500).send())
    }

    return { save, getAllInsumos, getInsumoById ,deleteInsumo }
}