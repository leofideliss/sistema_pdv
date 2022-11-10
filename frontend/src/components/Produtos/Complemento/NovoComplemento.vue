<template>
  <div class="NovoComplemento-pages espacamento20geral">
    <div class="headerNovoComplemento">
      <router-link to="/complemento" class="botaoVoltar">
        <img
          src="@/assets/seta-esquerda.png"
          alt="Voltar para Página anterior"
        />
        <h1>Voltar</h1>
      </router-link>

      <h1 v-if="id">Alterar Complemento</h1>
      <h1 v-else>Adicionar Novo Complemento</h1>
    </div>

    <v-form
      lazy-validation
      v-model="valid"
      ref="form"
      class="fomularioComplemento"
    >
      <div class="primeiraLinha">
        <div class="personalizarCampos">
          <div class="campos-formulario campoNome">
            <label for="nomeComplemento"> Nome </label>
            <v-text-field
              v-model="complemento.nome"
              id="nomeComplemento"
              type="text"
              :rules="nomeRules"
              label="Nome *"
            ></v-text-field>
          </div>
          <div class="campos-formulario campoAtivo">
            <label for="nomeComplemento" style="margin-bottom: 0px">
              Status
            </label>
            <!--
                        <b-form-checkbox v-model="checked" name="check-button" switch size="lg">
                         
                        </b-form-checkbox>-->
          </div>
        </div>

        <div class="campos-formulario campoCodigo">
          <label for="codigoAcompanhamento"> Código </label>
          <v-text-field
            v-model="complemento.id"
            id="codigoAcompanhamento"
            type="number"
            label="Código"
          ></v-text-field>
        </div>
      </div>
      <div class="primeiraLinha">
        <div class="personalizarCampos">
          <div class="campos-formulario campoCusto">
            <label for="precoCusto"> Preço de Custo </label>
            <v-currency-field
              id="precoCusto"
              v-model="complemento.preco_custo"
              :rules="precoCustoRules"
              label="Preço de custo *"
            />
          </div>
          <div class="campos-formulario campoVenda">
            <label for="precoVenda"> Preço de Venda </label>
            <v-currency-field
              id="precoVenda"
              v-model="complemento.preco_venda"
              :rules="precoVendaRules"
              label="Preço de venda *"
            />
          </div>
          <!-- <div class="campos-formulario campoProdVinculados">
                        <label for="produtosVinculados">
                            Produtos Vinculados
                        </label>
                        <input id="produtosVinculados" type="select">
                    </div> -->
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
  name: "NovoComplemento",
  props: ["id"],
  data() {
    return {
      valid: true,
      switch1: true,
      switch2: false,
      complemento: { preco_custo: "", preco_venda: "" },
      nomeRules: [(v) => !!v || "Nome é obrigatório"],
      precoCustoRules: [(v) => !!v || "Preco de custo é obrigatório"],
      precoVendaRules: [(v) => !!v || "Preco de venda é obrigatório"],
    };
  },
  methods: {
    salvar() {
      if (this.validate()) {
        const method = this.id ? "put" : "post";
        const id = this.id ? this.id : "";

        axios[method](`${baseApiUrl}/complemento/${id}`, this.complemento)
          .then(() => {
            this.$router.back();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    cancelar() {
      this.$router.back();
    },
    getComplementoById() {
      if (this.id)
        axios
          .get(`${baseApiUrl}/complemento/${this.id}`)
          .then((res) => {
            this.complemento = res.data;
          })
          .catch();
    },

    validate() {
      return this.$refs.form.validate();
    },
  },
  created(){
    this.getComplementoById()
  }
};
</script>

<style>
.headerNovoComplemento {
  display: flex;
  margin-bottom: 20px;
}

.headerNovoComplemento a {
  width: 80px;
}

.headerNovoComplemento h1 {
  font-size: 1.8rem;
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

.campoNome {
  width: 45%;
}

.campoAtivo {
  width: 10%;
}

.campoCodigo {
  width: 15%;
}

.campoCusto {
  width: 15%;
}

.campoVenda {
  width: 15%;
}

.campo-moeda {
  width: 15%;
}

.campoProdVinculados {
  width: 70%;
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
/** TESTE **/

.custom-switch.b-custom-control-lg .custom-control-label::before,
.input-group-lg .custom-switch .custom-control-label::before {
  height: 2rem;
  width: 4rem;
}

.custom-switch.b-custom-control-lg .custom-control-label::after,
.input-group-lg .custom-switch .custom-control-label::after {
  width: calc(2rem - 4px);
  height: calc(2rem - 4px) !important;
}
</style>