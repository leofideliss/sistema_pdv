module.exports = app =>{
    // *** OBSERVAÇÃO ***
    const saveObservacao = (req, res) => {
      const observacao = { ...req.body }
  
      if (req.params.id) observacao.id = req.params.id
  
      try {
          if (observacao.nome.length == 0) throw "Nome inválido"
  
      } catch (err) {
          return res.status(400).send(err)
      }
      if (observacao.id) {
          app.db('observacao')
              .update(observacao)
              .where({ id: observacao.id })
              .then(() => res.status(204).send())
              .catch((err) => res.status(500).send(err))
      } else {
          app.db('observacao')
              .insert(observacao)
              .then(() => res.status(204).send())
              .catch((err) => res.status(500).send(err))
      }
  }
  
  const deleteObservacao = async (req, res) => {
  
      // const produtos = await app.db('')
      // .where({ id_observacao: req.params.id })
      // try{
  
      //     if(s.length > 0) throw "ERRO: observacao possuí s vinculados"
      // }catch (err) {
      //     return res.status(400).send(err)
      // }
  
      await app.db('observacao')
          .where({ id: req.params.id })
          .del()
          .then(() => res.status(204).send())
          .catch((err) => res.status(500).send(err))
  }
  
  const getAllObservacaos = (req, res) => {
      app.db('observacao')
          .select()
          .then(observacaos => res.json(observacaos))
          .catch((err) => res.status(500).send(err))
  }
  
  const getObservacaoById = (req, res) => {
      app.db('observacao')
          .select()
          .where({ id: req.params.id })
          .first()
          .then(observacaos => res.json(observacaos))
          .catch(err => res.status(500).send(err))
  }
  // ***  FIM OBSERVAÇÃO ***
  
  
      return {saveObservacao,deleteObservacao,getAllObservacaos,getObservacaoById}
  }