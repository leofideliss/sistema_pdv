module.exports = app => {
    // *** CATEGORIAS ***
    const saveCategoria = (req, res) => {
        const categoriaProduto = { ...req.body }

        if (req.params.id) categoriaProduto.id = req.params.id

        try {
            if (categoriaProduto.nome.length == 0) throw "Nome inválido"

        } catch (err) {
            return res.status(400).send(err.msg)
        }
        if (categoriaProduto.id) {
            app.db('categoriaProduto')
                .update(categoriaProduto)
                .where({ id: categoriaProduto.id })
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('categoriaProduto')
                .insert(categoriaProduto)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const deleteCategoriaProduto = async (req, res) => {
        await app.db('categoriaProduto')
            .where({ id: req.params.id })
            .del()
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))
    }

    const getAllCategoriaProdutos = (req, res) => {
        app.db('categoriaProduto')
            .select()
            .then(categorias => res.json(categorias))
            .catch((err) => res.status(500).send(err))
    }

    const getCategoriaProdutoById = (req, res) => {
        app.db('categoriaProduto')
            .select()
            .where({ id: req.params.id })
            .first()
            .then(categorias => res.json(categorias))
            .catch(err => res.status(500).send(err))
    }
    // ***  FIM CATEGORIAS ***

    return {
        saveCategoria, getAllCategoriaProdutos, getCategoriaProdutoById, deleteCategoriaProduto,
   
    }
}