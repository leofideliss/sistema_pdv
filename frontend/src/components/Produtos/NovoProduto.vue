<template>
  <div class="NovoProduto-pages espacamento20geral">
    <div class="headerNovoProduto">
      <router-link to="/produtos" class="botaoVoltar">
        <img
          src="@/assets/seta-esquerda.png"
          alt="Voltar para Página anterior"
        />
        <h1>Voltar</h1>
      </router-link>

      <h1 v-if="id">Altera Produto</h1>
      <h1 v-else>Adicionar Novo Produto</h1>
    </div>

    <form action="" class="fomularioComplemento">
      <div class="primeiraLinha">
        <div class="personalizarCampos space">
          <div class="campoNomeSwitch">
            <div class="campos-formulario campoNomeProduto">
              <label for="nomeComplemento"> Nome </label>
              <v-text-field
                v-model="nome"
                id="nomeComplemento"
                type="text"
              ></v-text-field>
            </div>
            <v-app class="appSwitch">
              <label class="labelStatus">Status do Produto</label>
              <div class="camposSwitch">
                <v-switch v-model="status" inset></v-switch>
                <div v-if="status" class="textoSwitch">Ativo</div>
                <div v-else class="textoSwitch">Pausado</div>
              </div>
            </v-app>
          </div>

          <div class="campos-formulario campoCodigo">
            <label for="codigoAcompanhamento"> Código </label>
            <input v-model="codigo" id="codigoAcompanhamento" type="number" />
          </div>
        </div>
      </div>
      <div class="primeiraLinha">
        <div class="personalizarCampos">
          <div class="campos-formulario campoCategoria">
            <label for="precoCategoria"> Categoria </label>

            <v-select
              v-model="categoria"
              :items="categoriaProduto"
              item-text="nome"
              item-value="id"
              label="Categoria"
            ></v-select>
          </div>
          <div class="campos-formulario campoMedida">
            <label for="produtosVinculados"> Medida do Produto </label>
            <div class="opcoes-medidas">
              <v-radio-group class="custom-radio" row v-model="medida">
                <v-radio
                  type="radio"
                  id="un"
                  name="medida"
                  value="UN"
                  class="radio-medidas"
                  color="#3decb1"
                  checked
                ></v-radio>
                <label for="un">UN</label>

                <div class="custom-radio">
                  <v-radio
                    type="radio"
                    id="kg"
                    name="medida"
                    value="KG"
                    color="#3decb1"
                    class="radio-medidas"
                  ></v-radio>
                  <label for="kg">KG</label>
                </div>

                <div class="custom-radio">
                  <v-radio
                    type="radio"
                    id="lt"
                    color="#3decb1"
                    name="medida"
                    value="LT"
                    class="radio-medidas"
                  ></v-radio>
                  <label for="lt">LT</label>
                </div>
              </v-radio-group>
            </div>
          </div>
        </div>
      </div>
      <div class="primeiraLinha">
        <div class="personalizarCampos">
          <div class="campos-formulario campoCustoProduto">
            <label for="precoCusto"> Preço de Custo </label>
            <v-currency-field id="precoCusto" v-model="preco_custo" />
          </div>
          <div class="campos-formulario campoCustoProduto">
            <label for="precoVenda"> Preço de Venda </label>
            <v-currency-field id="precoVenda" v-model="preco_venda" />
          </div>
        </div>
      </div>

      <div>
        <v-tabs>
          <v-tab
            @click="
              teste = true;
              teste2 = false;
              teste3 = false;
              teste4 = false;
            "
            >Mais Detalhes</v-tab
          >
          <v-tab
            @click="
              teste = false;
              teste2 = false;
              teste3 = true;
              teste4 = false;
            "
            >Ficha Técnica</v-tab
          >
          <v-tab
            @click="
              teste = false;
              teste2 = true;
              teste3 = false;
              teste4 = false;
            "
            >Complementos</v-tab
          >
          <v-tab
            @click="
              teste = false;
              teste2 = false;
              teste3 = false;
              teste4 = true;
            "
            >Perguntas</v-tab
          >
        </v-tabs>
        <div>
          <Detalhes v-if="teste"></Detalhes>
          <TabComplementos v-if="teste2"></TabComplementos>
          <FichaTecnica v-if="teste3"></FichaTecnica>
          <TabPergunta v-if="teste4"></TabPergunta>
        </div>
      </div>
      <div class="botaos-form">
        <button class="botao-cancelar" @click.prevent="voltar">Cancelar</button>
        <button class="botao-salvar" @click.prevent="salvarProduto">
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Detalhes from "@/components/Produtos/Tabs Produtos/ProdutoDetalhes.vue";
import TabComplementos from "@/components/Produtos/Tabs Produtos/TabComplemento.vue";
import FichaTecnica from "@/components/Produtos/Tabs Produtos/FichaTecnica.vue";
import TabPergunta from "@/components/Produtos/Tabs Produtos/TabPergunta.vue";
import axios from "axios";
import { baseApiUrl } from "@/global";

