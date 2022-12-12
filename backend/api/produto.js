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
    const saveProduto = async (req, res) => {
        const produto = { ...req.body }
        var complementos = produto.complementos
        var insumos = produto.insumos
        var perguntas = produto.perguntas

        delete produto.complementos
        delete produto.insumos
        delete produto.perguntas

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

            const id_prod = await app.db('produtos')
                .insert(produto, 'id')
                .then()
                .catch((err) => res.status(500).send(err))
            if (perguntas.length != 0) {

                const fieldsToInsertPerguntas = perguntas.map(field =>
                    ({ id_produto: id_prod[0].id, id_pergunta: field.id }));


                app.db('produto_perguntas')
                    .insert(fieldsToInsertPerguntas)
                    .then()
                    .catch((err) => res.status(500).send(err))
            }

            if (complementos.length != 0) {

                const fieldsToInsertComplementos = complementos.map(field =>
                    ({ id_produto: id_prod[0].id, id_complemento: field }));


                app.db('produto_complemento')
                    .insert(fieldsToInsertComplementos)
                    .then()
                    .catch((err) => res.status(500).send(err))
            }
            if (insumos.length != 0) {

                const fieldsToInsertInsumos = insumos.map(field =>
                    ({ id_produto: id_prod[0].id, id_insumo: field.id, qtd: field.qtd }));

                app.db('produto_insumo')
                    .insert(fieldsToInsertInsumos)
                    .then()
                    .catch((err) => res.status(500).send(err))

            }
            // else {
            //     return res.status(204).send()

            // }
            return res.status(204).send()


        }
    }

    const deleteProduto = (req, res) => {
        app.db('produtos')
            .where({ id: req.params.id })
            .del()
            .then(() => res.status(204).send())
            .catch((err) => res.status(500).send(err))

    }

    const getAllProdutos = (req, res) => {
        app.db('produtos')
            .join('categoriaProduto', 'produtos.id_categoria', '=', 'categoriaProduto.id')
            .select('produtos.nome as prodNome', 'produtos.id as prodID', 'categoriaProduto.nome as nomeCategoria', '*')
            .then(produtos => res.json(produtos))
            .catch((err) => res.status(500).send(err))

    }

    const getProdutoById = (req, res) => {
        app.db('produtos')
            .join('categoriaProduto', 'produtos.id_categoria', '=', 'categoriaProduto.id')
            .first('produtos.nome as prodNome', 'produtos.id as prodID', 'categoriaProduto.nome as nomeCategoria', '*')
            .where({ 'produtos.id': req.params.id })
            .then(produto => res.json(produto))
            .catch((err) => res.status(500).send(err))

    }

    const getProdutoInsumos = (req, res) => {
        app.db('produtos')
            .join('produto_insumo', 'produtos.id', '=', 'produto_insumo.id_produto')
            .join('insumo', 'produto_insumo.id_insumo', '=', 'insumo.id')
            .where({ 'produtos.id': req.params.id })
            .select()
            .then(insumos => res.json(insumos))
            .catch()
    }

    const getProdutoComplementos = (req, res) => {
        app.db('produtos')
            .join('produto_complemento', 'produtos.id', '=', 'produto_complemento.id_produto')
            .join('complemento', 'produto_complemento.id_complemento', '=', 'complemento.id')
            .where({ 'produtos.id': req.params.id })
            .select()
            .then(complementos => res.json(complementos))
            .catch()
    }
    const getProdutoPergunta = (req, res) => {
        app.db('produtos')
            .join('produto_perguntas', 'produtos.id', '=', 'produto_perguntas.id_produto')
            .join('perguntas', 'produto_perguntas.id_pergunta', '=', 'perguntas.id')
            .where({ 'produtos.id': req.params.id })
            .select()
            .then(perguntas => res.json(perguntas))
            .catch()
    }
    // *** FIM PRODUTOS ***


    return {
        saveCategoria, getAllCategoriaProdutos, getCategoriaProdutoById, deleteCategoriaProduto,
        saveProduto, getAllProdutos, getProdutoById, deleteProduto,getProdutoInsumos,getProdutoComplementos,getProdutoPergunta,
    }
}