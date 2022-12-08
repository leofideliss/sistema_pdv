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


    // *** PRODUTOS ***
    const saveProduto = (req, res) => {
        const produto = { ...req.body }
        console.log(req.files)
        if (req.params.id) produto.id = req.params.id

        try {
            if (produto.nome.length == 0) throw "Nome inválido"

        } catch (err) {
            return res.status(400).send(err.msg)
        }
        if (produto.id) {
            app.db('produtos')
                .update(produto)
                .where({ id: produto.id })
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        } else {
            app.db('produtos')
                .insert(produto)
                .then(() => res.status(204).send())
                .catch((err) => res.status(500).send(err))
        }
    }

    const getAllProdutos = (req,res)=>{
        app.db('produtos')
        .join('categoriaProduto','produtos.id_categoria','=','categoriaProduto.id')
        .select('produtos.nome as prodNome' ,'produtos.id as prodID' , 'categoriaProduto.nome as nomeCategoria' , '*')
        .then(produtos=> res.json(produtos))
        .catch()
    }

    const getProdutoById = (req,res)=>{
        app.db('produtos')
        .join('categoriaProduto','produtos.id_categoria','=','categoriaProduto.id')
        .first('produtos.nome as prodNome','produtos.id as prodID' , 'categoriaProduto.nome as nomeCategoria' , '*')
        .where({'produtos.id': req.params.id})
        .then(produto=> res.json(produto))
        .catch()
    }
    // *** FIM PRODUTOS ***


    return {
        saveCategoria, getAllCategoriaProdutos, getCategoriaProdutoById, deleteCategoriaProduto,
        saveProduto, getAllProdutos,getProdutoById,
    }
}