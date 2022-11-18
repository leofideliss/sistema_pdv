<template>
  <div class="NovaObservacao-pages espacamento20geral">
    <div class="headerNovaObservacao">
      <router-link to="/observacao" class="botaoVoltar">
        <img
          src="@/assets/seta-esquerda.png"
          alt="Voltar para Página anterior"
        />
        <h1>Voltar</h1>
      </router-link>
      <h1 v-if="descricao">Alterar Observação</h1>
      <h1 v-else>Adicionar Nova Observação</h1>
    </div>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="fomularioComplemento"
    >
      <div class="primeiraLinha">
        <div class="personalizarCampos">
          <div class="campos-formulario campoObservacao">
            <label for="nomeObservacao"> Descrição </label>
            <v-text-field
              id="nomeObservacao"
              type="text"
              v-model="observacao.descricao"
              label="Descrição *"
              :rules="descricaoRules"
            ></v-text-field>
          </div>
        </div>
      </div>

      <div class="selecionarCategorias">
        <h1>Categorias de Produto vinculadas a sua observação</h1>
        <div class="divCheckboxCategorias">
          <div
            class="checkboxItem"
            v-for="categoria in categoriaProduto"
            :key="categoria.id"
          >
            <v-checkbox
              v-model="observacao.id_categoria_prod"
              :value="categoria.id"
              :rules="categoriaRule"
            ></v-checkbox>
            <span>{{ categoria.nome }}</span>
          </div>
        </div>
      </div>
      <div class="botaos-form">
        <button class="botao-cancelar" @click.prevent="cancelar">
          Cancelar
        </button>
        <button class="botao-salvar" @click.prevent="salvar">Salvar</button>
      </div>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl } from "@/global";
export default {
  name: "NovaObservacao",
  props: ["descricao"],
  data() {
    return {
      img: "",
      selected: [],
      categoriaProduto: [],
      valid: true,
      observacao: { id_categoria_prod: [] },
      descricaoRules: [(v) => !!v || "Nome é obrigatório"],
      categoriaRule: [
        (v) => !!v || "Categoria é obrigatório",
        (v) => v.length > 0 || "Categoria é obrigatório",
      ],
    };
  },
  methods: {
    salvar() {
      if (this.validate()) {
        const method = this.descricao ? "put" : "post";
        const descricao = this.descricao ? this.descricao : "";

        axios[method](`${baseApiUrl}/observacao/${descricao}`, this.observacao)
          .then((res) => {
            // ID QUE RETORNOU DO REGISTRO INSERIDO
            let obs_catProd = {
              id_obs: res.data[0].id,
              id_categoria_prod: this.observacao.id_categoria_prod,
              descricao_cat: this.observacao.descricao,
            };
            axios[method](
              `${baseApiUrl}/observacaoCategorias/${descricao}`,
              obs_catProd
            )
              .then(() => {
                this.$router.back();
              })
              .catch();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    getAllCategoriaProduto() {
      axios
        .get(`${baseApiUrl}/categoriaProduto`)
        .then((res) => {
          this.categoriaProduto = res.data;
        })
        .catch();
    },
    cancelar() {
      this.$router.back();
    },
    getObservacaoById() {
      if (this.id)
        axios
          .get(`${baseApiUrl}/observacao/${this.id}`)
          .then((res) => {
            this.observacao = res.data;
          })
          .catch();
    },

    validate() {
      return this.$refs.form.validate();
    },
  },
  created() {
    if (this.descricao) {
      this.observacao.descricao = this.descricao;
      axios
        .get(`${baseApiUrl}/observacaoCategorias/${this.descricao}`)
        .then((res)=>{
        res.data.forEach(element => {
          this.observacao.id_categoria_prod.push(element.id)
        });})
        .catch();
    }
    this.getObservacaoById();
    this.getAllCategoriaProduto();
  },
};
</script>

<style scoped>
.headerNovaObservacao {
  display: flex;
  margin-bottom: 20px;
}

.headerNovaObservacao a {
  width: 80px;
}

.headerNovaObservacao h1 {
  font-size: 1.6rem;
  width: 90%;
  text-align: center;
  margin-bottom: 0px;
}

.botaoVoltar {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.botaoVoltar:hover {
  text-decoration: none;
}

.botaoVoltar img {
  width: 13px;
  height: 13px;
  margin-right: 10px;
}

.botaoVoltar h1 {
  color: black;
  font-family: "Rubik";
  font-size: 1.3rem;
  margin-bottom: 0px;
}

.fomularioComplemento {
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 20px;
}

.primeiraLinha {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.personalizarCampos {
  display: flex;
  width: 100%;
}

.campos-formulario {
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  margin: 10px;
}

.campos-formulario label {
  font-family: "Poppins";
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.campos-formulario input {
  border: 1px solid black;
  outline: none; /*borda que aparece quando clicamos*/
  padding: 5px;
  background: white;
  font-size: 0.8rem;
  font-family: "Poppins";
  border-radius: 5px;
}

.campoObservacao {
  width: 100%;
}

.botaos-form {
  display: flex;
  justify-content: end;
  margin-top: 50px;
}

.botaos-form button {
  padding: 10px 15px 10px 15px;
  border: none;
  border-radius: 10px;
  color: #def7f4;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-family: "Rubik";
  transition: 0.3s;
}

.botao-cancelar {
  background-color: #ff3131;
  margin-right: 15px;
}

.botao-cancelar:hover {
  background-color: #f95858;
}

.botao-salvar {
  background-color: #008000;
}

.botao-salvar:hover {
  background-color: #00b300;
}

.v-text-field {
  padding-top: 0px !important;
  margin-top: 0px !important;
}

.v-text-field input {
  padding: 5px !important;
}

.v-text-field > .v-input__control > .v-input__slot:before {
  border-style: none !important;
}

.input-select {
  border: 1px solid black;
  outline: none; /*borda que aparece quando clicamos*/
  padding: 5px;
  background: white;
  font-size: 0.8rem;
  font-family: "Poppins";
  border-radius: 5px;
}

/* ---- CATEGORIAS ----- */

.selecionarCategorias {
  padding: 10px;
}

.selecionarCategorias h1 {
  font-family: "Poppins";
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.divCheckboxCategorias {
  background-color: white;
  display: flex;
  border: 1px solid black;
  flex-wrap: wrap;
  padding: 15px;
  border-radius: 15px;
  max-height: 350px;
  overflow-y: scroll;
}

.checkboxItem {
  display: flex;
  align-items: center;
  width: 150px;
  margin-bottom: 10px;
}

.checkboxItem span {
  font-family: "Poppins";

  font-size: 0.9rem;
}

.v-input--selection-controls {
  padding-top: 0px !important;
}
</style>