export default {
  name: "NovoProduto",
  components: {
    Detalhes,
    TabComplementos,
    FichaTecnica,
    TabPergunta,
  },
  props: ["id"],
  data() {
    return {
      categoriaProduto: [],
      teste: true,
      teste2: false,
      teste3: false,
      teste4: false,
      itemSelect: ["Bebidas", "Frios", "Lanches"],
    };
  },
  computed: {
    item() {
      return this.$store.state.produto.item;
    },
    nome: {
      get() {
        return this.$store.state.produto.item.nome;
      },
      set(value) {
        this.$store.commit("alteraNomeProduto", value);
      },
    },
    status: {
      get() {
        return this.$store.state.produto.item.status;
      },
      set(value) {
        this.$store.commit("alteraStatusProduto", value);
      },
    },
    codigo: {
      get() {
        return this.$store.state.produto.item.codigo;
      },
      set(value) {
        this.$store.commit("alteraCodigoProduto", value);
      },
    },
    medida: {
      get() {
        return this.$store.state.produto.item.medida;
      },
      set(value) {
        this.$store.commit("alteraMedidaProduto", value);
      },
    },
    preco_custo: {
      get() {
        return this.$store.state.produto.item.preco_custo;
      },
      set(value) {
        this.$store.commit("alteraPrecoCustoProduto", value);
      },
    },
    categoria: {
      get() {
        return this.$store.state.produto.item.categoria;
      },
      set(value) {
        this.$store.commit("alteraCategoriaProduto", value);
      },
    },
    preco_venda: {
      get() {
        return this.$store.state.produto.item.preco_venda;
      },
      set(value) {
        this.$store.commit("alteraPrecoVendaProduto", value);
      },
    },
  },
  methods: {
    getAllCategoriaProduto() {
      axios
        .get(`${baseApiUrl}/categoriaProduto`)
        .then((res) => {
          this.categoriaProduto = res.data;
        })
        .catch();
    },
    salvarProduto() {
      /**
       * nome = nome
       * status = status
       * id_categoria = categoria
       * medida = medida
       * preco_custo =
       * preco_venda =
       * descricao =
       * imagem_prod = image
       *
       */
      const method = this.id ? "put" : "post";
      const id = this.id ? this.id : "";
      var objProduto = {
        nome: this.item.nome,
        status: this.item.status,
        id_categoria: this.item.categoria,
        medida: this.item.medida,
        preco_custo: this.item.preco_custo,
        preco_venda: this.item.preco_venda,
        descricao: this.item.descricao,
        imagem_prod: this.item.image,
      };
      axios[method](`${baseApiUrl}/produto/${id}`, objProduto)
        .then(() => {
          this.$router.back();
        })
        .catch((err) => {
          console.log(err);
        });

      // console.log(this.item.image);
      // console.log("nome arquivo", this.item.image.name);
      // let data = new FormData();
      // data.append("file", this.item.image, this.image.name);

      // const method = this.id ? "put" : "post";
      // const id = this.id ? this.id : "";
      // axios[method](`${baseApiUrl}/produto/${id}`, this.item, {
      //   headers: {
      //     accept: "application/json",
      //     "Accept-Language": "en-US,en;q=0.8",
      //     "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
      //   },
      // })
      //   .then(() => {
      //     this.$router.back();
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    getProdutoById() {
      axios
        .get(`${baseApiUrl}/produto/${this.id}`)
        .then((res) => {
          console.log(res.data);
         this.nome = res.data.prodNome
         this.status = res.data.status
         this.codigo = res.data.getProdutoById
         this.categoria = res.data.id_categoria
         this.medida = res.data.medida
         this.preco_custo = res.data.preco_custo
         this.preco_venda = res.data.preco_venda

        })
        .catch();
    },
    voltar() {
      this.$router.back();
    },
  },

  created() {
    this.getAllCategoriaProduto();
    if (this.id) this.getProdutoById();
  },
};
</script>

<style>
.NovoProduto-pages {
  padding: 20px;
}

.headerNovoProduto {
  display: flex;
  margin-bottom: 20px;
}

.headerNovoProduto a {
  width: 80px;
}

.headerNovoProduto h1 {
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

.space {
  display: flex;
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

.campoNomeProduto {
  width: 71%;
}

.campoCodigo {
  width: 15%;
}

.campoCategoria {
  width: 50%;
}

.campoMedida {
  width: 30%;
}

.campoCustoProduto {
  width: 20%;
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

.opcoes-medidas {
  display: flex;
  width: 100%;
}

.opcoes-medidas div {
  margin-right: 15px;
}

.radio-medidas {
  margin-right: 4px;
}

.custom-radio {
  display: flex;
  align-items: center;
}

.custom-radio label {
  cursor: pointer;
  margin-bottom: 0px !important;
}

.radio-medidas {
  cursor: pointer !important;
  appearance: none !important;
  width: 25px !important;
  height: 25px !important;
  border-radius: 50% !important;
  outline: none !important;
  border: 2px solid #3decb1 !important;
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0px !important;
}

.radio-medidas:before {
  content: "";
  position: absolute;
  height: 11px;
  width: 11px;
  background: #3decb1;
  border-radius: 50%;
  opacity: 0;
  transition: all 300ms ease-in-out;
}

.radio-medidas:checked:before {
  opacity: 1;
}

.radio-medidas:focus {
  box-shadow: 0 0 5px rgba(0, 0, 0, 1);
}

/** SWITCH **/

.labelStatus {
  font-family: "Poppins";
  margin-bottom: 5px;
  font-size: 0.9rem;
}

.camposSwitch {
  display: flex;
  align-items: center;
}

.campoNomeSwitch {
  display: flex;
  width: 70%;
}

.appSwitch {
  padding: 10px;
}

.textoSwitch {
  font-family: "Poppins";

  font-size: 0.8rem;
}

/** -------------- ALTERA CAMPOS VUE  ------------------ **/

.v-input--selection-controls {
  margin-top: 0px !important;
}

.v-messages {
  display: none;
}

.v-input__slot {
  margin-bottom: 0px !important;
}

.v-application .primary--text {
  color: #3decb1 !important;
  caret-color: #3decb1 !important;
}

.theme--light.v-application {
  background-color: #f2f2f2 !important;
}
</style>