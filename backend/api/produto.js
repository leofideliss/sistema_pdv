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
        let complementos = produto.complementos
        let insumos = produto.insumos
        let perguntas = produto.perguntas

        delete produto.complementos
        delete produto.insumos
        delete produto.perguntas

        // console.log('complementos', complementos)
        // console.log('insumos', insumos)
        // console.log('perguntas', perguntas)
        if (req.params.id) produto.id = req.params.id

        try {
            if (produto.nome.length == 0) throw "Nome inválido"

        } catch (err) {
            return res.status(400).send(err.msg)
        }
        if (produto.id) {

            const tamanhoProduto = {
                id_produto: produto.id,
                tamanho: 'Unico',
                preco_venda: produto.preco_venda,
                preco_custo: produto.preco_custo,
            }
            
            await app.db('produtosTamanho')
                .update(tamanhoProduto)
                .where({ id_produto: produto.id })

            delete produto.preco_custo
            delete produto.preco_venda

            await app.db('produtos')
                .update(produto)
                .where({ id: produto.id })
            // .catch((err) => res.status(500).send(err))



            if (insumos.length == 0) {
                await app.db('produto_insumo')
                    .where({ id_produto: produto.id })
                    .del()
                // .catch((err) => res.status(500).send(err))
            }
            else {

                await app.db('produto_insumo')
                    .where({ id_produto: produto.id })
                    .del()
                // .catch((err) => res.status(500).send(err))


                const fieldsToInsertInsumos = insumos.map(field =>
                    ({ id_produto: produto.id, id_insumo: field.id, qtd: field.qtd }));
                await app.db('produto_insumo')
                    .insert(fieldsToInsertInsumos)
                // .catch((err) => res.status(500).send(err))
            }

            if (complementos.length == 0) {

                await app.db('produto_complemento')
                    .where({ id_produto: produto.id })
                    .del()
                // .catch((err) => res.status(500).send(err))
            }
            else {
                await app.db('produto_complemento')
                    .where({ id_produto: produto.id })
                    .del()
                let fieldsToInsertComplementos
                // .catch((err) => res.status(500).send(err))
                if (typeof complementos[0] === 'object') {
                    fieldsToInsertComplementos = complementos.map(field =>
                        ({ id_produto: produto.id, id_complemento: field.id }));
                }
                else {
                    fieldsToInsertComplementos = complementos.map(field =>
                        ({ id_produto: produto.id, id_complemento: field }));
                }

                await app.db('produto_complemento')
                    .insert(fieldsToInsertComplementos)
                // .catch((err) => res.status(500).send(err))
            }

            if (perguntas.length == 0) {
                await app.db('produto_perguntas')
                    .where({ id_produto: produto.id })
                    .del()
                // .catch((err) => res.status(500).send(err))
            }
            else {
                await app.db('produto_perguntas')
                    .where({ id_produto: produto.id })
                    .del()
                // .catch((err) => res.status(500).send(err))

                const fieldsToInsertPerguntas = perguntas.map(field =>
                    ({ id_produto: produto.id, id_pergunta: field.id }));


                await app.db('produto_perguntas')
                    .insert(fieldsToInsertPerguntas)
                // .catch((err) => res.status(500).send(err))
            }
            return res.status(204).send()
        } else {
            let tamanhoProduto = {
                tamanho: 'Unico',
                preco_venda: produto.preco_venda,
                preco_custo: produto.preco_custo,
            }

            delete produto.preco_custo
            delete produto.preco_venda

            const id_prod = await app.db('produtos')
                .insert(produto, 'id')
                .then()
                .catch((err) => res.status(500).send(err))

            tamanhoProduto.id_produto = id_prod[0].id

            console.log(tamanhoProduto)
            await app.db('produtosTamanho')
                .insert(tamanhoProduto)

            if (perguntas.length != 0) {

                const fieldsToInsertPerguntas = perguntas.map(field =>
                    ({ id_produto: id_prod[0].id, id_pergunta: field.id }));


                await app.db('produto_perguntas')
                    .insert(fieldsToInsertPerguntas)
                    .catch((err) => res.status(500).send(err))
            }

            if (complementos.length != 0) {

                const fieldsToInsertComplementos = complementos.map(field =>
                    ({ id_produto: id_prod[0].id, id_complemento: field }));


                await app.db('produto_complemento')
                    .insert(fieldsToInsertComplementos)
                    .catch((err) => res.status(500).send(err))
            }
            if (insumos.length != 0) {

                const fieldsToInsertInsumos = insumos.map(field =>
                    ({ id_produto: id_prod[0].id, id_insumo: field.id, qtd: field.qtd }));

                await app.db('produto_insumo')
                    .insert(fieldsToInsertInsumos)
                    .catch((err) => res.status(500).send(err))

            }

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

    const getAllProdutos = async (req, res) => {
        await app.db('produtos')
            .join('categoriaProduto', 'produtos.id_categoria', '=', 'categoriaProduto.id')
            .join('produtosTamanho', 'produtos.id', '=', 'produtosTamanho.id_produto')
            .select('produtos.nome as prodNome', 'produtos.id as prodID', 'categoriaProduto.nome as nomeCategoria', '*')
            .then(produtos => res.json(produtos))
            .catch((err) => res.status(500).send(err))

    }

    const getProdutoById = async (req, res) => {
        await app.db('produtos')
            .join('categoriaProduto', 'produtos.id_categoria', '=', 'categoriaProduto.id')
            .join('produtosTamanho', 'produtos.id', '=', 'produtosTamanho.id_produto')
            .first('produtos.nome as prodNome', 'produtos.id as prodID', 'categoriaProduto.nome as nomeCategoria', '*')
            .where({ 'produtos.id': req.params.id })
            .then(produto => res.json(produto))
            .catch((err) => res.status(500).send(err))

    }

    const getProdutoInsumos = async (req, res) => {
        await app.db('produtos')
            .join('produto_insumo', 'produtos.id', '=', 'produto_insumo.id_produto')
            .join('insumo', 'produto_insumo.id_insumo', '=', 'insumo.id')
            .select('insumo.id ', 'insumo.nome as nomeInsumo', 'insumo.preco', 'insumo.medida', '*')
            .where({ 'produtos.id': req.params.id })
            .then(insumos => res.json(insumos))
            .catch()
    }

    const getProdutoComplementos = async (req, res) => {
        await app.db('produtos')
            .join('produto_complemento', 'produtos.id', '=', 'produto_complemento.id_produto')
            .join('complemento', 'produto_complemento.id_complemento', '=', 'complemento.id')
            .where({ 'produtos.id': req.params.id })
            .select()
            .then(complementos => res.json(complementos))
            .catch()
    }
    const getProdutoPergunta = async (req, res) => {
        await app.db('produtos')
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
        saveProduto, getAllProdutos, getProdutoById, deleteProduto, getProdutoInsumos, getProdutoComplementos, getProdutoPergunta,
    }
}